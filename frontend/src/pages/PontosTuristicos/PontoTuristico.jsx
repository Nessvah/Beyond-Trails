import { useParams } from "react-router-dom";
import Header from "../../components/HeaderComp/Header";
import { cardInfoCM } from "../../assets/js/cardInfo";
import FullScreenColored from "../../components/FullScreenColored";
import BigCardCM from "../../components/CardComp/BigCardsPT/BigCardCM";

export const PontoTuristico = () => {
  const { nome } = useParams();
  const title = nome.replace(/-/g, " ");
  const matchingImg = cardInfoCM.find((card) => card.local === title);

  return (
    <div>
      <Header heading={title} imgUrl={matchingImg ? matchingImg.imgUrl : ""} />
      <FullScreenColored bgColor={"primary"} txtColor={"white"}>
        <BigCardCM info={matchingImg} />
      </FullScreenColored>
    </div>
  );
};
