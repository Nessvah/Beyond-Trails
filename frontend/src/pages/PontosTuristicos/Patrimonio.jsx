import { useParams } from "react-router-dom";
import Header from "../../components/HeaderComp/Header";
import { cardInfoPR } from "../../assets/js/cardInfo";
import FullScreenColored from "../../components/FullScreenColored";
import BigCardPR from "../../components/CardComp/BigCardsPT/BigCardPR";

export const Patrimonio = () => {
  const { nome } = useParams();
  const title = nome.replace(/-/g, " ");
  const matchingImg = cardInfoPR.find((card) => card.local === title);

  return (
    <div>
      <Header heading={title} imgUrl={matchingImg ? matchingImg.imgUrl : ""} />
      <FullScreenColored bgColor={"primary"} txtColor={"white"}>
        <BigCardPR info={matchingImg} />
      </FullScreenColored>
    </div>
  );
};
