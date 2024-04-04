import RoteiroItem from "./RoteiroItem";

import imagem1 from "../../assets/images/homepage/imagem1.png";
import imagem2 from "../../assets/images/homepage/imagem2.png";
import imagem3 from "../../assets/images/homepage/imagem3.png";
import roteiro1 from "../../assets/documentos/roteiro1.pdf";
import roteiro2 from "../../assets/documentos/roteiro2.pdf";
import roteiro3 from "../../assets/documentos/roteiro3.pdf";

function SeccaoRoteiro() {
  return (
    <section className='promo-roteiros'>
      <h3 className='text-center p-5 mb-3'>
        Roteiros para todos os passos e famílias!
      </h3>
      <p className='text-center p-5 mb-3'>
        Explore Bragança ao seu próprio ritmo - Roteiros acessíveis para todos!
      </p>
      <div className='container-roteiros bg-primary w-100'>
        <div className='row'>
          <RoteiroItem
            imagemSrc={imagem1}
            descricao='Descubra aventuras para todos:'
            duracao='1 DIA'
            arquivoSrc={roteiro1}
          />
          <RoteiroItem
            imagemSrc={imagem2}
            descricao='Descubra aventuras para todos:'
            duracao='3 DIAS'
            arquivoSrc={roteiro2}
          />
          <RoteiroItem
            imagemSrc={imagem3}
            descricao='Descubra aventuras para todos:'
            duracao='1 SEMANA'
            arquivoSrc={roteiro3}
          />
        </div>
      </div>
    </section>
  );
}

export default SeccaoRoteiro;
