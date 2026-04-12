import { CarDriver } from '@jamiehs/zoomies'

// --- Sprite pools ---

const SPRITE_DIR = '/images/zoomies-cars/sharp'

const A90_SPRITES = Array.from({ length: 27 }, (_, i) =>
  `${SPRITE_DIR}/a90${String(i + 1).padStart(2, '0')}.png`
)

const ZXT_SPRITES = Array.from({ length: 14 }, (_, i) =>
  `${SPRITE_DIR}/zxt${String(i + 1).padStart(2, '0')}.png`
)

// --- Car factory types ---

interface CarRanges {
  maxSpeed?:         [number, number]
  acceleration?:     [number, number]
  brakes?:           [number, number]
  brakeDecel?:       [number, number]
  grip?:             [number, number]
  twitchiness?:      [number, number]
  aggression?:       [number, number]
  driveBias?:        [number, number]
  slipScale?:        [number, number]
  slipStiffness?:    [number, number]
  slipDamping?:      [number, number]
  maxSteering?:      [number, number]
  steeringRate?:     [number, number]
  skidThreshold?:    [number, number]
  arrivalRadius?:    [number, number]
  exhaustOffset?:    [number, number]
  exhaustRadius?:    [number, number]
  exhaustInterval?:  [number, number]
  exhaustAngle?:     [number, number]
  exhaustInset?:     [number, number]
}

interface CarTypeConfig {
  /** Random number of cars to spawn, inclusive. */
  count: [number, number]
  sprites: string[]
  /** Fixed options applied to every car of this type. */
  fixed: {
    color?: string
    height?: number
    wheelbase?: number
    tireWidth?: number
    maxSpeed?: number
    maxSteering?: number
    steeringRate?: number
    driveBias?: number
    slipScale?: number
    exhaustPosition?: 'left' | 'right' | 'bothSides' | 'rear' | null
    exhaustOffset?: number
    exhaustRadius?: number
    exhaustInterval?: number
    exhaustAngle?: number
    exhaustInset?: number
    shadowCornerRadius?: number
    orbitDetection?: boolean
    proximityBoost?: boolean
  }
  /** Name shown in console debug output. */
  label?: string
  /** Per-car scalar values sampled uniformly from [min, max]. */
  ranges?: CarRanges
}

// --- Car type definitions ---

const AUDI_90_GTO: CarTypeConfig = {
  label: 'Audi 90 GTO',
  count: [1, 3],
  sprites: A90_SPRITES,
  fixed: {
    height: 32,
    wheelbase: 44,
    color: 'rgb(201, 176, 32)',
    maxSteering: 20,
    steeringRate: 200,
    driveBias: 0.6,
    tireWidth: 7,
    exhaustPosition: 'right',
    exhaustOffset: 0.38,
    exhaustRadius: 5,
    exhaustAngle: 145,
  },
  ranges: {
    acceleration:  [80, 100],
    brakes:        [0.5,  0.8],
    grip:          [0.5,  0.7],
    aggression:    [0.3,    0.5],
  },
}

const NISSAN_GTP_ZXT: CarTypeConfig = {
  label: 'Nissan GTP ZX-T',
  count: [2, 3],
  sprites: ZXT_SPRITES,
  fixed: {
    height: 32,
    wheelbase: 48,
    color: '#0000ff',
    maxSpeed: 550,
    maxSteering: 22,
    steeringRate: 200,
    driveBias: 1,
    tireWidth: 6,
    slipScale: 1.2,
    exhaustPosition: 'rear',
    exhaustOffset: 0.6,
    exhaustInterval: 0.7,
    exhaustInset: 14,
    exhaustRadius: 4.6,
    shadowCornerRadius: 1,
  },
  ranges: {
    acceleration:  [100,  120],
    brakes:        [0.7,  1.0],
    grip:          [0.6,  0.9],
  },
}

// --- Factory helpers ---

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function pickUnique<T>(pool: T[], n: number): T[] {
  return shuffle([...pool]).slice(0, n)
}

// Base arrival distance for the closest car, and gap between each subsequent car.
// arrivalRadius must exceed the min turning radius (~46px); 80px is a safe floor.
const ARRIVAL_BASE    = 80
const ARRIVAL_SPACING = 30

function spawnCarType(
  driver: CarDriver,
  config: CarTypeConfig,
  spawnX: number,
  spawnY: number,
  radii: number[],
): void {
  const sprites = pickUnique(config.sprites, radii.length)

  for (let i = 0; i < radii.length; i++) {
    const ranged: Record<string, number> = {}
    if (config.ranges) {
      for (const [key, range] of Object.entries(config.ranges)) {
        if (range) ranged[key] = randFloat(range[0], range[1])
      }
    }

    driver.addCar({
      x: spawnX,
      y: spawnY,
      ...config.fixed,
      ...ranged,
      arrivalRadius: radii[i],
      sprite: sprites[i],
    })
  }
}

// --- Scene setup ---

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

/**
 * Returns the shadow blur radius appropriate for this device.
 * Low-power devices (detected via RAM and CPU core count) get sharp shadows (0)
 * to avoid the GPU cost of a full-viewport blur filter each frame.
 */
function shadowBlurBudget(): number {
  const mem = (navigator as any).deviceMemory as number | undefined
  const cores = navigator.hardwareConcurrency ?? 4
  const isLowPower = (mem !== undefined && mem <= 1)
                  || (cores <= 4 && navigator.maxTouchPoints > 0)
  return isLowPower ? 0 : 2
}

export function initCarScene(): () => void {
  const driver = new CarDriver({
    count: 0,
    zIndex: CANVAS_Z_INDEX,
    clickTarget: null,
    skidOpacity: 0.04,
    shadow: true,
    shadowBlur: shadowBlurBudget(),
    shadowOpacity: 0.5,
    shadowOffsetX: 2,
    shadowOffsetY: 4,
    driverChange: true,
  })

  // All cars spawn off-screen upper-right so they race onto the page on load
  const spawnX = window.innerWidth * 1.5
  const spawnY = 0

  // Pre-pick counts so arrival radii can be distributed across the full fleet
  const audiCount   = randInt(AUDI_90_GTO.count[0],    AUDI_90_GTO.count[1])
  const nissanCount = randInt(NISSAN_GTP_ZXT.count[0], NISSAN_GTP_ZXT.count[1])
  const totalCount  = audiCount + nissanCount

  // Shuffle radii so parking slots are mixed between car types
  const allRadii = shuffle(Array.from({ length: totalCount }, (_, i) => ARRIVAL_BASE + i * ARRIVAL_SPACING))

  spawnCarType(driver, AUDI_90_GTO,    spawnX, spawnY, allRadii.slice(0, audiCount))
  spawnCarType(driver, NISSAN_GTP_ZXT, spawnX, spawnY, allRadii.slice(audiCount))

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
