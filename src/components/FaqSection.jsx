import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { faqs } from '../data/content.js'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="faq-section" id="preguntas" aria-labelledby="faq-title">
      <div className="faq-section__inner">
        <header className="faq-intro">
          <p className="section-intro__eyebrow">Antes de elegir</p>
          <h2 id="faq-title">Preguntas frecuentes</h2>
          <p>Resolvemos las dudas más comunes para que regales con total tranquilidad.</p>
          <a
            className="faq-intro__cta"
            href="https://wa.me/51922013597"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp aria-hidden="true" /> ¿Otra duda? Escríbenos
          </a>
        </header>

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div key={item.question} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-question-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span>{item.question}</span>
                    <FiPlus aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="faq-item__panel"
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
