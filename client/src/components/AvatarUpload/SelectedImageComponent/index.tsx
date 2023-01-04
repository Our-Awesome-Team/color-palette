import { ChangeEvent, useEffect, useRef } from 'react';
import AvatarImage from '../../AvatarImage';
import styles from './SelectedImageComponent.module.scss'
import Slider from '../../UI/Slider/Slider';

interface Props {
    handleSliderChange: (event: ChangeEvent<HTMLInputElement>) => void
    isErrored: boolean;
    zoomLevel: number;
    imageFile: File | null;
    setIsSaved: (value: boolean) => void;
    reset: () => void;
}

const SelectedImageComponent = ({
    zoomLevel,
    isErrored,
    imageFile,
    setIsSaved,
    handleSliderChange,
    reset,
}: Props) => {
    const imgRef = useRef<HTMLDivElement>(null);

    const setZoom = (zoom: number) => {
        imgRef.current?.style.setProperty(
            'transform',
            `scale(${zoom > 1 ? 1 + zoom / 10 : 1})`
        );
    };

    useEffect(() => {
        setZoom(zoomLevel);
    }, [zoomLevel]);

    const handleSaveButtonClick = () => setIsSaved(true);

    return (
        <div className={styles['content-wrapper']}>
            <AvatarImage error={isErrored} file={imageFile} imgRef={imgRef} />
            <div className={styles['crop-area']}>
                <div className={styles['crop-title']}>Crop</div>
                <div className={styles.resize}>
                    <Slider value={zoomLevel} onChange={handleSliderChange} />
                </div>
                <div className={styles['save-button-wrapper']}>
                    <button onClick={handleSaveButtonClick}>Save</button>
                </div>
            </div>
            <div className={styles['x-icon']} aria-label='XIcon' onClick={reset}>&times;</div>
        </div>
    );
};

export default SelectedImageComponent;