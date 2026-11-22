import './Accordion.css';

// Раскрывающийся блок на нативных <details>/<summary>: доступен с клавиатуры без JS
export default function Accordion({ title, subtitle, defaultOpen = false, children }) {
  return (
    <details className="accordion" open={defaultOpen}>
      <summary className="accordion__summary">
        <span className="accordion__title">{title}</span>
        {subtitle && <span className="accordion__subtitle">{subtitle}</span>}
        <span className="accordion__icon" aria-hidden="true" />
      </summary>
      <div className="accordion__content">{children}</div>
    </details>
  );
}
