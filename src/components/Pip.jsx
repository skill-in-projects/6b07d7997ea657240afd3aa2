// Pip the fox. The outfit sits on top of the head once the kid has earned it.
export default function Pip({ outfit = '', happy = false }) {
  return (
    <div className={`pip ${happy ? 'pip-happy' : ''}`} aria-hidden="true">
      <span>🦊</span>
      {outfit && <span className="pip-outfit">{outfit}</span>}
    </div>
  )
}
