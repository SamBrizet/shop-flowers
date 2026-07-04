import { benefits } from '../data/content.js'

export default function FeatureStrip() {
  return (
    <div className="feature-strip">
      {benefits.map((benefit) => (
        <article key={benefit.title} className="feature-card">
          <h3>{benefit.title}</h3>
          <p>{benefit.copy}</p>
        </article>
      ))}
    </div>
  )
}