import CardsPartner from "../../../components/partner/CardPartner/CardsPartner.jsx";
import SeccaoAjuda from "../../../components/partner/SeccaoAjuda/SeccaoAjuda";
import Header from "../../../components/HeaderComp/Header";
import welcomeImage from "../../../assets/images/home-parceiros/foto1.png";

function HomePageParceiro() {
  return (
    <div className='HomePage'>
      <Header
        heading='Bem-vindo!'
        imgUrl={welcomeImage}
        upperText={"À Plataforma de Parceiros."}
        bottomText={
          "Aqui irá poder gerenciar as suas informações e interagir conosco de maneira eficaz."
        }
      />
      <CardsPartner />
      <SeccaoAjuda />
    </div>
  );
}

export default HomePageParceiro;
