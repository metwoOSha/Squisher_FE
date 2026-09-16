import Portal from '@/utils/Portal';
import cls from './Toast.module.css';

interface ToastProps {
    text: string;
}

export default function Toast({ text }: ToastProps) {
    return (
        <Portal>
            <div className={cls.toast} role="status">
                <span className={cls.dot} />
                <span className={cls.text}>Copied {text}</span>
            </div>
        </Portal>
    );
}
