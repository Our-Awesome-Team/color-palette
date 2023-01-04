import React, { RefObject, useEffect, useRef } from 'react';
import AvatarImage from '../../AvatarImage';
import LogoInteractInfo from '../LogoInteractInfo';
import styles from './SavedImage.module.scss'

interface Props {
    imageFile: File | null;
    zoomLevel: number;
    inputRef: RefObject<HTMLInputElement>;
    onChangeInput: (ev: React.FormEvent<HTMLInputElement>) => void;
}

const SavedImage = ({
    imageFile,
    zoomLevel,
    inputRef,
    onChangeInput,
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
            <AvatarImage file={imageFile} imgRef={imgRef} />
            <LogoInteractInfo inputRef={inputRef} onChangeInput={onChangeInput} />
        </div>
    );
};

export default SavedImage;