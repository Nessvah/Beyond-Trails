import imagem2 from "../../../assets/images/home-parceiros/foto2.png";
import imagem3 from "../../../assets/images/home-parceiros/foto3.png";
import imagem4 from "../../../assets/images/home-parceiros/foto4.png";

import CardPromoUser from "./CardPromoUser.jsx";

const cardsData = [
  {
    imgSrc: imagem2,
    textProps: {
      title: "Atualize as suas informações!",
      description:
        "Mantenha as informações atualizadas para garantir uma precisão e um melhor gerenciar do seu negócio."
    },
    to: "/parceiro/informacoes"
  },
  {
    imgSrc: imagem3,
    textProps: {
      title: "Compartilhe a sua opinião!",
      description:
        "Deixe-nos saber como podemos melhorar sua experiência e atender, ainda melhor, às suas necessidades."
    },
    to: "/parceiro/feedbacks"
  },
  {
    imgSrc: imagem4,
    textProps: {
      title: "Registo código visitante!",
      description:
        "Registe o código do visitante para informações precisas sobre a gestão do seu negócio!"
    },
    to: "/parceiro/registo-codigo-visitante"
  }
];

function CardsPartner() {
  return (
    <section className='menu-ilustrativo bg-secondary'>
      <div className='container py-5'>
        <div className='row gap-5 justify-content-center'>
          {cardsData.map((data, index) => (
            <CardPromoUser key={index} {...data} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardsPartner;
