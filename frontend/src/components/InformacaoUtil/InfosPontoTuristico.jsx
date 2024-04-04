import TextoDestaque from "../TextoPComp/TextoDestaque";
import imagemInfo from "../../assets/images/informacaoUtil/posto-turismo.png";
const estiloCSS = {
  h2: {
    fontSize: "48px",
    textAlign: "center",
    padding: "5%"
  },
  infoPostoTuristico: {
    paddingTop: "5%",
    paddingBottom: "5%",
    backgroundColor: "#0B2719"
  },
  textPostoTurismo: {
    paddingLeft: "35%",
    paddingTop: "35%",
    fontSize: "18px",
    lineHeight: "1.6",
    color: "white"
  }
};

function InfosPontoTuristico() {
  return (
    <div>
      <section
        className='info-posto-turistico bg-primary'
        style={estiloCSS.infoPostoTuristico}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='image-posto-turistico'>
                <img src={imagemInfo} alt='imagem posto de turismo' />
              </div>
            </div>
            <div className='col-md-6 text-white d-flex flex-column align-items-center justify-content-center p-5'>
              <TextoDestaque
                texto={
                  <>
                    Rua Abílio Beça, nº 103 · 5300-011 Bragança
                    <br />
                    Telefone: 273 240 020
                    <br />
                    E-mail: turismo@cm-braganca.pt
                    <br />
                    Horário: 9h00-12h30 e 14h00-17h30
                    <br />
                  </>
                }
                estilo={estiloCSS.textPostoTurismo}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InfosPontoTuristico;
