import { useState } from 'react';
import { assetUrl } from '../../config.js';
import './HeroPhoto.css';

// Экспортированный фрейм 472×317 содержит фото 434×289 и белые поля.
export default function HeroPhoto({ alt = 'Лектор ведёт занятие в аудитории' }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="hero-photo">
      {failed ? (
        <div className="hero-photo__fallback" role="img" aria-label={alt} />
      ) : (
        <img
          className="hero-photo__img"
          src={assetUrl('images/hero.jpg')}
          alt={alt}
          width="472"
          height="317"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
