import Header from "../../HeaderComp/Header";
import imagemDesempenho from "../../../assets/images/beneficioPartner/desempenho.png";

function HeaderDesempenho() {
  return (
    <div className='container col-8 mx-auto mt-5'>
      <Header heading='Consultar Desempenho' imgUrl={imagemDesempenho} />
    </div>
  );
}

export default HeaderDesempenho;
