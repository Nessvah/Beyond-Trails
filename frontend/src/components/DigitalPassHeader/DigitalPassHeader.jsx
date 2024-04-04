import { Link } from "react-router-dom";
import DigitalHeaderImg from "../../assets/images/digital-passport/hero-img-digitalpassport.png";

function DigitalPassHeader() {
  return (
    <section className='d-flex px-5 flex-column gap-2 mx-4 flex-md-row justify-content-md-around justify-content-lg-center gap-lg-5 pt-lg-5 hero-section'>
      <div className='col-lg-5 col-xl-4 hero-section__content'>
        <h1 className='text-secondary'>
          Parabéns Sofia! Já chegaste ao nível Gold!
        </h1>
        <h2 className='mt-5 mb-2 mb-lg-5'>Pontuação total: 2150 pontos</h2>
        <Link
          to='/passaporte-digital/historico-pontos'
          className='text-decoration-underline'>
          Vê o histórico da tua pontuação <i className='bi bi-arrow-right' />
        </Link>
      </div>

      <div className='hero-section__img'>
        <img
          src={DigitalHeaderImg}
          width='500'
          alt='ilustração de uma figura masculina sentado num pódio com uma medalha a festejar'
        />
      </div>
    </section>
  );
}

export default DigitalPassHeader;
