import IconDestaque from "../IconComp/IconDestaque";
import TextoDestaque from "../TextoPComp/TextoDestaque";

const estiloCSS = {
  icon: {
    fontSize: "200%"
  },
  infUtilText: {
    display: "flex",
    alignItems: "center",
    textAlign: "justify",
    paddingBottom: "5%",
    paddingLeft: "5%",
    paddingTop: "4%"
  },
  iconDireita: {
    paddingLeft: "15%"
  },
  textTele: {
    marginBottom: "1rem",
    marginLeft: "2rem"
  },
  maisInfo: {
    fontSize: "18px",
    marginTop: "0.5rem",
    cursor: "pointer"
  },
  p: {
    paddingLeft: "4rem"
  }
};

function InformacoesFundo() {
  return (
    <section className='informacoes-fundo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='inf-util-text' style={estiloCSS.infUtilText}>
              <IconDestaque
                iconName='bi-geo-alt text-secondary pe-3'
                estilo={estiloCSS.icon}
              />
              <TextoDestaque
                texto='Bragança, uma cidade encantadora localizada no nordeste de Portugal, é um destino turístico imperdível para aqueles que buscam experiências autênticas e inesquecíveis.'
                estilo={estiloCSS.infUtilText}
              />
            </div>
            <div className='inf-util-text' style={estiloCSS.infUtilText}>
              <IconDestaque
                iconName='bi-activity text-secondary pe-3'
                estilo={estiloCSS.icon}
              />
              <TextoDestaque
                texto='De segunda a sexta, das 09:00 às 19:00 (Algumas fecham à hora de almoço). Clique aqui, para saber que farmácias estarão abertas à noite.'
                estilo={estiloCSS.infUtilText}
              />
            </div>
            <div className='inf-util-text' style={estiloCSS.infUtilText}>
              <IconDestaque
                iconName='bi-people-fill text-secondary pe-3'
                estilo={estiloCSS.icon}
              />
              <TextoDestaque
                texto='Bragança, um tesouro do nordeste de Portugal, é lar para aproximadamente 134.000 habitantes.'
                estilo={estiloCSS.infUtilText}
              />
            </div>
          </div>

          <div className='col-md-6'>
            <div className='inf-util-text' style={estiloCSS.infUtilText}>
              <IconDestaque
                iconName='bi-bus-front text-secondary pe-3'
                estilo={estiloCSS.icon}
              />
              <TextoDestaque
                texto='Todos os dias, das 06:30 à 00:00.'
                estilo={estiloCSS.infUtilText}
              />
            </div>
            <div className='inf-util-text' style={estiloCSS.infUtilText}>
              <IconDestaque
                iconName='bi-brightness-alt-high-fill text-secondary pe-3'
                estilo={estiloCSS.icon}
              />
              <TextoDestaque
                texto='Em Bragança, no norte de Portugal, o clima é caracterizado por invernos frios e verões quentes e secos. Durante os meses de inverno, as temperaturas podem cair abaixo de zero, e a ocorrência de neve não é incomum. No entanto, quando a primavera chega, os dias começam a ficar mais amenos e soalheiros.'
                estilo={estiloCSS.infUtilText}
              />
            </div>
            <div className='inf-util-text' style={estiloCSS.infUtilText}>
              <IconDestaque
                iconName='bi-telephone-inbound-fill text-secondary pe-3'
                estilo={estiloCSS.icon}
              />
              <div className='text-tele' style={estiloCSS.textTele}>
                <p>Número de Emergência Nacional 112</p>
                <p>Linha de Saúde Pública 24 (+351) 808 24 24 24 | 24h / 24h</p>
                <p>Esquadra de Polícia (+351) 273 303 412</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InformacoesFundo;
