import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiHeart, FiMenu, FiMoon, FiShoppingBag, FiSun, FiUser, FiX } from 'react-icons/fi'
import { NavLink, Outlet } from 'react-router-dom'
import ScrollToTopButton from '../components/ScrollToTopButton.jsx'
import { useShop } from '../context/useShop.js'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catalogo' },
  { to: '/favoritos', label: 'Favoritos' },
  { to: '/perfil', label: 'Perfil' },
]

export default function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount, theme, toggleTheme, wishlist, toast } = useShop()
  const cartLabel = useMemo(() => (cartCount > 99 ? '99+' : cartCount), [cartCount])

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">
          <span className="brand__mark">SF</span>
          <span>
            Shop Flowers
            <small>Floral atelier</small>
          </span>
        </NavLink>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Principal">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" className="icon-button" onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
          <NavLink className="icon-button" to="/favoritos" aria-label="Favoritos">
            <FiHeart />
            <span>{wishlist.length}</span>
          </NavLink>
          <NavLink className="icon-button" to="/carrito" aria-label="Carrito">
            <FiShoppingBag />
            <span>{cartLabel}</span>
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
        <div>
          <strong>Shop Flowers</strong>
          <p>Arreglos florales, gifting premium y experiencias visuales con curaduria editorial.</p>
        </div>
        <div>
          <a href="mailto:hola@shopflowers.dev">hola@shopflowers.dev</a>
          <a href="tel:+51922013597">+51 922 013 597</a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            Instagram atelier
          </a>
        </div>
      </footer>

      <ScrollToTopButton />

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