import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllEventsUser } from "../../utils/eventosUser.mjs";

const descriptionStyle = {
  paddingLeft: "3.5rem"
};

function EventDetails() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllEventsUser()
      .then((eventData) => {
        const event = eventData.data.find((event) => event._id === id);
        if (event) {
          setEvento(event);
        } else {
          setError("Evento não encontrado.");
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!evento) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={descriptionStyle}>
      <div className='row descricao'>
        <p>{evento.shortDescription}</p>
      </div>
    </div>
  );
}

export default EventDetails;
