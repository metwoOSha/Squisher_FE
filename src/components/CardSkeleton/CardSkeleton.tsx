import mixins from '@/styles/mixins.module.css';
import cls from './CardSkeleton.module.css';

/** Stand-in for a Card while /links is in flight — same box, so the list doesn't jump. */
export default function CardSkeleton() {
    return (
        <div className={cls.card} aria-hidden="true">
            <div className={cls.top}>
                <span className={`${mixins.skeleton} ${cls.short}`} />
                <span className={`${mixins.skeleton} ${cls.copy}`} />
            </div>

            <span className={`${mixins.skeleton} ${cls.long}`} />

            <div className={cls.meta}>
                <span className={`${mixins.skeleton} ${cls.date}`} />
                <span className={`${mixins.skeleton} ${cls.clicks}`} />
            </div>
        </div>
    );
}
