export default function Loader({ label = 'Cargando experiencias florales', screen = false }) {
  return (
    <div className={`loader${screen ? ' loader--screen' : ''}`} role="status" aria-live="polite">
      <span className="loader__flower" aria-hidden="true"></span>
      <p>{label}</p>
    </div>
  )
}