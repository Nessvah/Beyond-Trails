//busca informações sobre eventos, mapeia essas informações e renderiza cartões de eventos com imagens, títulos, descrições e links para detalhes do evento.
import { useState, useEffect } from "react";
import { getAllEventsUser } from "../../utils/eventosUser.mjs";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const style = {
  margemarota: {
    padding: "7% 7% 7% 7%"
  },
  cardborder: {
    border: "0.8em solid #0b2719",
    borderRadius: "15px",
    padding: "1em",
    background: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  margemzita: {
    paddingLeft: "2.5rem"
  },
  cardTitle: {
    marginBottom: "1.5rem"
  },
  cardText: {
    color: "#68717a"
  },

  cardImg: {
    maxHeight: "300px",
    objectFit: "cover"
  }
};

/* const imageStyle = {
  maxHeight: "300px",
  objectFit: "cover"
}; */

function EventCard() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllEventsUser()
      .then((eventData) => {
        console.log("Dados recebidos da base de dados:", eventData);
        if (Array.isArray(eventData.data)) {
          const mappedEvents = eventData.data.map((event) => ({
            nome: event.nome,
            descricao: event.shortDescription,
            imagem: event.image,
            _id: event._id
          }));
          setEvents(mappedEvents);
        } else {
          setError("Dados de eventos inválidos.");
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={style.margemarota} className='container-fluid'>
      {events.map((event) => {
        return (
          <article key={event._id} className='corpo'>
            <Card style={style.cardborder} className='mb-3'>
              <div className='row g-0'>
                <div className='col-md-4'>
                  <Card.Img
                    src={`http://${process.env.REACT_APP_API}/uploads/${event.imagem}`}
                    className='img-fluid rounded image-spacing'
                    alt='eventaço'
                    style={style.cardImg}
                  />
                </div>
                <div style={style.margemzita} className='col-md-8'>
                  <Card.Body>
                    <Card.Title
                      style={style.cardTitle}
                      className='card_title card-titulo'>
                      {event.nome}
                    </Card.Title>
                    <Card.Text style={style.cardText} className='card_text'>
                      {event.descricao}
                    </Card.Text>
                    <Button
                      variant='primary'
                      className='botao_cards text-secondary'
                      style={{
                        backgroundColor: "white",
                        color: "#000",
                        borderColor: "white"
                      }}>
                      <Link to={`/eventos/${event._id}`}>Ver +</Link>
                    </Button>
                  </Card.Body>
                </div>
              </div>
            </Card>
          </article>
        );
      })}
    </div>
  );
}

export default EventCard;
