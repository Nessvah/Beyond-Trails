import { useParams } from "react-router-dom";
import Header from "../../components/HeaderComp/Header";
import { cardInfoPN } from "../../assets/js/cardInfo";
import FullScreenColored from "../../components/FullScreenColored";
import BigCardPN from "../../components/CardComp/BigCardsPT/BigCardPN";

export const PontoNatural = () => {
  const { nome } = useParams();
  const title = nome.replace(/-/g, " ");
  const matchingImg = cardInfoPN.find((card) => card.local === title);

  return (
    <div>
      <Header heading={title} imgUrl={matchingImg ? matchingImg.imgUrl : ""} />
      <FullScreenColored bgColor={"primary"} txtColor={"white"}>
        <BigCardPN info={matchingImg} />
      </FullScreenColored>
    </div>
  );
};
