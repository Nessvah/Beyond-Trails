import { cardInfoPN } from "../../assets/js/cardInfo";
import "./card.scss";
import { Link } from "react-router-dom";

function CardPN() {
  function cleanTitle(str) {
    const nome = str.split(" ");
    return nome.join("-");
  }
  return (
    <div className='row gap-4 justify-content-between align-items-center'>
      {cardInfoPN.map((card, i) => {
        return (
          <article key={i} className='col-12 col-md-6 col-lg-5 bordo'>
            <div className='card mb-3 rounded-4 cartao'>
              <div className='row g-0'>
                <div className='col-md-4'>
                  <img
                    src={card.imgUrl}
                    className='img-fluid rounded-start-4 h-100 '
                  />
                </div>
                <div className='col-md-8'>
                  <div className='card-body bg-white '>
                    <h5 className='card_title'>{card.local}</h5>
                    <p className='card_text'>{card.descricao}</p>
                    <div>
                      <Link
                        className='btn botao_cards botao'
                        to={`${cleanTitle(card.local)}`}>
                        Ver +
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default CardPN;
