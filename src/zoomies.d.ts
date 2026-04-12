declare module '@jamiehs/zoomies' {
  export interface CarOptions {
    x?: number
    y?: number
    heading?: number
    color?: string
    maxSpeed?: number
    acceleration?: number
    brakes?: number
    brakeDecel?: number
    wheelbase?: number
    height?: number
    tireWidth?: number
    maxSteering?: number
    steeringRate?: number
    twitchiness?: number
    arrivalRadius?: number
    skidThreshold?: number
    slipStiffness?: number
    slipDamping?: number
    slipScale?: number
    driveBias?: number
    aggression?: number
    sprite?: string | HTMLImageElement | null
    shadowCornerRadius?: number
    exhaustPosition?: 'left' | 'right' | 'bothSides' | 'rear' | null
    exhaustOffset?: number
    exhaustRadius?: number
    exhaustInterval?: number
    exhaustAngle?: number
    exhaustInset?: number
    grip?: number
    orbitDetection?: boolean
    proximityBoost?: boolean
  }

  export interface CarDriverOptions {
    count?: number
    zIndex?: number
    clickTarget?: Element | Document | null
    carOptions?: CarOptions
    debug?: boolean
    driverChange?: boolean
    skidOpacity?: number
    shadow?: boolean
    shadowOpacity?: number
    shadowBlur?: number
    shadowOffsetX?: number
    shadowOffsetY?: number
  }

  export class Car {
    x: number
    y: number
    heading: number
    speed: number
    target: { x: number; y: number } | null
    driveTo(x: number, y: number): void
  }

  export class CarDriver {
    cars: Car[]
    debug: boolean
    _scatterMult: number
    skidOpacity: number
    shadow: boolean
    shadowOpacity: number
    shadowBlur: number
    shadowOffsetX: number
    shadowOffsetY: number
    constructor(opts?: CarDriverOptions)
    driveTo(x: number, y: number): void
    addCar(opts?: CarOptions): Car
    removeCar(car: Car): void
    destroy(): void
  }
}
