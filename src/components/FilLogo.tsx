import { cn } from '@/lib/utils';

type Variant = 'principal' | 'negativo' | 'positivo';

interface FilLogoProps {
  variant?: Variant;
  seal?: boolean;
  className?: string;
}

/** FIL Chill wordmark per brand manual v1.0: no rotation, shadows or effects. */
const FilLogo = ({ variant = 'positivo', seal = false, className }: FilLogoProps) => {
  const color = variant === 'positivo' ? 'text-pelambre-violet' : 'text-white';
  const mark = (
    <span className={cn('inline-flex flex-col items-center leading-none select-none', color)}>
      <span className="font-display font-black uppercase text-[1em] leading-[0.85] tracking-tight">FIL</span>
      <span className="font-sans font-black text-[0.42em] leading-none -mt-[0.02em]">Chill</span>
    </span>
  );
  if (!seal) return <span className={cn('inline-block min-w-[72px] text-5xl', className)} aria-label="FIL Chill">{mark}</span>;
  return (
    <span
      aria-label="FIL Chill"
      className={cn(
        'inline-flex items-center justify-center rounded-full border-[3px] aspect-square p-[0.35em] text-3xl',
        variant === 'positivo' ? 'border-pelambre-violet' : 'border-white',
        className,
      )}
    >
      {mark}
    </span>
  );
};

export default FilLogo;
