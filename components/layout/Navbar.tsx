'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import ThemeToggle from './ThemeToggle'
import MobileNav from './MobileNav'

const navItems = [
  { href: '/', label: 'Checklist' },
  { href: '/posture', label: 'Posture' },
  { href: '/tools', label: 'Tools' },
  { href: '/prompts', label: 'Prompts' },
  { href: '/benchmarks', label: 'Benchmarks' },
  { href: '/standards', label: 'Standards' },
  { href: '/redteaming', label: 'Red Team' },
  { href: '/threat-taxonomy', label: 'Threats' },
  { href: '/llm-framework', label: 'Framework' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'glass shadow-nav' : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Container>
          <nav className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-text hover:text-accent transition-colors">
              <Shield className="w-6 h-6" />
              <span className="font-display font-semibold text-lg">SecPlatform</span>
            </Link>

            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <ul className="flex items-center gap-3 xl:gap-5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'relative py-2 text-sm font-medium transition-colors whitespace-nowrap',
                          isActive ? 'text-accent' : 'text-muted hover:text-text'
                        )}
                      >
                        {item.label}
                        {isActive && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                            layoutId="navbar-indicator"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <ThemeToggle />
              
              <button
                className="lg:hidden p-2 text-text hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            navItems={navItems}
          />
        )}
      </AnimatePresence>
    </>
  )
}