import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { addHistoryItem } from "../store/history/historySlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import useLocalStorage from "./useLocalStorage";


export function useSearch() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [localHistory, setLocalHistory] = useLocalStorage('history', [])
    const { user } = useAppSelector(state => state.auth)

    function search(title: string | null) {
        navigate(`/search/?query=${title}`);
        const query = {
            id: uuid(),
            title: title ? title : '',
            date: `${Date.now()}`,
        };
        if (user) {
            dispatch(addHistoryItem(query));
        } else {
            setLocalHistory([query, ...localHistory]);
        }
    }

    return search
}
