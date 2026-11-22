import Button from '../Button/Button.jsx';
import { formatPrice } from '../../utils/format.js';
import './TariffList.css';

export default function TariffList({ tariffs, selectedIndex, onSelect }) {
  return (
    <ul className="tariffs">
      {tariffs.map((tariff, index) => {
        const isSelected = index === selectedIndex;
        return (
          <li key={tariff.title} className={`tariff${isSelected ? ' tariff--selected' : ''}`}>
            <h3 className="tariff__title">{tariff.title}</h3>
            <p className="tariff__price">{formatPrice(tariff.price, tariff.priceFrom)}</p>
            <Button
              variant={isSelected ? 'primary' : 'outline'}
              aria-pressed={isSelected}
              onClick={() => onSelect(index)}
            >
              {isSelected ? 'Выбрано' : 'Выбрать'}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
