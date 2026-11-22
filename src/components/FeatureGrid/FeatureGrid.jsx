import './FeatureGrid.css';

// Сетка карточек «заголовок + текст». numbered — пронумерованные шаги
export default function FeatureGrid({ items, numbered = false }) {
  const List = numbered ? 'ol' : 'ul';
  return (
    <List className={`feature-grid${numbered ? ' feature-grid--numbered' : ''}`}>
      {items.map((item) => (
        <li key={item.title} className="feature">
          <h3 className="feature__title">{item.title}</h3>
          <p className="feature__text">{item.text}</p>
        </li>
      ))}
    </List>
  );
}
