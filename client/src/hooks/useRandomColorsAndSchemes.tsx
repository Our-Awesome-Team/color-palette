import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { Color, Scheme } from "../store/favorites/favoritesTypes";
import axios from "axios";

export const useRandomColorsAndSchemes = (input: string) => {
    const debouncedInput = useDebounce(input, 400);
    const [colorsData, setColorsData] = useState<Color[]>([]);
    const [schemesData, setSchemesData] = useState<Scheme[]>([])

    useEffect(() => {
        const fetch = async (query: string) => {
            if (query.trim().split(' ').length === 1) {
                const response = await axios.get(`https://www.colr.org/json/tag/${query.trim().toLowerCase()}`);
                setColorsData(response.data.colors);
                setSchemesData(response.data.schemes);
            } else {
                const response = await axios.get(`https://www.colr.org/json/tags/${query.trim().toLowerCase().split(' ').join(',')}`);
                setColorsData(response.data.colors);
                setSchemesData(response.data.schemes);
            }
        }
        if (input.length !== 0) fetch(input)
    }, [debouncedInput])

    return { colorsData, schemesData }
}