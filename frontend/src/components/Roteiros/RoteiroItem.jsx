import ButtonLaranja from "../BotaoLaranja/ButtonLaranja";

function RoteiroItem({ imagemSrc, descricao, duracao, arquivoSrc }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = arquivoSrc;
    link.target = "_blank";
    link.download = "Roteiro.pdf";
    link.click();
  };

  return (
    <div className='col-md-4 row align-items-center'>
      <div className='img-container d-flex justify-content-center align-items-center pt-5 position-relative'>
        <img
          src={imagemSrc}
          alt='imagem roteiro'
          className='mw-100 mh-100 pb-2 w-50 h-60'
        />
      </div>
      <p className='p-roteiro text-center text-white'>{descricao}</p>
      <p className='p-roteiro text-center pb-5 text-white'>{duracao}</p>
      <div className='botao w-35 justify-content-center d-flex pb-5'>
        <ButtonLaranja onClick={handleDownload} label='Clique Aqui' />
      </div>
    </div>
  );
}

export default RoteiroItem;
