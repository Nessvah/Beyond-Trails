const estilos = {
  customRow: {
    "--bs-gutter-x": 0,
    "--bs-gutter-y": 0,
    margin: 0
  },
  h2: {
    textAlign: "center",
    paddingTop: "20%"
  },
  destaques: {
    padding: "6rem"
  },
  sobreLadoDireito: {
    display: "flex",
    alignItems: "center"
    // backgroundColor: "#0B2719",
  },
  pSobre: {
    flex: 2,
    padding: "5%",
    textAlign: "left",
    margin: "5%"
  },
  customRowInner: {
    // backgroundColor: "#FFFCF6",
  }
};

function SeccaoSobre() {
  return (
    <section className='sobre' style={estilos.customRowInner}>
      <div className='container-sobre'>
        <div className='row' style={estilos.customRow}>
          <div className='col-md-4'>
            <h2 className='mb-4 tex-primary' style={estilos.h2}>
              {" "}
              Bragança <br /> Beyond Trails
            </h2>
          </div>

          <div
            className='col-md-8 bg-primary sobre-lado-direito'
            style={estilos.sobreLadoDireito}>
            <p className='p-sobre text-white' style={estilos.pSobre}>
              Bem-vindo ao Beyond Trails and Bragança!
              <br />
              Desenvolvemos o turismo na encantadora região de Bragança.
              <br />
              Explore trilhas, rotas e pontos turísticos fascinantes. Descubra
              os segredos desta cidade.
              <br />
              Atualizamos constantemente os nossos destinos para oferecer as
              melhores opções de lazer e aventura.
              <br />
              Compartilhe as suas histórias e experiências de viagem,
              enriqueçendo a nossa comunidade de viajantes.
              <br />
              Encontre informações detalhadas sobre os seus destinos,
              acomodações, restaurantes e eventos locais.
              <br />
              Seja um aventureiro em busca de desafios emocionantes ou um amante
              da natureza deslumbrante.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeccaoSobre;
