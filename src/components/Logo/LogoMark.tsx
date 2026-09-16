import clsx from 'clsx';
import cls from './LogoMark.module.css';

interface LogoMarkProps {
    compact?: boolean;
}

export default function LogoMark({ compact = false }: LogoMarkProps) {
    return (
        <span className={clsx(cls.mark, compact && cls.compact)} aria-hidden="true">
            <span className={cls.bar} />
            <span className={cls.bar} />
            <span className={cls.bar} />
        </span>
    );
}
