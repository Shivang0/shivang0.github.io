'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield, Search, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import ThemeToggle from './ThemeToggle'
import MobileNav from './MobileNav'
import CommandPalette from '@/components/search/CommandPalette'

const navItems = [
  { href: '/', label: 'Checklist' },
  { href: '/labs', label: 'Labs' },
  { href: '/tools', label: 'Tools' },
  { href: '/prompts', label: 'Prompts' },
  { href: '/standards', label: 'Standards' },
  { href: '/threat-taxonomy', label: 'Threats' },
]

const moreNavItems = [
  { href: '/attack-library', label: 'Attack Library' },
  { href: '/learning-paths', label: 'Learning Paths' },
  { href: '/bug-bounties', label: 'Bug Bounties' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/owasp-interactive', label: 'OWASP Interactive' },
  { href: '/pentest-scoping', label: 'Pentest Scoping' },
  { href: '/payload-generator', label: 'Payload Generator' },
  { href: '/incidents', label: 'Incidents' },
  { href: '/community', label: 'Community' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/redteaming', label: 'Red Team' },
  { href: '/research', label: 'Research' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
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
                {/* More dropdown */}
                <li className="relative">
                  <button
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    onBlur={() => setTimeout(() => setIsMoreOpen(false), 150)}
                    className={cn(
                      'relative py-2 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1',
                      moreNavItems.some(item => pathname === item.href) ? 'text-accent' : 'text-muted hover:text-text'
                    )}
                  >
                    More
                    <ChevronDown className={cn('w-4 h-4 transition-transform', isMoreOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {isMoreOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-lg py-2 z-50"
                      >
                        {moreNavItems.map((item) => {
                          const isActive = pathname === item.href
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                'block px-4 py-2 text-sm transition-colors',
                                isActive ? 'text-accent bg-panel' : 'text-text hover:bg-panel hover:text-accent'
                              )}
                            >
                              {item.label}
                            </Link>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-muted bg-surface border border-border rounded-lg hover:bg-panel hover:text-text transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">Search</span>
                <kbd className="hidden md:inline px-1.5 py-0.5 text-xs bg-panel rounded">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>

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
            navItems={[...navItems, ...moreNavItems]}
          />
        )}
      </AnimatePresence>

      {/* Command Palette for Search */}
      <CommandPalette isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  )
}