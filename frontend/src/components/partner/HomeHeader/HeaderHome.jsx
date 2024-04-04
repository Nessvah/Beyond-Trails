import Header from "../../HeaderComp/Header";

import welcomeImage from "../../../assets/images/home-parceiros/foto1.png";
function HeaderWelcome() {
  return (
    <div className='container'>
      <Header heading='Bem-vindo!' imgUrl={welcomeImage} />
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <p className='p-bem-vindo text-center pb-5'>
              À Plataforma de Parceiros. <br />
              Aqui irá poder gerenciar as suas informações e interagir conosco
              de maneira eficaz.
            </p>
          </div>
        </div>
      </div>
      <div className='col-md-6'></div>
    </div>
  );
}

export default HeaderWelcome;
