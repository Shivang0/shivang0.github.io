'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  onSearchOpen: () => void
  navItems: Array<{ href: string; label: string }>
}

export default function MobileNav({ isOpen, onClose, onSearchOpen, navItems }: MobileNavProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <motion.div
      className="fixed inset-0 z-40 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.nav
        className="absolute right-0 top-0 h-full w-full max-w-xs sm:max-w-sm bg-surface border-l border-border"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-6">
          {/* Search Button */}
          <button
            onClick={() => {
              onSearchOpen()
              onClose()
            }}
            className="flex items-center gap-3 py-3 px-4 rounded-lg text-base font-medium text-muted hover:bg-panel hover:text-text transition-colors w-full mb-4 border border-border"
          >
            <Search className="w-5 h-5" />
            <span>Search...</span>
            <kbd className="ml-auto px-1.5 py-0.5 text-xs bg-panel rounded border border-border">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          <ul className="space-y-2 overflow-y-auto flex-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'block py-3 px-4 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-text hover:bg-panel'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </motion.nav>
    </motion.div>
  )
}