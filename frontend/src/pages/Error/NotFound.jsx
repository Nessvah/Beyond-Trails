import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/esm/Image";
import img from "../../assets/images/notFound.svg";

function NotFound() {
  return (
    <div className='d-flex px-5 flex-column gap-5 flex-md-row justify-content-md-around justify-content-lg-center gap-lg-5 pt-lg-5 main-section'>
      <div className='col-lg-5 col-xl-4'>
        <h1 className='text-secondary'>Oops!</h1>
        <h2 className='mt-5 mb-2 mb-lg-5'>
          Parece que não conseguimos encontrar a página que procuravas...
        </h2>
        <Link to='/'>
          <Button className='btn btn-secondary mt-4 main-btn'>
            Volta para casa!
          </Button>
        </Link>
      </div>

      <div className='hero-section__img'>
        <Image
          src={img}
          width='500'
          alt='homem num túnel, com capacete com luz, à procura de algo'
        />
      </div>
    </div>
  );
}

export default NotFound;
