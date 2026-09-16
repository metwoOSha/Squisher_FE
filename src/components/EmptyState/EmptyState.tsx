import cls from './EmptyState.module.css';

interface EmptyStateProps {
    title: string;
    hint: string;
}

export default function EmptyState({ title, hint }: EmptyStateProps) {
    return (
        <div className={cls.empty}>
            <div className={cls.title}>{title}</div>
            <div className={cls.hint}>{hint}</div>
        </div>
    );
}
