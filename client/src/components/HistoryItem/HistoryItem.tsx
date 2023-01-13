import { IHistoryItem } from "../../store/history/historyTypes"
import styles from './HistoryItem.module.scss'
import { IconArrowRightShort } from "../../assets/icons/Arrows"
import useSearch from "../../hooks/useSearch"

type HistoryItemProps = {
    query: IHistoryItem
}

const HistoryItem = ({ query }: HistoryItemProps) => {
    const search = useSearch()

    return (
        <div className={styles['history-item']} onClick={() => search(query.title)}>
            <div className={styles.text}>
                <span className={styles.date}>{new Date(Number(query.date) - 1000).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
                <span className={styles.title}>{query.title}</span>
            </div>
            <IconArrowRightShort className={styles.icon} />
        </div>
    )
}

export default HistoryItem