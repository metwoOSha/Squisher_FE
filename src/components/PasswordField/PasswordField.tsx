import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@/components/Icons';
import cls from './PasswordField.module.css';

interface PasswordFieldProps {
    id: string;
    label: string;
    value: string;
    autoComplete: string;
    onChange: (value: string) => void;
}

export default function PasswordField({ id, label, value, autoComplete, onChange }: PasswordFieldProps) {
    const [isVisible, setIsVisible] = useState(false);

    const action = isVisible ? 'Hide password' : 'Show password';

    return (
        <div>
            <label className={cls.label} htmlFor={id}>
                {label}
            </label>

            <div className={cls.field}>
                <input
                    id={id}
                    className={cls.input}
                    type={isVisible ? 'text' : 'password'}
                    autoComplete={autoComplete}
                    placeholder="••••••••"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                />

                {/* tabIndex -1 keeps Tab going straight to the next field, as in most auth forms. */}
                <button
                    type="button"
                    className={cls.toggle}
                    onClick={() => setIsVisible((prev) => !prev)}
                    title={action}
                    aria-label={action}
                    aria-pressed={isVisible}
                    tabIndex={-1}
                >
                    {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </button>
            </div>
        </div>
    );
}
