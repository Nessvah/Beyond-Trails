import FullScreenColored from "../../components/FullScreenColored";
import BigCardGeral from "../../components/CardComp/BigCardsPT/BigCardGeral";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const PontoTuristicoUnico = () => {
  const { cardId } = useParams();
  const [cardData, setCardData] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_API}/api/users/pontos_turisticos/${cardId}`
      )
      .then((response) => {
        setCardData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [cardId]);

  return (
    <div>
      <FullScreenColored bgColor={"primary"} txtColor={"white"}>
        <BigCardGeral cardData={cardData} />
      </FullScreenColored>
    </div>
  );
};

export default PontoTuristicoUnico;
