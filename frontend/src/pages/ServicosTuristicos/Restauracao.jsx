import Header from "../../components/HeaderComp/Header";
import CardSectionRestauracao from "../../components/SectionCardComp/CardSectionRestauracao";
import headerImg from "../../assets/images/restauracao/icon-restauracao.png";

function Restauracao() {
  return (
    <>
      <Header imgUrl={headerImg} heading={"Onde comer?"} />
      <CardSectionRestauracao />
    </>
  );
}

export default Restauracao;
