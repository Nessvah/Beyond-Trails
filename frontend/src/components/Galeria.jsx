import "../assets/css/galeria.css";
import "../scss/partials/_carousel.scss";
import imagem1 from "../assets/images/homepage/imagem1.png";
import imagem2 from "../assets/images/homepage/imagem2.png";
import imagem3 from "../assets/images/homepage/imagem3.png";
import imagem4 from "../assets/images/homepage/imagem4.png";
import imagem5 from "../assets/images/homepage/imagem5.png";
import imagem6 from "../assets/images/homepage/imagem6.png";
import imagem8 from "../assets/images/homepage/imagem8.png";
import imagem9 from "../assets/images/homepage/imagem9.png";
import imagem10 from "../assets/images/homepage/imagem10.png";
import imagem11 from "../assets/images/homepage/imagem11.png";
import imagem12 from "../assets/images/homepage/imagem12.png";
import imagem13 from "../assets/images/homepage/imagem13.png";
import imagem14 from "../assets/images/homepage/imagem14.png";
import { Link } from "react-router-dom";
function Galeria() {
  return (
    <section className=''>
      <header className='col-7 d-flex flex-column gap-5 justify-content-center align-items-center mx-auto my-5 galeria__header'>
        <h3>Galeria</h3>
        <p className='text-center'>
          Descubra a beleza de Bragança através dos olhos da nossa galeria, onde
          as imagens ganham vida e transportam-no para um mundo de encanto e
          descobertas.
        </p>
      </header>

      <div className='bg-primary gallery-container'>
        <div className='slider'>
          <div className='slide-track'>
            <div className='slide'>
              <img src={imagem1} alt='' />
            </div>
            <div className='slide'>
              <img src={imagem2} alt='' />
            </div>
            <div className='slide'>
              <img src={imagem3} alt='' />
            </div>
            <div className='slide'>
              <img src={imagem4} alt='' />
            </div>
            <div className='slide'>
              <img src={imagem5} alt='' />
            </div>
            <div className='slide'>
              <img src={imagem6} alt='' />
            </div>
            <div className='slide'>
              <img src={imagem8} alt='' />
            </div>
            <div className='slide'>
              <img src={imagem9} alt='' />
            </div>
            <div className='slide'>
              <img src={imagem10} alt='' />
            </div>
            <div className='slide'>
              <img src={imagem11} alt='' />
            </div>
            <div className='slide'>
              <img src={imagem12} alt='' />
            </div>
            <div className='slide'>
              <img src={imagem13} alt='' />
            </div>
            <div className='slide'>
              <img src={imagem14} alt='' />
            </div>
          </div>
        </div>

        <Link to='/galeria' className='ver-galeria'>
          Ver galeria completa
        </Link>
      </div>
    </section>
  );
}

export default Galeria;
