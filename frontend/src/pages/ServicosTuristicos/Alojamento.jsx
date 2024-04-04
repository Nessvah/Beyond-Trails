import Header from "../../components/HeaderComp/Header";
import headerImg from "../../assets/images/alojamento/alojamento.png";
import CardSectionAlojamento from "../../components/SectionCardComp/CardSectionAlojamento";

function Alojamento() {
  return (
    <>
      <Header imgUrl={headerImg} heading={"Onde se Alojar?"} />
      <CardSectionAlojamento />
    </>
  );
}

export default Alojamento;
