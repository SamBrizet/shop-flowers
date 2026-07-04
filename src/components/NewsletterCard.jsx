export default function NewsletterCard() {
  return (
    <section className="newsletter-card">
      <div>
        <p className="section-intro__eyebrow">Newsletter</p>
        <h2>Recibe nuevas colecciones, descuentos y lanzamientos editoriales.</h2>
        <p>
          Una vez por semana, sin ruido. Inspiracion floral, recomendaciones para gifting y acceso
          anticipado a promociones.
        </p>
      </div>

      <form className="newsletter-form">
        <label className="sr-only" htmlFor="newsletter-email">
          Correo para newsletter
        </label>
        <input id="newsletter-email" type="email" placeholder="tu@correo.com" />
        <button type="button" className="btn btn--primary">
          Suscribirme
        </button>
      </form>
    </section>
  )
}