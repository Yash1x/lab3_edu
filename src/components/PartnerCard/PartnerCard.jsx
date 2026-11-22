import { useState } from 'react';
import { assetUrl } from '../../config.js';
import './PartnerCard.css';

/*
 * Группа «ICL» / «Татнефть» из фрейма «Партнеры»:
 * логотип 222×93, стрелка ↗ (Montserrat 500, 128px), текст (Montserrat 500, 16px).
 * По комментарию #3 логотип и стрелка ведут на сайт компании.
 */
export default function PartnerCard({ id, name, url, logo, description }) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <article className="partner-card">
      <a className="partner-card__head" href={url} target="_blank" rel="noopener noreferrer">
        {logoFailed ? (
          <span className="partner-card__logo partner-card__logo--text">{name}</span>
        ) : (
          <span className={`partner-card__logo partner-card__logo--${id}`}>
            <img src={assetUrl(logo)} alt={name} onError={() => setLogoFailed(true)} />
          </span>
        )}
        <span className="partner-card__arrow" aria-hidden="true">
          ↗
        </span>
        <span className="visually-hidden">— сайт компании, откроется в новой вкладке</span>
      </a>
      <p className="partner-card__text">{description}</p>
    </article>
  );
}
