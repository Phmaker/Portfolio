'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import { useTranslations } from '../hooks/useTranslations'
import LanguageSwitcher from './LanguageSwitcher'

// Tipos
interface NavItem {
  href: string;
  key: string;
}

// Componentes internos Memoizados para performance
const MobileMenuButton = memo(({ onClick }: { onClick: () => void }) => (
  <button 
    className="lg:hidden z-50 text-white"
    onClick={onClick}
    aria-label="Abrir menu"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
  </button>
));
MobileMenuButton.displayName = 'MobileMenuButton';
  
const CloseMenuButton = memo(({ onClick }: { onClick: () => void }) => (
  <button 
    className="close-menu"
    onClick={onClick}
    aria-label="Fechar menu"
  >
     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
  </button>
));
CloseMenuButton.displayName = 'CloseMenuButton';

const NavigationLink = memo(({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) => (
    <a href={href} onClick={onClick}>{label}</a>
));
NavigationLink.displayName = 'NavigationLink';

// Dados de Navegação
const DEFAULT_NAVIGATION: NavItem[] = [
  { href: '#home', key: 'navigation.home' },
  { href: '#skills', key: 'navigation.skills' },
  { href: '#projects', key: 'navigation.projects' },
  { href: '#contact', key: 'navigation.contact' }
];

// Componente Principal do Header
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, currentLanguage } = useTranslations();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  const handleMobileMenuToggle = useCallback((state: boolean) => {
    setIsMobileMenuOpen(state);
    document.body.style.overflow = state ? 'hidden' : 'unset';
  }, []);

  const handleNavigationClick = useCallback(() => {
    handleMobileMenuToggle(false);
  }, [handleMobileMenuToggle]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <header id="header" className={isScrolled ? 'scrolled' : ''}>
        <nav className="nav-glass">
          <div className="logo">DevPortfolio</div>
          
          <div className="hidden lg:flex items-center gap-8">
            <div className="nav-links">
              {DEFAULT_NAVIGATION.map((item: NavItem) => (
                <NavigationLink 
                  key={`${item.href}-${currentLanguage}`}
                  href={item.href}
                  label={t(item.key)}
                />
              ))}
            </div>
            <LanguageSwitcher />
          </div>

          <MobileMenuButton onClick={() => handleMobileMenuToggle(true)} />
        </nav>
      </header>

      {/* O Menu Mobile em si (controlado pelo estado isMobileMenuOpen) */}
      <div 
        className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <CloseMenuButton onClick={() => handleMobileMenuToggle(false)} />
        
        {DEFAULT_NAVIGATION.map((item: NavItem) => (
          <NavigationLink
            key={`mobile-${item.href}-${currentLanguage}`}
            href={item.href}
            label={t(item.key)}
            onClick={handleNavigationClick}
          />
        ))}

        <div className="mt-8 pt-6 border-t border-white/10">
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}