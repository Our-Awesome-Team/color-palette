import React, { useRef, useState, DragEvent, ChangeEvent } from 'react';
import LogoInteractInfo from './LogoInteractInfo';
import SelectedImageComponent from './SelectedImageComponent';
import SavedImage from './SavedImage';
import styles from './AvatarUpload.module.scss'


const AvatarUpload = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isErrored, setError] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [zoomLevel, setZoomlevel] = useState(1);

    const inputRef = useRef<HTMLInputElement>(null);

    const onClickContainer = () => {
        inputRef.current?.click();
    };

    const isFileValid = (file?: File) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        if (!file) return false;

        return validTypes.includes(file.type);
    };

    const updateStatesOnChange = (file?: File) => {
        if (file && isFileValid(file)) {
            setImageFile(file);
            setIsSaved(false);
            setZoomlevel(1);
        }

        setError(!isFileValid(file));
    };

    const fileDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer?.files[0];
        updateStatesOnChange(file);
    };

    const onChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
        const selectedFile = (event.target as HTMLInputElement).files![0];

        updateStatesOnChange(selectedFile);
    };

    const handleSliderChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        setZoomlevel(Number(event.target.value));
    };

    const reset = () => {
        setImageFile(null);
        setZoomlevel(1);
        setError(false);
        setIsSaved(false);
    };

    const dragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const dragEnter = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const dragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const renderChild = () => {
        if (!isErrored && !imageFile)
            return (
                <LogoInteractInfo inputRef={inputRef} onChangeInput={onChangeInput} />
            );
        if (!isErrored && imageFile && !isSaved)
            return (
                <SelectedImageComponent
                    handleSliderChange={handleSliderChange}
                    imageFile={imageFile}
                    isErrored={isErrored}
                    reset={reset}
                    zoomLevel={zoomLevel}
                    setIsSaved={setIsSaved}
                />
            );

        return (
            <SavedImage
                imageFile={imageFile}
                zoomLevel={zoomLevel}
                inputRef={inputRef}
                onChangeInput={onChangeInput}
            />
        );
    };

    return (
        <>
            <div className={styles.wrapper}
                // image={imageFile}
                // isErrored={isErrored}
                // isSaved={isSaved}
                onClick={onClickContainer}
                onDrop={fileDrop}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
            >
                {!imageFile && <div className={styles.nullAvatar}></div>}
                {renderChild()}
            </div>
        </>
    );
};

export default AvatarUpload;