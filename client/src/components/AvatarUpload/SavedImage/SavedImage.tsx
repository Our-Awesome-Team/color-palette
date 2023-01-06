import React, { RefObject, useEffect, useRef } from 'react';
import AvatarImage from '../../AvatarImage/AvatarImage';
import LogoInteractInfo from '../LogoInteractInfo/LogoInteractInfo';
import styles from './SavedImage.module.scss'

interface Props {
    imageFile: File | null;
    zoomLevel: number;
    inputRef: RefObject<HTMLInputElement>;
    onChangeInput: (ev: React.FormEvent<HTMLInputElement>) => void;
    avatarFromServer?: boolean
}

const SavedImage = ({
    imageFile,
    zoomLevel,
    inputRef,
    onChangeInput,
    avatarFromServer
}: Props) => {
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        imgRef.current?.style.setProperty(
            'transform',
            `scale(${1 + zoomLevel / 10})`
        );
    }, []);

    return (
        <div className={styles['content-wrapper']}>
            <AvatarImage avatarFromServer={avatarFromServer} file={imageFile} imgRef={imgRef} />
            <LogoInteractInfo inputRef={inputRef} onChangeInput={onChangeInput} />
        </div>
    );
};

export default SavedImage;