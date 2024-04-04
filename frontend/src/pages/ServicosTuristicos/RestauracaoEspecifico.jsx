import { useParams } from "react-router-dom";
import Header from "../../components/HeaderComp/Header";
import { cardInfoRestauracao } from "../../assets/js/cardInfo";
import FullScreenColored from "../../components/FullScreenColored";
import BigCardRestauracao from "../../components/CardComp/BigCardsPT/BigCardRestauracao";

export const RestauracaoEspecifico = () => {
  const { nome } = useParams();
  const title = nome.replace(/-/g, " ");
  const matchingImg = cardInfoRestauracao.find((card) => card.local === title);

  return (
    <div>
      <Header heading={title} imgUrl={matchingImg ? matchingImg.imgUrl : ""} />
      <FullScreenColored bgColor={"primary"} txtColor={"white"}>
        <BigCardRestauracao info={matchingImg} />
      </FullScreenColored>
    </div>
  );
};
