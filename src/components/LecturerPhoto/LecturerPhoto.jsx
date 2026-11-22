import { useState } from 'react';
import { photoUrl } from '../../config.js';
import { initials } from '../../utils/format.js';
import './LecturerPhoto.css';

export default function LecturerPhoto({ lecturer, size = 'large' }) {
  const src = photoUrl(lecturer.photo);
  const [failedSrc, setFailedSrc] = useState(null);
  const showImage = src && failedSrc !== src;

  return (
    <figure className={`lecturer-photo lecturer-photo--${size}`}>
      <div className="lecturer-photo__frame">
        {showImage ? (
          <img
            className="lecturer-photo__img"
            src={src}
            alt={`Фото: ${lecturer.fullName}`}
            loading="lazy"
            decoding="async"
            onError={() => setFailedSrc(src)}
          />
        ) : (
          <span className="lecturer-photo__initials" role="img" aria-label={`Фото: ${lecturer.fullName}`}>
            {initials(lecturer.fullName)}
          </span>
        )}
      </div>
      <span className="lecturer-photo__line" aria-hidden="true" />
    </figure>
  );
}
