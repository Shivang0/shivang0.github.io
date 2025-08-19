'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import { cn } from '@/lib/utils'
import { isReducedMotion } from '@/lib/utils'

interface AnimeBackgroundProps {
  variant?: 'dots' | 'rings'
  className?: string
}

export default function AnimeBackground({ variant = 'dots', className }: AnimeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<anime.AnimeInstance | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!containerRef.current || isReducedMotion()) return

    const container = containerRef.current
    container.innerHTML = ''

    if (variant === 'dots') {
      createDotGrid(container)
    } else {
      createRingField(container)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        animationRef.current?.pause()
      } else {
        animationRef.current?.play()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      animationRef.current?.pause()
      container.innerHTML = ''
    }
  }, [variant])

  const createDotGrid = (container: HTMLDivElement) => {
    const cols = Math.floor(container.offsetWidth / 50)
    const rows = Math.floor(container.offsetHeight / 50)
    const totalDots = cols * rows

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div')
      dot.className = 'absolute w-1 h-1 bg-accent/5 rounded-full'
      
      const x = (i % cols) * 50 + Math.random() * 20
      const y = Math.floor(i / cols) * 50 + Math.random() * 20
      
      dot.style.left = `${x}px`
      dot.style.top = `${y}px`
      dot.style.opacity = '0'
      
      container.appendChild(dot)
    }

    animationRef.current = anime({
      targets: container.querySelectorAll('div'),
      opacity: [
        { value: 0.08, duration: 2000 },
        { value: 0.02, duration: 3000 },
        { value: 0.08, duration: 2000 }
      ],
      translateY: [
        { value: -10, duration: 8000 },
        { value: 10, duration: 8000 }
      ],
      delay: anime.stagger(100, { from: 'center' }),
      loop: true,
      easing: 'easeInOutSine',
      autoplay: true
    })
  }

  const createRingField = (container: HTMLDivElement) => {
    const centerX = container.offsetWidth / 2
    const centerY = container.offsetHeight / 2
    const ringCount = 5

    for (let i = 0; i < ringCount; i++) {
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      ring.setAttribute('class', 'absolute inset-0 w-full h-full')
      ring.style.opacity = '0'
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', String(centerX))
      circle.setAttribute('cy', String(centerY))
      circle.setAttribute('r', String(100 + i * 80))
      circle.setAttribute('fill', 'none')
      circle.setAttribute('stroke', 'currentColor')
      circle.setAttribute('stroke-width', '1')
      circle.setAttribute('class', 'text-accent/10')
      
      ring.appendChild(circle)
      container.appendChild(ring)
    }

    animationRef.current = anime({
      targets: container.querySelectorAll('svg'),
      opacity: [
        { value: 0.08, duration: 2000 },
        { value: 0.02, duration: 4000 },
        { value: 0.08, duration: 2000 }
      ],
      scale: [
        { value: 1, duration: 0 },
        { value: 1.1, duration: 8000 },
        { value: 1, duration: 8000 }
      ],
      rotate: [
        { value: 0, duration: 0 },
        { value: 180, duration: 16000 }
      ],
      delay: anime.stagger(500),
      loop: true,
      easing: 'easeInOutQuad',
      autoplay: true
    })
  }

  if (isReducedMotion()) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed inset-0 pointer-events-none overflow-hidden',
        'opacity-50',
        className
      )}
      aria-hidden="true"
    />
  )
}