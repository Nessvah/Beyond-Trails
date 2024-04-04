import "./header.module.css";
import Image from "react-bootstrap/Image";

function Header({ headerData, heading, imgUrl, upperText, bottomText }) {
  if (headerData) {
    heading = headerData[0].heading;
    imgUrl = headerData[0].imgUrl;
  }
  return (
    <div className='container contentor'>
      <section className='row justify-content-around align-items-center py-5 my-5 head'>
        <h1 className='text-primary col-12 col-sm-10 col-md-8 col-lg-6 ps-5 primeiro'>
          {heading}
        </h1>
        <Image
          src={imgUrl}
          alt=''
          className='col-3 col-sm-2 col-md-3 col-lg-2 col-xl-2 img-fluid logo w-25'
        />
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <p className='p-bem-vindo text-center pb-5'>{upperText}</p>
              <p className='p-bem-vindo text-center pb-5'>{bottomText}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
