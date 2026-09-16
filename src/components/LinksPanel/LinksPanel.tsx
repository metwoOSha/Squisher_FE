import { useEffect } from 'react';
import Card from '@/components/Card/Card';
import CardSkeleton from '@/components/CardSkeleton/CardSkeleton';
import EmptyState from '@/components/EmptyState/EmptyState';
import { formatCount } from '@/helpers/pluralize';
import { useScrollMask } from '@/hooks/useScrollMask';
import type { LinkWithClicks } from '@/types/link.types';
import cls from './LinksPanel.module.css';

/** Enough placeholders to fill the panel without implying a real count. */
const SKELETON_ROWS = [0, 1, 2];

interface LinksPanelProps {
    links: LinkWithClicks[];
    isLoading: boolean;
    freshLinkId: string | null;
    copiedId: string | null;
    onCopy: (text: string, id: string) => void;
}

export default function LinksPanel({ links, isLoading, freshLinkId, copiedId, onCopy }: LinksPanelProps) {
    const { setRef, mask, onScroll, remeasure } = useScrollMask<HTMLDivElement>();

    /* A new card changes the scroll height, so the edge fades need re-measuring. */
    useEffect(remeasure, [links.length, isLoading, remeasure]);

    return (
        <aside className={cls.panel}>
            <div className={cls.inner}>
                <div className={cls.header}>
                    <div>
                        <h2 className={cls.title}>My links</h2>
                        <div className={cls.subtitle}>click a card to copy</div>
                    </div>
                    {isLoading ? (
                        <span className={cls.count}>loading…</span>
                    ) : (
                        links.length > 0 && <span className={cls.count}>{formatCount(links.length, 'link')}</span>
                    )}
                </div>

                {isLoading && (
                    <div className={cls.list} aria-busy="true" aria-label="Loading your links">
                        {SKELETON_ROWS.map((row) => (
                            <CardSkeleton key={row} />
                        ))}
                    </div>
                )}

                {!isLoading && links.length === 0 && (
                    <EmptyState title="No links yet" hint="squish one to see it here" />
                )}

                {!isLoading && links.length > 0 && (
                    <div
                        className={cls.list}
                        ref={setRef}
                        onScroll={onScroll}
                        style={{ WebkitMaskImage: mask, maskImage: mask }}
                    >
                        {links.map((link) => (
                            <Card
                                key={link.id}
                                link={link}
                                isCopied={copiedId === link.id}
                                isFresh={freshLinkId === link.id}
                                onCopy={onCopy}
                            />
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
}
