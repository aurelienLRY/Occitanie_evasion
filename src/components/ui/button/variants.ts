import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
    // Base styles
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative cursor-pointer',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-white hover:bg-primary/90',
                secondary: 'bg-secondary text-white hover:bg-secondary/90',
                accent: 'bg-accent text-white hover:bg-accent/90',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                danger: 'bg-red-600 text-white hover:bg-red-700',
                warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
                withBg: 'text-black hover:text-white transition-all duration-300',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 px-3',
                lg: 'h-11 px-8',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        },
    }
);