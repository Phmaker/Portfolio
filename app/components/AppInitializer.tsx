'use client';

import { useEffect } from 'react';

export default function AppInitializer() {
  useEffect(() => {
    // Lógica para animação de scroll
    const checkScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verifica no carregamento inicial

    // Lógica para partículas (opcional, pode remover se não gostar)
    // Esta é uma versão simplificada
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particlesContainer.appendChild(particle);
      }
    }

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return null; // Este componente não renderiza nada no DOM
}