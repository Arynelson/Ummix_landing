import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useAnimateOnScroll(threshold = 0.1) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold, margin: '0px 0px -50px 0px' })

  return {
    ref,
    style: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0px)' : 'translateY(40px)',
      transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.15s',
    },
  }
}
