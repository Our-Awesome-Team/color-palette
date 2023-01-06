import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner/Spinner";
import styles from "./Generated.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Color, Scheme } from "../../store/favorites/favoritesTypes";
import {
  addFavoriteColor,
  addFavoriteScheme,
} from "../../store/favorites/favoritesSlice";
import { IconSparkles } from "../../assets/icons/Sparks";
import axios from "axios";
import { IconHeart } from "../../assets/icons/Heart";
import { colourIsLight, hexToRgb } from "../../utils/colorUtils";
import Locked from "../../assets/icons/Locked";

const Generated = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [generatedScheme, setGeneratedScheme] = useState<Scheme>();
  const [lockedColors, setLockedColors] = useState<any>([]);

  const lockColor = (color: any) => {
    if (lockedColors.includes(color)) {
      setLockedColors([...lockedColors].filter((c) => c != color));
      return;
    }
    setLockedColors([...lockedColors, color]);
  };
  async function generate(colors?: any) {

    const url =lockedColors.length?`https://www.colr.org/json/search_by_colors?colors=${lockedColors.join(',')} 
`:
      "https://www.colr.org/json/schemes/random/7?scheme_size_limit=>5"
    try {
		setLoading(true)
      const response = await axios.get(url, {
        params: {
          t: new Date().getTime(),
        },
      });

      const schemes = response.data.schemes as Scheme[];
	  if (lockedColors.length) {
		setGeneratedScheme(schemes.find((scheme) => scheme.colors.some((el,idx)=>el==lockedColors[idx]))); return
	  }
      setGeneratedScheme(schemes.find((scheme) => scheme.colors.length >= 5));
      console.log(generatedScheme);
	  setLoading(false)
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
    generate(lockedColors);
  }, []);

  const addScheme = (scheme?: Scheme) => {
    if (scheme) {
      dispatch(addFavoriteScheme(scheme));
    }
  };

  return (
    <div className={styles.generated}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.colors}>
            {generatedScheme?.colors.slice(0, 5).map((color) => (
              <div
                key={color}
                className={styles.color}
                style={{ backgroundColor: `#${color}` }}
              >
                <h2
                  style={{
                    color: `${
                      colourIsLight(hexToRgb(color)) ? "#000" : "#fff"
                    }`,
                  }}
                >
                  #{color}
                </h2>
                <button
                  className={`${styles.lock} ${
                    lockedColors.includes(color) ? styles.locked : ""
                  } `}
                  onClick={() => lockColor(color)}
                >
                  {" "}
                  <Locked />{" "}
                </button>
              </div>
            ))}
          </div>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={generate}>
              <span>Generate</span>
              <span>
                <IconSparkles className={styles.sparkles} />
              </span>
            </button>
            {user && (
              <button className={styles.button}>
                <span>
                  <IconHeart
                    className={styles.heart}
                    onClick={() => addScheme(generatedScheme)}
                  />
                </span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Generated;
