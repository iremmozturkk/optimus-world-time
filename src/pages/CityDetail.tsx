/** @jsxImportSource @emotion/react */
import { useParams, useNavigate } from "react-router-dom";
import { useConfig } from "../contexts/configProvider";
import * as styles from "../styles/CityDetail.styles";   
import { searchStyle } from "../styles/Home.styles";     

const CityDetail = () => {
  const { theme } = useConfig();
  const navigate = useNavigate();
  const { zone } = useParams<{ zone: string }>();

  return (
    <div css={styles.container(theme)}>
      <div css={styles.header(theme)}>
        {/* Geri butonu stilli */}
        <button onClick={() => navigate(-1)} css={styles.backBtn}>
          ←
        </button>
        <h2>City Detail: {zone}</h2>
      </div>

      {/* Arama kutusu Home.styles'teki searchStyle ile */}
      <input type="text" placeholder="Ara..." css={searchStyle} />

      {/* Şehir ile ilgili bilgiler buraya eklenebilir */}
      <div css={styles.infoWrapper}>
        <h3>{zone?.split("/")[1]}</h3>
        <p>{zone?.split("/")[0]}</p>
      </div>
    </div>
  );
};

export default CityDetail;
