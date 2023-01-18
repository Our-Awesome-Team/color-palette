import { HTMLAttributes, RefObject, useEffect, useState } from 'react';
import styles from './AvatarImage.module.scss'
import { useAppSelector } from '../../store/hooks';

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
    error?: boolean;
    file?: File | null;
    imgRef?: RefObject<HTMLDivElement>;
    avatarFromServer?: boolean
}

const AvatarImage = ({ error, file, imgRef, avatarFromServer, ...props }: ImageProps) => {
    const [memoizedUrl, setmemoizedUrl] = useState<string>('');

    const { user } = useAppSelector(state => state.auth)
    useEffect(() => {
        if (avatarFromServer && !file) setmemoizedUrl(`https://color-palette-b4uwktlqb-our-awesome-team.vercel.app/api/upload/files/${user?.email}.jpg`);
        if (file) {
            setmemoizedUrl(URL.createObjectURL(file));
        }
    }, [file, imgRef]);

    return (
        <div className={styles.wrapper} {...props}>
            <div
                className={styles.image}
                style={{ backgroundImage: `${memoizedUrl ? `url(${memoizedUrl})` : ''}` }}
                ref={imgRef}
                aria-label='Image'>
            </div>
        </div>
    );
};

export default AvatarImage;