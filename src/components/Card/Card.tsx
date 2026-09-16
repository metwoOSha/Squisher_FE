import type { MouseEvent } from 'react';
import clsx from 'clsx';
import { CopyIcon } from '@/components/Icons';
import { formatDate } from '@/helpers/formatDate';
import { formatCount } from '@/helpers/pluralize';
import { getShortLabel, getShortUrl } from '@/helpers/getShortUrl';
import type { LinkWithClicks } from '@/types/link.types';
import cls from './Card.module.css';

interface CardProps {
    link: LinkWithClicks;
    isCopied: boolean;
    isFresh: boolean;
    onCopy: (text: string, id: string) => void;
}

export default function Card({ link, isCopied, isFresh, onCopy }: CardProps) {
    const handleCopy = () => onCopy(getShortUrl(link.shortCode), link.id);

    /* The whole card is the copy target; the button must not fire it twice. */
    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        handleCopy();
    };

    return (
        <div className={clsx(cls.card, isFresh && cls.fresh)} onClick={handleCopy} title="Click to copy">
            <div className={cls.top}>
                <span className={cls.shortWrap}>
                    <span className={clsx(cls.short, isCopied && cls.shortCopied)}>
                        {getShortLabel(link.shortCode)}
                    </span>
                    {isFresh && <span className={cls.badge}>new</span>}
                </span>

                <button type="button" className={cls.copy} title="Copy" onClick={handleButtonClick}>
                    <CopyIcon size={14} />
                </button>
            </div>

            <div className={cls.long} title={link.originalUrl}>
                {link.originalUrl}
            </div>

            <div className={cls.meta}>
                <span>{formatDate(link.createdAt)}</span>
                <span className={cls.clicks}>{formatCount(link.clicks, 'click')}</span>
            </div>
        </div>
    );
}
