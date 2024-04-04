import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { getAllEventsUser } from "../../utils/eventosUser.mjs";

const imagemStyle = {
  width: "2048px",
  height: "423px",
  objectFit: "cover",
  paddingLeft: "3.5rem",
  paddingRight: "3.5rem",
  marginBottom: "2%"
};

function EventoImagem() {
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
    <div>
      <Card.Img
        src={`http://${process.env.REACT_APP_API}/uploads/${evento.image}`}
        className='img-fluid rounded image-spacing'
        alt='eventaço'
        style={imagemStyle}
      />
    </div>
  );
}

export default EventoImagem;
