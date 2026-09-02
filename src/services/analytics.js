export function pushDataLayerEvent(eventName, parameters = {}) {
  if (typeof window === 'undefined') return

  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      ...parameters,
      event: eventName,
    })
  } catch {
    // Analytics must never block the primary user flow.
  }
}
