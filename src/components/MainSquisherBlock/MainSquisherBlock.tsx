import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import SquishButton from '@/components/SquishButton/SquishButton';
import { SHORT_DOMAIN_LABEL } from '@/config';
import { isValidUrl } from '@/helpers/normalizeUrl';
import cls from './MainSquisherBlock.module.css';

const INVALID_URL_MESSAGE = 'That doesn’t look like a URL.';

interface MainSquisherBlockProps {
    totalClicks: number;
    isCreating: boolean;
    onShorten: (url: string) => Promise<void>;
}

export default function MainSquisherBlock({ totalClicks, isCreating, onShorten }: MainSquisherBlockProps) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
        setError(null);
    };

    const handleShorten = async () => {
        if (isCreating) return;

        if (!isValidUrl(url)) {
            setError(INVALID_URL_MESSAGE);
            return;
        }

        try {
            await onShorten(url);
            setUrl('');
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not shorten that link');
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') void handleShorten();
    };

    return (
        <section className={cls.section}>
            <div className={cls.blob} />

            <div className={cls.inner}>
                <div className={cls.eyebrow}>
                    <span className={cls.dot} />
                    <span className={cls.eyebrowText}>Link shortener</span>
                </div>

                <h1 className={cls.title}>Shorten a link</h1>
                <p className={cls.subtitle}>Paste any URL and get a six-character link you can track.</p>

                <div className={cls.form}>
                    <input
                        className={cls.input}
                        value={url}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Paste a long URL"
                        aria-label="Long URL"
                        spellCheck={false}
                    />
                    <SquishButton onClick={() => void handleShorten()} disabled={isCreating}>
                        {isCreating ? 'Squishing' : 'Squish'}
                    </SquishButton>
                </div>

                {error && <p className={cls.error}>{error}</p>}

                <div className={cls.stats}>
                    <div>
                        <div className={cls.statValue}>{SHORT_DOMAIN_LABEL}</div>
                        <div className={cls.statLabel}>short domain</div>
                    </div>
                    <div>
                        <div className={cls.statValue}>{totalClicks.toLocaleString('en-US')}</div>
                        <div className={cls.statLabel}>clicks tracked</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
