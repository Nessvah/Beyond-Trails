import coupon from "../assets/images/rewards/coupon.png";
import guyWithMap from "../assets/images/rewards/guy-with-map.png";
import compass from "../assets/images/rewards/compass.png";
import qr from "../assets/images/rewards/qr-code.png";
import marker from "../assets/images/rewards/marker.png";
import box from "../assets/images/rewards/box.png";
import friends from "../assets/images/rewards/group-friends.png";
import dots from "../assets/images/rewards/big-rectangle-dots.png";
import "../scss/partials/_rewards.scss";
import { Link } from "react-router-dom";

export function Rewards() {
  return (
    <main className='container-fluid p-0 text-primary position-relative'>
      {/* <!-- <img
        src="../assets/images/rewards/blob.png"
        alt=""
        className="position-absolute blob"
      /> --> */}

      <section className='row px-3 col-md-9 mx-auto py-md-5 px-lg-0 m-lg-0 align-items-xl-baseline gap-xl-5 col-lg-10 col-xl-9 justify-content-xl-start mx-lg-auto hero-section'>
        <div className='w-50 pb-5 mx-auto w-auto mx-xl-0 hero-section__img'>
          <img src={coupon} width='200' alt='' />
        </div>
        <div className='col-11 mx-auto ps-md-5 col-md-6 col-xl-8 mx-xl-0 hero-section__content'>
          <h1>Programa de recompensas</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Nunc tortor odio ipsum vitae
            pharetra eget pulvinar lacinia. Tellus feugiat massa id turpis
            rhoncus sodales. Morbi cras scelerisque urna enim gravida purus
            sodales diam. Phasellus arcu nulla adipiscing varius risus volutpat
            condimentum at cursus.
          </p>
        </div>
      </section>

      <section className='px-3 mt-5 mx-auto gap-lg-5 instructions-sec'>
        <div className='col-11 mx-auto col-md-9 col-xl-5 pb-xl-5 instructions-sec__top'>
          <h2 className='mb-xl-5'>Como funciona? É simples!</h2>
          <p className='pt-5'>
            <i className='bi bi-1-circle-fill pe-2' /> Cria uma conta
            gratuitamente e em menos de 5 min!
          </p>
        </div>

        <div className='row col-11 mx-auto flex-sm-row position-relative col-md-9 ps-md-5 justify-content-lg-center col-xl-6 pt-xl-5 gap-xl-3 instructions-sec__middle'>
          <div className='col-xl-3 d-flex justify-content-xl-center align-items-xl-end col-lg-5 instructions-sec__img'>
            <img
              className='ps-md-5 guy__map'
              src={guyWithMap}
              alt='illustration of a man with a map'
            />
          </div>
          <div className='d-flex flex-column col-xl-6 gap-xl-4 instructions-sec__content'>
            <img
              src={compass}
              className='align-self-end col-3 pe-5 col-md-2 img__compass'
              alt=''
            />
            <p>
              <i className='bi bi-2-circle-fill pe-2' /> Visita os nossos pontos
              turísticos.
            </p>
            <p>
              <i className='bi bi-3-circle-fill pe-2' />
              Encontra cada QR Code do sítio, lê-o com o teu telemóvel para
              ganhares pontos!
            </p>
            <div className='mx-auto me-xl-0'>
              <img src={qr} alt='' />
            </div>
          </div>
          <span className='orange-platform' />
        </div>

        <div className='mt-5 row ps-5 mx-auto justify-content-md-center container-md pt-lg-5 col-lg-6 justify-content-lg-center align-items-lg-center instructions-end'>
          <figure className='col-2 col-md-1'>
            <img src={marker} alt='' />
          </figure>

          <p className='col-9 col-md-7'>
            Começa a poupar ao trocares os teus pontos por promoções que temos
            ao teu dispor nos diferentes serviços turísticos da zona.
          </p>
          <figure className='pt-md-5 col-md-5 ms-auto col-lg-4'>
            <img className='mx-auto' src={box} alt='' />
          </figure>
        </div>
      </section>

      <section className='bg-primary px-3 py-5 d-flex flex-column align-items-center gap-4 text-white share'>
        <div className='col-11 col-md-9 py-md-5 col-lg-6 share__content'>
          <h3 className='mb-4'>
            Partilha a palavra com os teus amigos para começarem a ganhar também
            enquanto passeiam!
          </h3>

          <Link to={"/login"} className='btn btn-secondary main-btn'>
            Criar uma conta!
          </Link>
        </div>

        <div className='col-lg-6 mx-auto align-self-lg-end share__img'>
          <figure className='position-relative col-lg-4 ms-lg-auto'>
            <img className='friends' src={friends} alt='' />
            <img className='rectangle-dots' src={dots} alt='' />
          </figure>
        </div>
      </section>
    </main>
  );
}
