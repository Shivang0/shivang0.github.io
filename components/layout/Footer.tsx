'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'
import Container from '@/components/ui/Container'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <Container>
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="font-display font-semibold">SecPlatform</span>
            </div>
            <p className="text-muted text-sm">
              © {new Date().getFullYear()} SecPlatform. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}