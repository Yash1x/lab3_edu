import { useState } from 'react';
import Link from '../../router/Link.jsx';
import { useLocation } from '../../router/router.js';
import { navigation } from '../../data/navigation.js';
import Logo from '../Logo/Logo.jsx';
import Button from '../Button/Button.jsx';
import './NavigationPanel.css';

/*
 * Компонент «Навигационная панель» из макета, внутри — прямоугольник «Хэдер»
 * (1159×65, скругление 15, градиент #9DB1D2 → #8CB6FB → #ADACAA) и 4 пункта меню
 * (Inter 600, 32px, #FFFFFF).
 * Дополнено по комментарию #2: логотип, подсветка текущего раздела,
 * кнопка «Записаться», бургер-меню на узких экранах, закрепление при прокрутке.
 */
export default function NavigationPanel({ items = navigation }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Закрываем мобильное меню при переходе на другую страницу
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  // В прототипе «Главная» делает Scroll to «Хэдер»: если уже на главной — плавно наверх
  function handleHomeClick(event) {
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <header className="nav-panel">
      <div className="nav-panel__header">
        <Logo onClick={handleHomeClick} />

        <nav
          id="main-menu"
          className={`nav-panel__menu${isOpen ? ' nav-panel__menu--open' : ''}`}
          aria-label="Основное меню"
        >
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              exact={item.exact}
              className="nav-panel__link"
              activeClassName="nav-panel__link--active"
              onClick={item.to === '/' ? handleHomeClick : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button to="/lecturers" variant="light" className="nav-panel__cta">
          Записаться
        </Button>

        <button
          type="button"
          className="nav-panel__burger"
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
          aria-controls="main-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="nav-panel__burger-line" />
        </button>
      </div>
    </header>
  );
}
