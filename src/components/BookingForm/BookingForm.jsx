import { useState } from 'react';
import Button from '../Button/Button.jsx';
import { formatPrice } from '../../utils/format.js';
import './BookingForm.css';

const PHONE_RE = /^\+?[\d\s()-]{10,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY = { name: '', contact: '', format: 'online', comment: '', consent: false };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Укажите имя';
  const contact = values.contact.trim();
  if (!contact) errors.contact = 'Укажите телефон или e-mail';
  else if (!PHONE_RE.test(contact) && !EMAIL_RE.test(contact)) {
    errors.contact = 'Похоже, в телефоне или e-mail опечатка';
  }
  if (!values.consent) errors.consent = 'Нужно согласие на обработку данных';
  return errors;
}

/*
 * Форма записи — демо без сервера: данные проверяются и показывается подтверждение.
 * Выбранный тариф хранится в родителе (LecturerPage), чтобы карточки тарифов и форма были связаны.
 */
export default function BookingForm({ lecturer, tariffIndex, onTariffChange }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);

  const tariff = lecturer.tariffs[tariffIndex];

  function update(field, value) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setSubmitted(true);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(`booking-${firstInvalid}`)?.focus();
      return;
    }
    setSent(true);
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setSubmitted(false);
    setSent(false);
  }

  if (sent) {
    return (
      <div className="booking-success" role="status">
        <h3 className="booking-success__title">Заявка принята!</h3>
        <p>
          {values.name.trim()}, спасибо! Мы свяжемся с вами ({values.contact.trim()}), чтобы согласовать
          «{tariff.title}» с лектором {lecturer.fullName}. Формат: {values.format === 'online' ? 'онлайн' : 'офлайн'}.
        </p>
        <p className="booking__note">Это демо-форма учебного проекта: данные никуда не отправляются.</p>
        <Button onClick={reset}>Отправить ещё одну заявку</Button>
      </div>
    );
  }

  const fieldProps = (name) => ({
    id: `booking-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `booking-${name}-error` : undefined,
  });

  const error = (name) =>
    errors[name] && (
      <span id={`booking-${name}-error`} className="field__error">
        {errors[name]}
      </span>
    );

  return (
    <form className="booking" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label className="field__label" htmlFor="booking-name">
          Имя
        </label>
        <input
          {...fieldProps('name')}
          className="field__control"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
        />
        {error('name')}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="booking-contact">
          Телефон или e-mail
        </label>
        <input
          {...fieldProps('contact')}
          className="field__control"
          value={values.contact}
          onChange={(e) => update('contact', e.target.value)}
        />
        {error('contact')}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="booking-tariff">
          Тариф
        </label>
        <select
          id="booking-tariff"
          className="field__control"
          value={tariffIndex}
          onChange={(e) => onTariffChange(Number(e.target.value))}
        >
          {lecturer.tariffs.map((t, i) => (
            <option key={t.title} value={i}>
              {t.title} — {formatPrice(t.price, t.priceFrom)}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="field field--fieldset">
        <legend className="field__label">Формат</legend>
        <div className="segmented">
          {[
            ['online', 'Онлайн'],
            ['offline', 'Офлайн'],
          ].map(([value, label]) => (
            <label key={value} className="segmented__option">
              <input
                type="radio"
                name="format"
                value={value}
                checked={values.format === value}
                onChange={() => update('format', value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field field--wide">
        <label className="field__label" htmlFor="booking-comment">
          Комментарий <span className="field__optional">(необязательно)</span>
        </label>
        <textarea
          id="booking-comment"
          className="field__control field__control--textarea"
          rows="3"
          placeholder="Цель занятий, удобное время, уровень подготовки"
          value={values.comment}
          onChange={(e) => update('comment', e.target.value)}
        />
      </div>

      <div className="field field--wide">
        <label className="checkbox">
          <input
            {...fieldProps('consent')}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
          />
          <span>Согласен на обработку персональных данных</span>
        </label>
        {error('consent')}
      </div>

      <div className="booking__actions">
        <Button type="submit" variant="primary">
          Отправить заявку
        </Button>
        <p className="booking__note">Менеджер свяжется с вами в течение рабочего дня.</p>
      </div>
    </form>
  );
}
