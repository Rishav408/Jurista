import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

/**
 * Shared button with variants:
 *   primary   — solid accent with arrow-lift hover
 *   ghost     — borderless, subtle hover background
 *   outline   — bordered
 *   secondary — navy solid
 * Renders a <Link> when `to` is given, an <a> when `href` is given.
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconRight: IconRight,
    loading = false,
    disabled = false,
    className = '',
    children,
    to,
    href,
    onClick,
    type = 'button',
    ...rest
  },
  ref
) {
  const base =
    'group/btn inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-accent text-white shadow-card hover:bg-accent-deep hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-navy text-white shadow-card hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 dark:bg-navy-light',
    outline:
      'border border-[var(--border)] bg-transparent hover:bg-[var(--bg-tertiary)] hover:border-accent/40',
    ghost: 'bg-transparent hover:bg-[var(--bg-tertiary)]',
    accentGhost: 'bg-accent/10 text-accent hover:bg-accent/15',
    /* Sits on the amber CTA gradient: deep amber keeps white text readable. */
    onAccent:
      'bg-accent-deep text-white shadow-lift hover:brightness-110 hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0',
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-sm',
    md: 'px-5 py-2.5 text-[15px]',
    lg: 'px-7 py-3.5 text-base',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const isDisabled = disabled || loading;

  let content = (
    <>
      {loading && (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {!loading && Icon && <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />}
      <span className="truncate">{children}</span>
      {IconRight && (
        <IconRight
          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5"
          strokeWidth={2}
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link
        ref={ref}
        to={to}
        className={`${classes} ${isDisabled ? 'pointer-events-none opacity-50' : ''}`}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${classes} ${isDisabled ? 'pointer-events-none opacity-50' : ''}`}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} disabled={isDisabled} onClick={onClick} {...rest}>
      {content}
    </button>
  );
});

export default Button;
