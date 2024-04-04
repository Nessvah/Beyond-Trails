import Header from "../../HeaderComp/Header";

import qrImage from "../../../assets/images/home-parceiros/imagem8.png";

function HeaderQR() {
  return (
    <div className='container'>
      <Header heading='Registo Código QR' imgUrl={qrImage} />
    </div>
  );
}

export default HeaderQR;
