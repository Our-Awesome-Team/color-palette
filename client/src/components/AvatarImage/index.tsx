import { HTMLAttributes, RefObject, useEffect, useState } from 'react';
import styles from './AvatarImage.module.scss'

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
    error?: boolean;
    file?: File | null;
    imgRef?: RefObject<HTMLDivElement>;
}

const AvatarImage = ({ error, file, imgRef, ...props }: ImageProps) => {
    const [memoizedUrl, setmemoizedUrl] = useState<string>('');

    useEffect(() => {
        if (file) {
            setmemoizedUrl(URL.createObjectURL(file));
        }
    }, []);

    return (
        <div className={styles.wrapper} {...props}>
            <div
                className={styles.image}
                // error={error} 
                // url={memoizedUrl} 
                style={{ backgroundImage: `${memoizedUrl ? `url(${memoizedUrl})` : ''}` }}
                ref={imgRef} aria-label='Image'>
                {/* {error && <WarningIcon src='/warn.svg' />} */}
            </div>
        </div>
    );
};

export default AvatarImage;