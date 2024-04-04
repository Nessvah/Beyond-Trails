import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { getAllEventsUser } from "../../utils/eventosUser.mjs";

const style = {
  verd: {
    paddingLeft: "3.5rem",
    paddingTop: "2%",
    paddingBottom: "4%"
  },
  roundedCol: {
    borderRadius: "3.5rem"
  },
  iconSize: {
    paddingLeft: "4rem",
    paddingRight: "2rem",
    fontSize: "5rem"
  }
};

function EventoDetalhes() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    getAllEventsUser()
      .then((eventData) => {
        const event = eventData.data.find((event) => event._id === id);
        if (event) {
          setEvento(event);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do evento: ", error);
      });
  }, [id]);

  if (!evento) {
    return <div>Carregando...</div>;
  }

  return (
    <div key={evento._id} style={style.verd} className='row'>
      <div className='col-md-6'>
        <div style={style.roundedCol} className='rounded-col bg-primary p-3'>
          <div className='row'>
            <div
              style={style.iconSize}
              className='col-auto d-flex align-items-center'>
              <i className='bi bi-pin-map icon-size text-secondary' />
            </div>
            <div className='col d-flex align-items-center'>
              <p className='text-white'>{evento.local}</p>
            </div>
          </div>
          <div className='row'>
            <div
              style={style.iconSize}
              className='col-auto d-flex align-items-center'>
              <i className='bi bi-clock icon-size text-secondary' />
            </div>
            <div className='col d-flex align-items-center'>
              <p className='text-white'>{evento.hora}</p>
            </div>
          </div>
          <div className='row'>
            <div
              style={style.iconSize}
              className='col-auto d-flex align-items-center'>
              <i className='bi bi-ticket-perforated icon-size text-secondary' />
            </div>
            <div className='col d-flex align-items-center'>
              <p className='text-white'>{evento.bilhete}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='col-md-6'>
        <Container>
          <Row>
            <Col className='d-flex justify-content-center'>
              <Image
                src={`http://${process.env.REACT_APP_API}/uploads/${evento.cartazUrl}`}
                fluid
                style={{ width: "auto", height: "25rem" }}
                alt={evento.nome}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default EventoDetalhes;
