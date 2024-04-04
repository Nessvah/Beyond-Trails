import imagemHistorico from "../../../assets/images/beneficioPartner/beneficio_parceiro-1.png";
import imagemDesenvolvimento from "../../../assets/images/beneficioPartner/beneficios_parceiro-2.png";
import imagemFinal from "../../../assets/images/beneficioPartner/beneficio_parceiro-3.png";
import ButtonLaranja from "../../BotaoLaranja/ButtonLaranja";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hook/useAuth";

function HistoricoRegistoBotao() {
  const user = useAuth();

  return (
    <section className='historico-registo pt-5 mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <Link to={`/parceiro/desempenho/${user.userId}`}>
              <ButtonLaranja label='Histórico de Registo' />
            </Link>
          </div>
          <div className='col-md-6'>
            <div className='content-wrapper text-center p-3'>
              <h1>
                Bem-vindo à nossa plataforma de registo de parceiros no Beyond
                Trails!
              </h1>
            </div>
          </div>
        </div>
        <article className='text-historico text-center p-5'>
          <p>
            Estamos empolgados por estar considerando a possibilidade de se
            tornar um parceiro conosco.
            <br /> Desta forma, entendemos a importância de mantê-lo informado
            sobre o status do seu registo e queremos garantir que todo o
            processo seja transparente e eficiente.
            <br />
            Após enviar o seu registo, a nossa Equipa revisará cuidadosamente
            todas as informações fornecidas. <br /> Durante esse período, você
            terá acesso a esta página, onde poderá consultar o histórico do seu
            registo e verificar o estado atual da sua candidatura. Esteja atento
            a atualizações importantes e detalhes sobre o progresso da
            avaliação.
          </p>
        </article>
      </div>
    </section>
  );
}

function Publicidade() {
  return (
    <section className='publicidade'>
      <div className='container p-5 mt-5'>
        <div className='row'>
          <div className='col-md-6 text-center pt-5 m5-5 d-flex align-items-center'>
            <h2>
              Descubra um Mundo de Possibilidades como Parceiro do Beyond Trails
            </h2>
          </div>
          <div className='col-md-6 d-flex justify-content-center'>
            <div className='image-column'>
              <img src={imagemHistorico} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesenvolvimentoBeneficios() {
  return (
    <section className='desenvolvimento-beneficios p-5'>
      <h3 className='p-5 text-center'>
        Tem um estabelecimento ou negócio em que pretende expandir os seus
        horizontes <br /> e alcançar novas alturas?
      </h3>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='image-desenvolvimento-beneficios'>
              <img src={imagemDesenvolvimento} alt='Imagem ilustrativa' />
            </div>
          </div>
          <div className='col-md-6'>
            <article className='texto-beneficio'>
              <p>
                O programa de parceria do Beyond Trails é a sua porta de entrada
                para uma jornada emocionante e repleta de oportunidades. Ao se
                tornar nosso parceiro estará a unir-se a uma comunidade global
                de empreendedores e inovadores, mas também desfrutará de uma
                série de vantagens exclusivas que impulsionarão o seu sucesso!
              </p>
              <p>Desde já poderá conta com:</p>
              <p>
                Uma visibilidade exponencial: Como parceiro do Beyond Trails,
                terá destaque na nossa plataforma, que é visitada por milhares
                de exploradores ávidos por experiências autênticas. Isso
                significa que a sua marca e os seus serviços alcançarão um
                público diversificado e engajado, aumentando a sua visibilidade
                e reconhecimento.
              </p>
              <p>
                Um Acesso à Comunidade: Atráves de uma rede de parceiros que é
                uma comunidade vibrante, unida pelo desejo de oferecer as
                melhores experiências aos viajantes. Ao fazer parte dela, você
                terá oportunidades exclusivas para se conectar com outros
                parceiros, trocar ideias, compartilhar conhecimento e aprender
                com colegas empreendedores.
              </p>
              <p>
                Uma Promoção Personalizada: Oferecemos estratégias de marketing
                sob medida para promover seu negócio. Através da nossa equipa
                especializada ajudará a criar campanhas eficazes, desde a
                criação de conteúdo envolvente até a otimização de SEO, para que
                a sua oferta seja apresentada da melhor maneira possível.
              </p>
              <p>
                Ampliação de Receita: Ao se juntar ao Beyond Trails, estará
                abrindo as portas para uma nova fonte de receita. Com a demanda
                crescente por experiências únicas e autênticas, onde poderá
                diversificar as suas fontes de renda e aumentar os seus lucros.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalSecao() {
  return (
    <section className='final-seccao bg-primary'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 d-flex align-items-center'>
            <h4 className='text-white text-center pt-5 mt-5'>
              O Beyond Trails aguarda ansiosamente para ajudar a alcançar novos
              horizontes e criar memórias inesquecíveis para viajantes de todo o
              mundo. <br /> Junte-se a nós e faça parte dessa jornada incrível!
            </h4>
          </div>
          <div className='col-md-6'>
            <div className='image-column'>
              <img src={imagemFinal} alt='Imagem ilustrativa' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaginaPrincipal() {
  return (
    <div>
      <main>
        <HistoricoRegistoBotao />
        <Publicidade />
        <DesenvolvimentoBeneficios />
        <FinalSecao />
      </main>
    </div>
  );
}

export default PaginaPrincipal;
