import clsx from 'clsx';
import { ACCENT_SWATCHES } from '@/config';
import cls from './AccentPicker.module.css';

interface AccentPickerProps {
    accent: string;
    onPick: (color: string) => void;
}

export default function AccentPicker({ accent, onPick }: AccentPickerProps) {
    return (
        <div className={cls.picker}>
            {ACCENT_SWATCHES.map((swatch) => (
                <button
                    key={swatch.color}
                    type="button"
                    title={swatch.name}
                    aria-label={`Accent: ${swatch.name}`}
                    aria-pressed={swatch.color.toLowerCase() === accent.toLowerCase()}
                    onClick={() => onPick(swatch.color)}
                    style={{ background: swatch.color }}
                    className={clsx(cls.swatch, swatch.color.toLowerCase() === accent.toLowerCase() && cls.active)}
                />
            ))}
        </div>
    );
}
