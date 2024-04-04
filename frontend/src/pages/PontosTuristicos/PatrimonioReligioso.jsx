import Header from "../../components/HeaderComp/Header";
import CardSectionPR from "../../components/SectionCardComp/CardSectionPR";
import headerImg from "../../assets/images/patrimonio-religioso/icon-igreja.png";

function PatrimonioReligioso() {
  return (
    <>
      <Header imgUrl={headerImg} heading={"Património religioso"} />
      <CardSectionPR />
    </>
  );
}

export default PatrimonioReligioso;
