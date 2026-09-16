import clsx from 'clsx';
import { CloseIcon, CopyIcon } from '@/components/Icons';
import { formatCount } from '@/helpers/pluralize';
import { getShortLabel, getShortUrl } from '@/helpers/getShortUrl';
import type { LinkWithClicks } from '@/types/link.types';
import cls from './ResultCard.module.css';

export const RESULT_COPY_ID = 'result';

interface ResultCardProps {
    link: LinkWithClicks;
    isCopied: boolean;
    onCopy: (text: string, id: string) => void;
    onDismiss: () => void;
}

export default function ResultCard({ link, isCopied, onCopy, onDismiss }: ResultCardProps) {
    return (
        <div className={cls.card}>
            <div className={cls.bar}>
                <span className={cls.barTitle}>Your new link</span>
                <span className={cls.barClicks}>{formatCount(link.clicks, 'click')}</span>
            </div>

            <div className={cls.body}>
                <div className={cls.text}>
                    <div className={cls.shortRow}>
                        <span className={clsx(cls.short, isCopied && cls.shortCopied)}>
                            {getShortLabel(link.shortCode)}
                        </span>
                    </div>
                    <div className={cls.long} title={link.originalUrl}>
                        {link.originalUrl}
                    </div>
                </div>

                <div className={cls.actions}>
                    <button
                        type="button"
                        className={cls.copy}
                        onClick={() => onCopy(getShortUrl(link.shortCode), RESULT_COPY_ID)}
                    >
                        <CopyIcon />
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button type="button" className={cls.dismiss} title="Dismiss" onClick={onDismiss}>
                        <CloseIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
