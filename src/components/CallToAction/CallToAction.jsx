import Button from '../Button/Button.jsx';
import './CallToAction.css';

// Плашка-призыв в цветах хэдера. action: { label, to } или { label, href }
export default function CallToAction({ title, text, action }) {
  const { label, ...linkProps } = action;
  return (
    <section className="frame cta">
      <div className="cta__content">
        <h2 className="cta__title">{title}</h2>
        <p className="cta__text">{text}</p>
      </div>
      <Button variant="light" {...linkProps}>
        {label} <span className="button__arrow" aria-hidden="true">→</span>
      </Button>
    </section>
  );
}
