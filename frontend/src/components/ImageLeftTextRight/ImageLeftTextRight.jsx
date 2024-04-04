function ImageLeftTextRight({ title, text, imgUrl }) {
  return (
    <section className='custom-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 d-flex justify-content-end '>
            <img src={imgUrl} alt='Imagem ilustrativa' />
          </div>
          <div className='col-md-6 text-center text-md-start p-5 mt-4'>
            <h3>{title}</h3>
            <p className='text-ajuda text-center p-5'>{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageLeftTextRight;
