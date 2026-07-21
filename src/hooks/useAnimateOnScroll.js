import { useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export function useAnimateOnScroll(threshold = 0.1) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold, margin: '0px 0px -50px 0px' })
  const shouldReduceMotion = useReducedMotion()

  return {
    ref,
    style: {
      opacity: shouldReduceMotion || isInView ? 1 : 0,
      transform: shouldReduceMotion || isInView ? 'translateY(0px)' : 'translateY(40px)',
      transition: shouldReduceMotion ? 'none' : 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.15s',
    },
  }
}
