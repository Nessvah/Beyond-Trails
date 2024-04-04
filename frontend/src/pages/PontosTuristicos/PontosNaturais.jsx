import Header from "../../components/HeaderComp/Header";
import CardSectionPN from "../../components/SectionCardComp/CardSelectionPN";
import headerImg from "../../assets/images/pontos-naturais/icon-montanha.png";

function PontosNaturais() {
  return (
    <>
      <Header imgUrl={headerImg} heading={"Pontos Naturais"} />
      <CardSectionPN />
    </>
  );
}

export default PontosNaturais;
