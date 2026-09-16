import LogoMark from './LogoMark';
import cls from './Logo.module.css';

export default function Logo() {
    return (
        <div className={cls.logo}>
            <LogoMark />
            <span className={cls.wordmark}>Squisher</span>
        </div>
    );
}
