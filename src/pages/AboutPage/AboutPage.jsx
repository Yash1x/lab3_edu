import FeatureGrid from '../../components/FeatureGrid/FeatureGrid.jsx';
import Accordion from '../../components/Accordion/Accordion.jsx';
import CallToAction from '../../components/CallToAction/CallToAction.jsx';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import { aboutText, audiences, faq, formats } from '../../data/content.js';
import './AboutPage.css';

export default function AboutPage() {
  useDocumentTitle('О нас — Учебная платформа');

  return (
    <>
      {/* Фрейм «О нас» 1170×343. Комментарий #5: свой стиль шрифта и дополнительные блоки */}
      <section className="frame about">
        <h1 className="about__label">О нас</h1>
        <p className="about__text">{aboutText}</p>
      </section>

      <section className="frame section">
        <h2 className="section__title">Кому мы помогаем</h2>
        <FeatureGrid items={audiences} />
      </section>

      <section className="frame section">
        <h2 className="section__title">Форматы занятий</h2>
        <FeatureGrid items={formats} />
      </section>

      <section className="frame section">
        <h2 className="section__title">Частые вопросы</h2>
        <div className="about__faq">
          {faq.map((item) => (
            <Accordion key={item.question} title={item.question}>
              <p>{item.answer}</p>
            </Accordion>
          ))}
        </div>
      </section>

      <CallToAction
        title="Найдите своего лектора"
        text="10 экспертов, 30 курсов — от алгоритмов и биохимии до дизайна и международных отношений."
        action={{ label: 'К лекторам', to: '/lecturers' }}
      />
    </>
  );
}
