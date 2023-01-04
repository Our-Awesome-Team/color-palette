import React, { ChangeEvent, SetStateAction, useState } from 'react'
import styles from './Slider.module.scss'

type Props = {
    value: number
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const MAX = 10;
const Slider = ({ value, onChange }: Props) => {
    // const [value, setValue] = useState(0);

    function getBackgroundSize() {
        return {
            backgroundSize: `${(value * 100) / MAX}% 100%`,
        };
    };
    return (
        <input
            className={styles.slider}
            type="range"
            min="1"
            max={MAX}
            onChange={onChange}
            style={getBackgroundSize()}
            value={value}
        />
    )
}

export default Slider