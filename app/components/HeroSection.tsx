'use client'

import { useTranslations } from '../hooks/useTranslations'

export default function HeroSection() {
  const { t, isLoading } = useTranslations();

  return (
    <section className="hero" id="home">
      {/* Efeitos de fundo (partículas e gradientes) */}
      <div className="particles" id="particles-js"></div>
      <div className="hero::before" aria-hidden="true"></div>
      <div className="hero::after" aria-hidden="true"></div>

      <div className="container">
        <div className="hero-content">
          
          {/* Coluna de Texto */}
          <div className="hero-text">
            <h1>
                {isLoading ? '...' : t('hero.title')}
            </h1>
            <p>
              {isLoading ? '...' : t('hero.subtitle')}
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn-primary">
                {isLoading ? '...' : t('hero.viewProjects')}
              </a>
              <a href="#contact" className="btn-secondary">
                {isLoading ? '...' : t('hero.contact')}
              </a>
            </div>
          </div>

          {/* Coluna do Card de Perfil */}
          <div className="hero-visual">
            <div className="glass-card profile-card">
              <div className="profile-img"></div>
              <h3 className="text-xl font-bold">Seu Nome</h3>
              <p style={{color: 'var(--texto-secundario)', marginBottom: '1rem'}}>Full Stack Developer</p>
              <p style={{fontSize: '0.9rem', color: 'var(--texto-secundario)'}}>
                Especializado em criar soluções modernas e escaláveis.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}