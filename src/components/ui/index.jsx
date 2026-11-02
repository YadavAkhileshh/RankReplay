import { cn } from '../../lib/utils';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn('bg-white border border-[#E2E8F0] rounded-lg shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('px-5 py-4 border-b border-[#E2E8F0]', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn('text-sm font-semibold text-[#1E293B]', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('px-5 py-4', className)} {...props}>
      {children}
    </div>
  );
}

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-[#DBEAFE] text-[#2563EB] border border-[#BFDBFE]',
    success: 'bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]',
    danger:  'bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]',
    neutral: 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]',
  };
  return (
    <span
      className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}

export function Button({ className, variant = 'primary', size = 'md', disabled, children, ...props }) {
  const variants = {
    primary:   'bg-[#2563EB] text-white hover:bg-[#1D4ED8] border border-[#2563EB]',
    secondary: 'bg-white text-[#1E293B] hover:bg-[#F1F5F9] border border-[#E2E8F0]',
    ghost:     'bg-transparent text-[#64748B] hover:bg-[#F1F5F9] border border-transparent',
    danger:    'bg-[#DC2626] text-white hover:bg-[#B91C1C] border border-[#DC2626]',
    success:   'bg-[#16A34A] text-white hover:bg-[#15803D] border border-[#16A34A]',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-sm',
  };
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export function Select({ value, onChange, options, className, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'h-9 rounded-md border border-[#E2E8F0] bg-white px-3 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 cursor-pointer',
        className,
      )}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function Spinner({ className }) {
  return (
    <svg
      className={cn('animate-spin text-[#2563EB]', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export function Divider({ className }) {
  return <hr className={cn('border-t border-[#E2E8F0] my-4', className)} />;
}
