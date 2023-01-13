import { useEffect } from "react";

const useScroll = (cb: () => void) => {
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const scrollHandler = (): void => {
        if (
            document.documentElement.scrollHeight -
            (document.documentElement.scrollTop + window.innerHeight) <
            100
        ) {
            cb()
        }
    };
}
export default useScroll;