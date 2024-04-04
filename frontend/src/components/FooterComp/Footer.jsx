import "./footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className='container-fluid p-3 gap-3 text-center text-sm-start text-md-start text-lg-start text-xl-start text-xxl-start ps-lg-5 pe-lg-5 d-flex flex-column flex-sm-row justify-content-sm-around flex-lg-row justify-content-lg-between footer'>
      <section className='footer__left d-lg-flex gap-4 mb-4 col-lg-6 justify-content-between col-xl-5 col-xxl-4'>
        <div>
          <h4>© 2023 Beyond Trails</h4>
        </div>
        <div>
          <h4>Contactos:</h4>
          <address>
            <p>info@beyondtrails.pt</p>
            <p>+351 961 500 233</p>
          </address>
        </div>
        <div>
          <div className='row'>
            <Link to='/segue-nos'>
              <h4>Segue-nos!</h4>
            </Link>
          </div>
          <div className='d-flex flex-row gap-4 justify-content-center justify-content-sm-start'>
            <i className='bi bi-instagram footer__icon' />
            <i className='bi bi-facebook footer__icon' />
          </div>
        </div>
      </section>
      <section className='footer__right pe-lg-3 pe-xxl-5 ps-sm-5'>
        <ul className='footer__list d-flex flex-column gap-3 d-xl-flex flex-xl-row gap-xl-5'>
          <li>
            <Link to='/infoutil'>
              <p>Informação Útil</p>
            </Link>
          </li>
          <li>
            <p>Política de privacidade</p>
          </li>
          <li>
            <p>Termos de utilização</p>
          </li>
          <li>
            <p>Cookies</p>
          </li>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;
