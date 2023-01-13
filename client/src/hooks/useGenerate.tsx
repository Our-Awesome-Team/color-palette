import { useEffect, useState } from "react";
import { Color, Scheme } from "../store/favorites/favoritesTypes";
import axios from "axios";
import { v4 as uuid } from 'uuid'

export type LockedColor = {
    index: number
    color: string
}

const useGenerate = (lockedColors: LockedColor[]) => {
    const [generatedScheme, setGeneratedScheme] = useState<Scheme | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('');

    const generate = async (colors: string[]) => {
        const url = colors.length
            ? `https://www.colr.org/json/search_by_colors?colors=${colors.join(',')}`
            : "https://www.colr.org/json/schemes/random/21?scheme_size_limit=>5"
        try {
            const response = await axios.get(url,
                {
                    params: {
                        t: new Date().getTime(),
                    },
                }
            );
            const schemes = response.data.schemes as Scheme[];
            const colors = response.data.colors as Color[]
            if (colors.length) {
                let draftColors = ["", "", "", "", ""]
                for (let el of lockedColors) {
                    draftColors[el.index] = el.color
                }
                for (let i in draftColors) {
                    if (draftColors[i] === '') {
                        draftColors[i] = colors[Math.floor(Math.random() * colors.length)].hex
                    }
                }
                setGeneratedScheme({ colors: draftColors, id: uuid(), tags: [] });
                return
            }
            setGeneratedScheme(schemes.find(scheme => scheme.colors.length >= 5));
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        generate(lockedColors.map(el => el.color));
    }, []);

    return { generatedScheme, loading, error, generate }
}

export default useGenerate