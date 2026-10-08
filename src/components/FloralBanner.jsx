export default function FloralBanner() {
  return (
    <section className="floral-banner" aria-label="Colección floral de temporada">
      <p className="section-intro__eyebrow">Flores de temporada</p>
      <img
        className="floral-banner__image"
        src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=2000&q=88"
        alt="Ramo de peonías rosadas"
        fetchPriority="high"
      />
      <div className="floral-banner__title">
        <h1>Un gesto bonito, hecho flor.</h1>
      </div>
    </section>
  )
}
