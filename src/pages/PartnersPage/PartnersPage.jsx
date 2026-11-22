import PartnerCard from '../../components/PartnerCard/PartnerCard.jsx';
import CallToAction from '../../components/CallToAction/CallToAction.jsx';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import { partners } from '../../data/partners.js';
import { contacts } from '../../data/content.js';
import './PartnersPage.css';

export default function PartnersPage() {
  useDocumentTitle('Партнеры — Учебная платформа');

  return (
    <>
      {/* Фрейм «Партнеры» 1170×371 */}
      <section className="frame partners">
        <h1 className="section__title">Партнеры</h1>
        <div className="partners__grid">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} {...partner} />
          ))}
        </div>
      </section>

      <CallToAction
        title="Станьте партнёром"
        text="Организуем лекции и корпоративное обучение для ваших сотрудников, разместим вашу компанию на странице партнёров."
        action={{ label: 'Написать нам', href: `mailto:${contacts.email}` }}
      />
    </>
  );
}
