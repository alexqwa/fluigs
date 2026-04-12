'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="bg-primary dark:bg-primary relative flex h-8 w-16 items-center rounded-full px-1 transition-colors duration-300"
    >
      <Sun className="text-primary-foreground absolute left-2 size-4" />
      <Moon className="text-primary-foreground absolute right-2 size-4" />

      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="bg-primary-foreground dark:bg-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-full shadow-md"
        animate={{ x: isDark ? 32 : 0 }}
      >
        {isDark ? (
          <Moon className="dark:text-primary size-4" />
        ) : (
          <Sun className="dark:text-primary z-30 size-4" />
        )}
      </motion.div>
    </button>
  )
}
