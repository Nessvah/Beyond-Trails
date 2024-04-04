import Header from "../../../HeaderComp/Header";
import criarPromo from "../../../../assets/images/promocoes/updateProm.png";

function CreatePromotionSection() {
  return (
    <div className='container col-8 mx-auto mt-5'>
      <Header heading='Crie a sua Promoção' imgUrl={criarPromo} />

      <p className='d-flex justify-content-center texto-center ps-5'>
        Aqui poderá criar a sua promoção com facilidade e rapidez. <br /> Comece
        preenchendo os campos abaixo com as informações da sua promoção.
      </p>
    </div>
  );
}

export default CreatePromotionSection;
