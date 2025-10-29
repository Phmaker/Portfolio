'use client'

import { createContext, useContext, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

type Language = 'pt' | 'en' | 'es'

interface LanguageContextType {
    currentLanguage: Language
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function LanguageContent({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams()
    const lang = searchParams.get('lang') as Language

    const currentLanguage = useMemo<Language>(() => {
        return lang && ['pt', 'en', 'es'].includes(lang) ? lang : 'pt'
    }, [lang])

    return (
        <LanguageContext.Provider value={{ currentLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function LanguageProvider({ children }: { children: React.ReactNode }){
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LanguageContent>{children}</LanguageContent>
        </Suspense>
    )
}

export function useLanguage(){
    const context = useContext(LanguageContext)
    if (context === undefined){
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}