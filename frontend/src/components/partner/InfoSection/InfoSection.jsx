function InfoSection({ imgUrl1, imgUrl2, title, description }) {
  return (
    <div className='container col-10 mx-auto mt-5'>
      <div className='row'>
        <div className='col-md-3'>
          <img src={imgUrl1} className='imagePromo' alt='Imagem' />
        </div>
        <div className='col-md-6 text-center'>
          <h1 className='text-secondary p-3'>{title}</h1>
          <p className='texto-header p-5 m-5'>{description}</p>
        </div>
        <div className='col-md-3'>
          <img src={imgUrl2} className='imagePromo' alt='Imagem' />
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
