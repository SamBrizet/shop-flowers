import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiClock, FiHeart, FiMapPin, FiMenu, FiMoon, FiShoppingBag, FiSun, FiUser, FiX } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { GiRose } from 'react-icons/gi'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import ScrollToTopButton from '../components/ScrollToTopButton.jsx'
import { useShop } from '../context/useShop.js'

const links = [
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/favoritos', label: 'Favoritos' },
  { to: '/catalogo?categoria=Rosas', label: 'Rosas' },
  { to: '/catalogo?categoria=Tulipanes', label: 'Tulipanes' },
  { to: '/catalogo?categoria=Girasoles', label: 'Girasoles' },
  { to: '/catalogo?categoria=Gerberas', label: 'Gerberas' },
  { to: '/#preguntas', label: 'Preguntas frecuentes', isAnchor: true },
  { to: '/#contacto', label: 'Contacto', isAnchor: true },
]

export default function AppShell() {
  const [menuOpen, setMenuOpen] = useState(() => window.matchMedia('(min-width: 900px)').matches)
  const { cartCount, theme, toggleTheme, wishlist, toast } = useShop()
  const navigate = useNavigate()
  const cartLabel = useMemo(() => (cartCount > 99 ? '99+' : cartCount), [cartCount])
  const isDesktop = window.matchMedia('(min-width: 900px)').matches

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 900px)')
    const syncMenu = (event) => setMenuOpen(event.matches)

    desktopQuery.addEventListener('change', syncMenu)
    return () => desktopQuery.removeEventListener('change', syncMenu)
  }, [])

  const handleNavSelection = () => {
    if (!window.matchMedia('(min-width: 900px)').matches) {
      setMenuOpen(false)
    }
  }

  const handleAnchorSelection = (event, to) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    event.preventDefault()
    handleNavSelection()
    navigate(to)
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label={isDesktop ? (menuOpen ? 'Ocultar navegacion' : 'Mostrar navegacion') : (menuOpen ? 'Cerrar menu' : 'Abrir menu')}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen && !isDesktop ? <FiX /> : <FiMenu />}
        </button>

        <NavLink className="brand" to="/" aria-label="Inicio, logo provisional de la floreria">
          <span className="brand__mark" aria-hidden="true"><GiRose /></span>
        </NavLink>

        <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Principal">
          {links.map((link) => (
            link.isAnchor ? (
              <Link key={link.to} to={link.to} onClick={(event) => handleAnchorSelection(event, link.to)}>
                {link.label}
              </Link>
            ) : (
              <NavLink key={link.to} to={link.to} onClick={handleNavSelection}>
                {link.label}
              </NavLink>
            )
          ))}
        </nav>

        <div className="header-actions">
          <NavLink className="icon-button icon-button--wishlist" to="/favoritos" aria-label={`Favoritos: ${wishlist.length}`}>
            <FiHeart />
            <span aria-hidden="true">{wishlist.length}</span>
          </NavLink>
          <NavLink className="icon-button icon-button--cart" to="/carrito" aria-label={`Carrito: ${cartLabel} productos`}>
            <FiShoppingBag />
            <span aria-hidden="true">{cartLabel}</span>
          </NavLink>
          <NavLink className="icon-button icon-button--desktop" to="/perfil" aria-label="Perfil">
            <FiUser />
          </NavLink>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <section className="site-footer__brand">
            <span className="brand__mark" aria-hidden="true"><GiRose /></span>
            <p>Flores frescas, hechas a mano para tus momentos especiales.</p>
            <a
              className="site-footer__whatsapp"
              href="https://wa.me/51922013597"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp aria-hidden="true" />
              <span>
                <strong>Estamos atendiendo</strong>
                <small>Escríbenos por WhatsApp</small>
              </span>
            </a>
          </section>

          <section className="site-footer__block">
            <h2>Ubicación</h2>
            <p><FiMapPin aria-hidden="true" /> Miraflores, Lima, Perú</p>
            <p>Entregas en Lima Metropolitana</p>
          </section>

          <section className="site-footer__block">
            <h2>Horario</h2>
            <p><FiClock aria-hidden="true" /> Lunes a sábado: 8:00 a. m. – 8:00 p. m.</p>
            <p>Domingos: 9:00 a. m. – 3:00 p. m.</p>
          </section>

          <section className="site-footer__block">
            <h2>Síguenos</h2>
            <div className="site-footer__social">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram aria-hidden="true" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebookF aria-hidden="true" />
              </a>
              <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                <FaTiktok aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
        <p className="site-footer__legal">© {new Date().getFullYear()} Shop Flowers. Todos los derechos reservados.</p>
      </footer>

      <ScrollToTopButton />

      <button type="button" className="theme-fab" onClick={toggleTheme} aria-label="Cambiar tema">
        {theme === 'light' ? <FiMoon /> : <FiSun />}
      </button>

      <AnimatePresence>
        {toast.open ? (
          <motion.div
            className="toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}