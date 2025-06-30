import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from './variants';
import type { ButtonProps } from './Button';
import { MarkerLineSvg as SvgIcon } from '@/components/ui/svg/MarkerLine.svg';
import type { VariantProps } from 'class-variance-authority';

const variantColorMap: Record<
    NonNullable<VariantProps<typeof buttonVariants>['variant']>,
    string
> = {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    accent: 'var(--color-accent)',
    danger: 'var(--color-danger)',
    warning: 'var(--color-warning)',
    outline: 'var(--color-text)',
    ghost: 'transparent',
    withBg: '#000000',
};

export interface ButtonWithSvgProps extends ButtonProps {
    svgColor?: string;
}

export const ButtonWithSvg = forwardRef<HTMLButtonElement, ButtonWithSvgProps>(
    ({ className, variant, size, svgColor, children, ...props }, ref) => {
        const resolvedVariant = variant || 'primary';
        const colorForSvg = svgColor || variantColorMap[resolvedVariant] || '#000000';

        return (
            <button
                className={cn(
                    buttonVariants({ variant, size, className }),
                    'relative min-h-[4.25rem] bg-transparent px-24 py-6 transition-all duration-300 hover:-rotate-2 hover:scale-110 hover:bg-transparent z-10'
                )}
                ref={ref}
                {...props}
            >
                <SvgIcon
                    className="absolute inset-0 -z-10 h-full w-full "
                    color={colorForSvg}
                    preserveAspectRatio="none"
                />
                <span className="relative z-10">{children}</span>
            </button>
        );
    }
);
ButtonWithSvg.displayName = 'ButtonWithSvg'; 