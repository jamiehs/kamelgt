import { CarDriver } from '@jamiehs/zoomies'

// How far into the margin the cars target (0 = page edge, 1 = content edge).
const MARGIN_INSET = 0.85

// Content max-width matches the $section-max-width SCSS variable.
const CONTENT_MAX_WIDTH = 1100

// z-index: 40 — above the page chrome, below the highlighted timeslot card (z-index: 50).
const CANVAS_Z_INDEX = 40

type Side = 'left' | 'right' | 'random'
type VerticalAnchor = 'top' | 'center' | 'bottom'

type SectionConfig = {
  side: Side
  anchor: VerticalAnchor
}

// Art direction per section.
const SECTION_CONFIGS: Record<string, SectionConfig> = {
  timeslots:  { side: 'right',  anchor: 'top'    },
  faq:        { side: 'right',  anchor: 'center' },
  setups:     { side: 'random', anchor: 'bottom' },
  format:     { side: 'random', anchor: 'center' },
  tips:       { side: 'right',  anchor: 'center' },
  broadcasts: { side: 'right',  anchor: 'top'    },
  shifting:   { side: 'right',  anchor: 'center' },
}

const WAYPOINT_SECTIONS = Object.keys(SECTION_CONFIGS)

function marginX(side: Side): number {
  const resolved = side === 'random'
    ? (Math.random() < 0.5 ? 'left' : 'right')
    : side

  const usableWidth = Math.min(window.innerWidth, CONTENT_MAX_WIDTH)
  const marginWidth = (window.innerWidth - usableWidth) / 2

  if (marginWidth > 60) {
    return resolved === 'left'
      ? marginWidth * MARGIN_INSET
      : window.innerWidth - marginWidth * MARGIN_INSET
  }
  // Narrow screen: thin strip on the chosen side
  return resolved === 'left'
    ? window.innerWidth * 0.06
    : window.innerWidth * 0.94
}

function waypointForSection(el: Element): { x: number; y: number } {
  const id = el.id
  const config = SECTION_CONFIGS[id] ?? { side: 'random' as Side, anchor: 'center' as VerticalAnchor }
  const rect = el.getBoundingClientRect()
  const scrollY = window.scrollY

  let y: number
  switch (config.anchor) {
    case 'top':
      y = scrollY + rect.top + 80
      break
    case 'bottom':
      y = scrollY + rect.bottom - 120
      break
    case 'center':
    default:
      y = scrollY + window.innerHeight * 0.5
      break
  }

  return { x: marginX(config.side), y }
}

export function initCarScene(): () => void {
  const driver = new CarDriver({
    count: 0,
    zIndex: CANVAS_Z_INDEX,
    clickTarget: null,
    skidOpacity: 0.04,
    shadow: true,
    shadowBlur: 5,
    shadowOpacity: 0.5,
    shadowOffsetX: 4,
    shadowOffsetY: 6,
    driverChange: true,
  })

  // All cars spawn off-screen upper-right so they race onto the page on load
  const spawnX = window.innerWidth * 1.5
  const spawnY = 0

  // Shared Audi 90 GTO base config
  const audiBase = {
    x: spawnX, y: spawnY,
    height: 32,
    wheelbase: 44,
    maxSteering: 20,
    steeringRate: 200,
    driveBias: 0.6,
    tireWidth: 7,
    exhaustPosition: 'right' as const,
    exhaustOffset: 0.38,
    exhaustRadius: 5,
    exhaustAngle: 145,
  }

  // Audi 90 GTO #01
  driver.addCar({
    ...audiBase,
    color: 'rgb(201, 176, 32)',
    twitchiness: 0.2,
    acceleration: 190,
    brakes: 0.5,
    sprite: '/images/a901.png',
  })
  
  // Audi 90 GTO #37
  driver.addCar({
    ...audiBase,
    color: 'rgb(214, 214, 214)',
    twitchiness: 0.1,
    acceleration: 200,
    aggression: 0.7,
    brakes: 0.7,
    sprite: '/images/a9037.png',
  })

  // Nissan GTP ZX-T
  driver.addCar({
    x: spawnX, y: spawnY,
    color: '#0000ff',
    height: 32,
    wheelbase: 48,
    maxSpeed: 550,
    acceleration: 100,
    maxSteering: 22,
    twitchiness: 0.6,
    brakes: 0.76,
    steeringRate: 200,
    driveBias: 1,
    tireWidth: 6,
    slipScale: 1.5,
    exhaustPosition: 'rear',
    exhaustOffset: 0.6,
    exhaustInterval: 0.7,
    exhaustInset: 14,
    exhaustRadius: 4.8,
    shadowCornerRadius: 1,
    sprite: '/images/zxt.png',
  })

  // Pick the last section whose top has crossed 30% down the viewport —
  // i.e. the highest rect.top that is still ≤ triggerLine. This lets the
  // topmost section win at page-load (rect.top ≈ 0) without being beaten by
  // a tall subsequent section whose top happens to sit near the old midpoint.
  // Fallback: if nothing has crossed the trigger yet, take the topmost visible section.
  function getActiveSection(): HTMLElement | null {
    const triggerLine = window.innerHeight * 0.3
    let best: HTMLElement | null = null
    let bestTop = -Infinity
    for (const id of WAYPOINT_SECTIONS) {
      const el = document.getElementById(id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) continue
      if (rect.top <= triggerLine && rect.top > bestTop) {
        bestTop = rect.top
        best = el
      }
    }
    // Fallback: nothing has crossed the trigger yet — take the topmost visible section
    if (!best) {
      let fallbackTop = Infinity
      for (const id of WAYPOINT_SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue
        if (rect.top < fallbackTop) { fallbackTop = rect.top; best = el }
      }
    }
    return best
  }

  let scrollTimer: ReturnType<typeof setTimeout> | null = null
  let lastActiveId: string | null = null
  let lastActiveEl: HTMLElement | null = null

  function applyDebugHighlight(el: HTMLElement | null) {
    // Clear all section highlights first
    for (const id of WAYPOINT_SECTIONS) {
      const s = document.getElementById(id)
      if (s) s.style.removeProperty('box-shadow')
    }
    if (el && driver.debug) {
      el.style.boxShadow = 'inset 0 0 0 4px hotpink'
    }
  }

  function sendTo(el: HTMLElement) {
    lastActiveId = el.id
    lastActiveEl = el
    const { x, y } = waypointForSection(el)
    driver.driveTo(x, y)
    applyDebugHighlight(el)
  }

  function onScroll() {
    if (scrollTimer !== null) clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      const el = getActiveSection()
      if (!el) return
      const isTall = el.getBoundingClientRect().height > window.innerHeight
      if (!isTall && el.id === lastActiveId) return
      sendTo(el)
      scrollTimer = null
    }, 150)
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  // Ctrl+Shift+Space toggles the zoomies debug overlay + section highlight
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'Space') {
      e.preventDefault()
      driver.debug = !driver.debug
      applyDebugHighlight(lastActiveEl)
    }
  }
  window.addEventListener('keydown', onKeyDown)

  // Set the first target immediately (no debounce) so cars race in on load
  const initialSection = getActiveSection()
  if (initialSection) sendTo(initialSection)

  return () => {
    if (scrollTimer !== null) clearTimeout(scrollTimer)
    applyDebugHighlight(null) // clean up any lingering highlight
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('keydown', onKeyDown)
    driver.destroy()
  }
}
