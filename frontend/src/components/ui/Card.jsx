/** Card primitives — plain, padded, and glass variants. */
import { forwardRef } from 'react';

const Card = forwardRef(function Card({ className = '', hover = false, children, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface-ai)] shadow-card ${
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lift' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
});

/** Semi-transparent glassmorphism card. */
export const GlassCard = forwardRef(function GlassCard(
  { className = '', hover = false, strong = false, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={`${strong ? 'glass-strong' : 'glass'} rounded-2xl shadow-card ${
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lift' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
});

export const CardHeader = ({ className = '', children }) => (
  <div className={`p-5 pb-0 ${className}`}>{children}
  </div>
);

export const CardBody = ({ className = '', children }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

export default Card;
