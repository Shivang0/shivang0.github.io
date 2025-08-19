'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import AnimeBackground from '@/components/graphics/AnimeBackground'

export default function NotFound() {
  return (
    <>
      <AnimeBackground variant="rings" />
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-8xl font-bold gradient-text mb-4"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              404
            </motion.div>
            <h1 className="text-3xl font-semibold mb-4">Page Not Found</h1>
            <p className="text-muted mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button icon={Home} iconPosition="left">
                  Go Home
                </Button>
              </Link>
              <Button
                variant="outline"
                icon={ArrowLeft}
                iconPosition="left"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  )
}