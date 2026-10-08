import CategoryList from '../components/CategoryList.jsx'
import FaqSection from '../components/FaqSection.jsx'
import FloralBanner from '../components/FloralBanner.jsx'
import SectionIntro from '../components/SectionIntro.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'

export default function HomePage() {
  useDocumentMeta({
    title: 'Shop Flowers | Boutique floral contemporanea',
    description:
      'E-commerce floral con colecciones premium, favoritos, carrito persistente y experiencias de compra cuidadas.',
  })

  return (
    <div className="page-stack">
      <FloralBanner />

      <section className="content-section home-collections" id="categorias">
        <SectionIntro
          eyebrow="Favoritos del atelier"
          title="Elige tus flores"
        />
        <CategoryList />
      </section>

      <FaqSection />

      <section className="content-section contact-section" id="contacto">
        <div className="contact-panel">
          <div>
            <p className="section-intro__eyebrow">Estamos para ayudarte</p>
            <h2>¿Buscas flores para un momento especial?</h2>
            <p>Cuéntanos a quién quieres sorprender y te ayudamos a encontrar el arreglo indicado.</p>
          </div>
          <div className="contact-panel__actions">
            <a className="btn btn--primary" href="mailto:hola@shopflowers.dev">Escríbenos</a>
            <a href="tel:+51922013597">+51 922 013 597</a>
          </div>
        </div>
      </section>
    </div>
  )
}