import { useEffect, useRef, useState } from 'react';
import AuthModal from '@/components/AuthModal/AuthModal';
import Header from '@/components/Header/Header';
import LinksPanel from '@/components/LinksPanel/LinksPanel';
import MainSquisherBlock from '@/components/MainSquisherBlock/MainSquisherBlock';
import ResultCard, { RESULT_COPY_ID } from '@/components/ResultCard/ResultCard';
import Toast from '@/components/Toast/Toast';
import { useAccent } from '@/hooks/useAccent';
import { useAuth } from '@/hooks/useAuth';
import { useCopy } from '@/hooks/useCopy';
import { useLinks } from '@/hooks/useLinks';
import type { LinkWithClicks } from '@/types/link.types';
import cls from './App.module.css';

export default function App() {
    const { accent, pickAccent } = useAccent();
    const { user, isLoading: isAuthLoading } = useAuth();
    const { links, totalClicks, isLoading, isCreating, create, refetch } = useLinks();
    const { copiedId, copiedText, copy } = useCopy();

    const [result, setResult] = useState<LinkWithClicks | null>(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    /* Links are scoped to the session cookie, so signing in or out swaps the list. */
    const lastUserIdRef = useRef<string | null | undefined>(undefined);

    useEffect(() => {
        if (isAuthLoading) return;

        const userId = user?.id ?? null;

        if (lastUserIdRef.current === undefined) {
            lastUserIdRef.current = userId;
            return;
        }

        if (lastUserIdRef.current !== userId) {
            lastUserIdRef.current = userId;
            setResult(null);
            void refetch();
        }
    }, [user, isAuthLoading, refetch]);

    const handleShorten = async (url: string) => {
        setResult(await create(url));
    };

    return (
        <div className={cls.page}>
            <div className={cls.container}>
                <Header accent={accent} onPickAccent={pickAccent} onOpenAuth={() => setIsAuthOpen(true)} />

                <div className={cls.columns}>
                    <main className={cls.main}>
                        {result && (
                            <ResultCard
                                link={result}
                                isCopied={copiedId === RESULT_COPY_ID}
                                onCopy={copy}
                                onDismiss={() => setResult(null)}
                            />
                        )}

                        <MainSquisherBlock
                            totalClicks={totalClicks}
                            isCreating={isCreating}
                            onShorten={handleShorten}
                        />
                    </main>

                    <LinksPanel
                        links={links}
                        isLoading={isLoading}
                        freshLinkId={result?.id ?? null}
                        copiedId={copiedId}
                        onCopy={copy}
                    />
                </div>
            </div>

            {copiedId && <Toast text={copiedText} />}

            {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
        </div>
    );
}
