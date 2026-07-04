import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'

export default function NotFoundPage() {
  useDocumentMeta({
    title: '404 | Shop Flowers',
    description: 'Pagina no encontrada dentro de la boutique floral.',
  })

  return (
    <section className="empty-state empty-state--page">
      <p className="section-intro__eyebrow">404</p>
      <h1>La pagina que buscas no florecio aqui.</h1>
      <p>Regresa al inicio o explora el catalogo principal.</p>
      <div className="hero-panel__actions">
        <Link className="btn btn--primary" to="/">
          Ir al inicio
        </Link>
        <Link className="btn btn--secondary" to="/catalogo">
          Ver catalogo
        </Link>
      </div>
    </section>
  )
}