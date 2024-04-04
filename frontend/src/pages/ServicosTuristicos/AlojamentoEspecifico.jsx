import { useParams } from "react-router-dom";
import Header from "../../components/HeaderComp/Header";
import { cardInfoAlojamento } from "../../assets/js/cardInfo";
import FullScreenColored from "../../components/FullScreenColored";
import BigCardAlojamento from "../../components/CardComp/BigCardsPT/BigCardAlojamento";

export const AlojamentoEspecifico = () => {
  const { nome } = useParams();
  const title = nome.replace(/-/g, " ");
  const matchingImg = cardInfoAlojamento.find((card) => card.local === title);

  return (
    <div>
      <Header heading={title} imgUrl={matchingImg ? matchingImg.imgUrl : ""} />
      <FullScreenColored bgColor={"primary"} txtColor={"white"}>
        <BigCardAlojamento info={matchingImg} />
      </FullScreenColored>
    </div>
  );
};
