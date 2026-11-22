import Button from '../../components/Button/Button.jsx';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';

export default function NotFoundPage() {
  useDocumentTitle('Страница не найдена — Учебная платформа');

  return (
    <section className="frame section">
      <p className="section__lead">Ошибка 404</p>
      <h1 className="section__title">Такой страницы нет</h1>
      <p className="section__lead">Возможно, ссылка устарела. Начните с главной или загляните в список лекторов.</p>
      <Button to="/">На главную</Button>
    </section>
  );
}
