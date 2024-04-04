import Header from "../../components/HeaderComp/Header";
import CardSectionCM from "../../components/SectionCardComp/CardSectionCM";
import headerImg from "../../assets/images/castelos-museus/logo-castelo.png";

function CastelosMuseus() {
  return (
    <>
      <Header imgUrl={headerImg} heading={"Castelos e Museus"} />
      <CardSectionCM />
    </>
  );
}

export default CastelosMuseus;
