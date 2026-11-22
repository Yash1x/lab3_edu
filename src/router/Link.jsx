import { useLocation } from './router.js';

export default function Link({ to, exact = false, className = '', activeClassName = '', children, ...rest }) {
  const { pathname } = useLocation();
  const target = to.split('?')[0];
  const isActive = exact
    ? pathname === target
    : pathname === target || pathname.startsWith(`${target}/`);

  const classes = [className, isActive && activeClassName].filter(Boolean).join(' ');

  return (
    <a
      href={`#${to}`}
      className={classes || undefined}
      aria-current={isActive && activeClassName ? 'page' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
