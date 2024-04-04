import Header from "../components/HeaderComp/Header";
import welcomeImage from "../assets/images/home-parceiros/foto1.png";

function HomepageGestor() {
  return (
    <div>
      <Header
        heading='Bem-vindo!'
        imgUrl={welcomeImage}
        upperText={"À Plataforma de Gestores"}
      />
    </div>
  );
}

export default HomepageGestor;
