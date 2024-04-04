import { useParams } from "react-router-dom";
import Header from "../../components/HeaderComp/Header";
import { cardInfoArtesanato } from "../../assets/js/cardInfo";
import FullScreenColored from "../../components/FullScreenColored";
import BigCardArtesanato from "../../components/CardComp/BigCardsPT/BigCardArtesanato";

export const ArtesanatoEspecifico = () => {
  const { nome } = useParams();
  const title = nome.replace(/-/g, " ");
  const matchingImg = cardInfoArtesanato.find((card) => card.local === title);

  return (
    <div>
      <Header heading={title} imgUrl={matchingImg ? matchingImg.imgUrl : ""} />
      <FullScreenColored bgColor={"primary"} txtColor={"white"}>
        <BigCardArtesanato info={matchingImg} />
      </FullScreenColored>
    </div>
  );
};
