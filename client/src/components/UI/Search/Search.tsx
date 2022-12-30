import axios from "axios";
import { FC, useState } from "react";
import styles from "./Search.module.scss";

const Search: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [colorsData, setColorsData] = useState<any>([]);

  const fetchColor = async (query: string) => {
    const response = await axios.get(`https://www.colr.org/json/tag/${query}`);
    setColorsData(response.data.colors);
  };

  const changeInput = (e: any) => {
    setInputValue(e.target.value);
    fetchColor(e.target.value);
  };

  return (
    <div className={styles.finder}>
      <input
        type="text"
        className={styles["find-input"]}
        placeholder="Search..."
        onChange={changeInput}
      />
      <div className={styles.results}>
        {colorsData &&
          colorsData.map((color: any, idx: any) => {
            if (idx >= 6) return;
            return (
              <div
                style={{ borderBottom: `1px solid #${color.hex}` }}
                className={styles["result-item"]}
                key={color.id}
              >
                <h3>{color.hex}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
