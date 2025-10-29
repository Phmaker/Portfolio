'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useLanguage } from '../providers/LanguageProvider'

type Language = 'pt' | 'en' | 'es'

interface LanguageConfig {
  code: Language
  flag: string
  label: string
}

const LANGUAGES: LanguageConfig[] = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
]

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { currentLanguage } = useLanguage()

  const [isOpen, setIsOpen] = useState(false)
  const switcherRef = useRef<HTMLDivElement>(null)

  const changeLanguage = useCallback((locale: Language) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', locale)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
    setIsOpen(false)
  }, [router, pathname, searchParams])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLangConfig = LANGUAGES.find(lang => lang.code === currentLanguage) || LANGUAGES[0];

  return (
    <div className="relative" ref={switcherRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 rounded-lg transition-all duration-300 hover:bg-[--glass-hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white/50"
        aria-label={`Idioma atual: ${currentLangConfig.label}. Mudar idioma.`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-xl" aria-hidden="true">{currentLangConfig.flag}</span>
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-3 w-48 p-2 rounded-xl border border-white/10 shadow-2xl z-50"
          style={{ 
            background: 'var(--glass)', 
            backdropFilter: 'blur(20px)'
          }}
          role="menu"
        >
          {LANGUAGES.map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => changeLanguage(code)}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-left text-base text-[--texto-secundario] hover:text-[--texto] hover:bg-[--glass-hover] transition-all duration-200"
              role="menuitem"
            >
              <span className="text-xl">{flag}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}