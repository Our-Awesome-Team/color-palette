import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "../store/hooks";
import useLocalStorage from "./useLocalStorage";
import { useAddHistoryItemMutation } from "../store/history/historyApi";


export const useSearch = () => {
    const navigate = useNavigate()
    const [localHistory, setLocalHistory] = useLocalStorage('history', [])
    const { user } = useAppSelector(state => state.auth)

    const [addHistoryItem] = useAddHistoryItemMutation()

    const search = (title: string | null) => {
        document.body.style.overflow = 'auto'
        navigate(`/search/?query=${title}`);
        const query = {
            id: uuid(),
            title: title ? title : '',
            date: `${Date.now()}`,
        };
        if (user) {
            addHistoryItem(query);
        } else {
            setLocalHistory([query, ...localHistory]);
        }
    }

    return search
}
