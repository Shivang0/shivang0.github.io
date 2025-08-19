'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import AnimeBackground from '@/components/graphics/AnimeBackground'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <AnimeBackground variant="dots" />
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex p-4 rounded-full bg-red-500/10 text-red-500 mb-6"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <AlertTriangle className="w-12 h-12" />
            </motion.div>
            <h1 className="text-3xl font-semibold mb-4">Something went wrong!</h1>
            <p className="text-muted mb-8">
              An unexpected error occurred. Our team has been notified and is working on a fix.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={reset}
                icon={RefreshCw}
                iconPosition="left"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                icon={Home}
                iconPosition="left"
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </Button>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  )
}