import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import cls from './SquishButton.module.css';

interface SquishButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function SquishButton({ children, className, ...props }: SquishButtonProps) {
    return (
        <button type="button" className={clsx(cls.button, className)} {...props}>
            <span className={cls.label}>{children}</span>
        </button>
    );
}
