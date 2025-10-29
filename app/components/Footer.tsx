'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-content">
          <h2 className="text-2xl mb-4">Vamos trabalhar juntos?</h2>
          <p className="text-[--texto-secundario] max-w-md mx-auto">
            Estou sempre aberto a novos projetos e oportunidades. Entre em contato!
          </p>
          <div className="social-links">
            {/* Adicione os seus links aqui */}
            <a href="#" className="social-link">G</a>
            <a href="#" className="social-link">L</a>
            <a href="#" className="social-link">E</a>
          </div>
          <p className="text-sm text-[--texto-secundario]">
            &copy; {currentYear} Seu Nome. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}