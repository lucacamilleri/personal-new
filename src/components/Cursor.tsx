import { useEffect } from 'react';

const Cursor = () => {
    useEffect(() => {
        const cursor = document.createElement('div');
        cursor.className = 'cursor cursor-dot';
        cursor.style.left = '0px';
        cursor.style.top = '0px';
        document.body.prepend(cursor);

        const moveCursor = (e: MouseEvent) => {
            cursor.style.left = `${e.pageX}px`;
            cursor.style.top = `${e.pageY}px`;
        };

        const addActiveClass = () => cursor.classList.add('active');
        const removeActiveClass = () => cursor.classList.remove('active');

        window.addEventListener('mousemove', moveCursor);

        const attachListeners = () => {
            document.querySelectorAll('a, button').forEach((el) => {
                el.addEventListener('mouseenter', addActiveClass);
                el.addEventListener('mouseleave', removeActiveClass);
            });
            document.querySelectorAll('input, textarea').forEach((el) => {
                (el as HTMLElement).style.cursor = 'none';
                el.addEventListener('mouseenter', addActiveClass);
                el.addEventListener('mouseleave', removeActiveClass);
            });
        };

        attachListeners();

        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.querySelectorAll('a, button').forEach((el) => {
                el.removeEventListener('mouseenter', addActiveClass);
                el.removeEventListener('mouseleave', removeActiveClass);
            });
            observer.disconnect();
            cursor.remove();
        };
    }, []);

    return null;
};

export default Cursor;
