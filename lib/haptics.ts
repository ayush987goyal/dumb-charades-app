export type HapticPatternType = "light" | "start" | "success" | "skip" | "warning" | "finish"

export interface HapticLogEntry {
  type: HapticPatternType
  pattern: number | number[]
  timestamp: number
  vibrateSupported: boolean
  iosSwitchToggled: boolean
}

declare global {
  interface Window {
    __charadesHapticsLog?: HapticLogEntry[]
  }
}

const HAPTIC_PATTERNS: Record<HapticPatternType, number | number[]> = {
  light: 15,
  start: 40,
  success: [35, 40, 70],
  skip: 25,
  warning: 60,
  finish: [300, 100, 400],
}

let iosSwitchInput: HTMLInputElement | null = null
let iosSwitchLabel: HTMLLabelElement | null = null

function ensureIOSHapticSwitch(): { input: HTMLInputElement; label: HTMLLabelElement } | null {
  if (typeof document === "undefined") return null

  if (iosSwitchInput && iosSwitchLabel && document.body.contains(iosSwitchInput)) {
    return { input: iosSwitchInput, label: iosSwitchLabel }
  }

  const existingInput = document.getElementById("charades-ios-haptic-switch") as HTMLInputElement | null
  const existingLabel = document.getElementById("charades-ios-haptic-label") as HTMLLabelElement | null
  if (existingInput && existingLabel) {
    iosSwitchInput = existingInput
    iosSwitchLabel = existingLabel
    return { input: iosSwitchInput, label: iosSwitchLabel }
  }

  const input = document.createElement("input")
  input.type = "checkbox"
  input.id = "charades-ios-haptic-switch"
  input.setAttribute("switch", "")
  input.setAttribute("aria-hidden", "true")
  input.tabIndex = -1
  Object.assign(input.style, {
    position: "fixed",
    top: "-100px",
    left: "-100px",
    width: "1px",
    height: "1px",
    opacity: "0",
    pointerEvents: "none",
  })

  const label = document.createElement("label")
  label.htmlFor = "charades-ios-haptic-switch"
  label.id = "charades-ios-haptic-label"
  label.setAttribute("aria-hidden", "true")
  Object.assign(label.style, {
    position: "fixed",
    top: "-100px",
    left: "-100px",
    width: "1px",
    height: "1px",
    opacity: "0",
    pointerEvents: "none",
  })

  document.body.appendChild(input)
  document.body.appendChild(label)
  iosSwitchInput = input
  iosSwitchLabel = label

  return { input, label }
}

export function triggerHaptic(type: HapticPatternType): void {
  if (typeof window === "undefined") return

  const pattern = HAPTIC_PATTERNS[type]
  let vibrateSupported = false
  let iosSwitchToggled = false

  try {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      vibrateSupported = navigator.vibrate(pattern)
    }
  } catch {
    // Ignore errors on browsers that block Vibration API outside user gestures
  }

  // Trigger iOS 17.4+ / 18+ Safari Taptic Engine via hidden <input type="checkbox" switch>
  try {
    const switchEls = ensureIOSHapticSwitch()
    if (switchEls) {
      switchEls.label.click()
      iosSwitchToggled = true
    }
  } catch {
    // Ignore DOM errors
  }

  const entry: HapticLogEntry = {
    type,
    pattern,
    timestamp: Date.now(),
    vibrateSupported,
    iosSwitchToggled,
  }

  if (!window.__charadesHapticsLog) {
    window.__charadesHapticsLog = []
  }
  window.__charadesHapticsLog.push(entry)
  try {
    const CustomEventCtor = window.CustomEvent || CustomEvent
    window.dispatchEvent(new CustomEventCtor("charades:haptic", { detail: entry }))
  } catch {
    // Ignore CustomEvent realm mismatches in synthetic DOM environments
  }
}

export async function requestScreenWakeLock(): Promise<WakeLockSentinel | null> {
  if (typeof navigator === "undefined" || !("wakeLock" in navigator)) {
    return null
  }
  try {
    return await navigator.wakeLock.request("screen")
  } catch {
    return null
  }
}
