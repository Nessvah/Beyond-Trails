import ButtonLaranja from "../../BotaoLaranja/ButtonLaranja";
import { Link } from "react-router-dom";
const cardStyles = {
  cardImgContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "200px"
  },
  cardImg: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  dy2: {
    textAlign: "center"
  },
  cardText: {
    paddingTop: "2rem",
    textAlign: "center",
    paddingBottom: "2rem"
  },
  cardBody: {
    paddingTop: "2rem",
    textAlign: "center",
    height: "30rem"
  },
  cardTitle: {
    fontSize: "calc(1.325rem + 0.9vw)"
  },
  cardBtn: {
    marginTop: "auto",
    marginBottom: "auto",
    paddingTop: "2rem",
    color: "white"
  }
};

function CardPromoUserText({ title, description }) {
  return (
    <div>
      <h4 className='cardTitle'>{title}</h4>
      <p className='cardText' style={cardStyles.cardText}>
        {description}
      </p>
    </div>
  );
}

function CardPromoUser({ imgSrc, textProps, to }) {
  return (
    <div className='col-md-5 col-sm-7 col-lg-3'>
      <div className='card itens-align-center'>
        <div className='cardImg' style={cardStyles.cardImgContainer}>
          <img
            src={imgSrc}
            alt='imagem ilustrativa'
            style={cardStyles.cardImg}
          />
        </div>
        <div className='px-2 cardBody' style={cardStyles.cardBody}>
          <CardPromoUserText {...textProps} />
          <Link to={to}>
            <ButtonLaranja label='Clique Aqui' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardPromoUser;
