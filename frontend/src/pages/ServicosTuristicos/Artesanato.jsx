import Header from "../../components/HeaderComp/Header";
import CardSectionArtesanato from "../../components/SectionCardComp/CardSectionArtesanato";
import headerImg from "../../assets/images/artesanato/icon-artesanato.png";

function Artesanato() {
  return (
    <>
      <Header imgUrl={headerImg} heading={"Onde comprar?"} />
      <CardSectionArtesanato />
    </>
  );
}

export default Artesanato;
