import Header from "../../HeaderComp/Header";
import infoImage from "../../../assets/images/home-parceiros/update.png";

function HeaderInfo() {
  return (
    <div className='container bg-white'>
      <Header heading='Atualizar Informações' imgUrl={infoImage} />
    </div>
  );
}

export default HeaderInfo;
