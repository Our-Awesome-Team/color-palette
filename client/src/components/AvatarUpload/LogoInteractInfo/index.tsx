import React, { RefObject } from 'react';
import styles from './LogoInteractInfo.module.scss'

interface Props {
    inputRef?: RefObject<HTMLInputElement>;
    onChangeInput: (ev: React.FormEvent<HTMLInputElement>) => void;
}

const LogoInteractInfo = ({ inputRef, onChangeInput }: Props) => (
    <div className={styles.wrapper}>
        <span aria-label='Insert Image'>
            Drop the image here or click to browse.
        </span>
        <input
            className={styles['file-input']}
            ref={inputRef}
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            onChange={onChangeInput}
            data-testid='input-file'
        />
    </div>
);

export default LogoInteractInfo;