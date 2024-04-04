import imageInfoUtil from "../../assets/images/informacaoUtil/info.png";
import Header from "../HeaderComp/Header";

function HeaderInfoUtil() {
  return (
    <div className='container col-8 mx-auto mt-5'>
      <Header heading='Informação Útil' imgUrl={imageInfoUtil} />
    </div>
  );
}

export default HeaderInfoUtil;
