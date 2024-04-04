import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllEventsUser } from "../../utils/eventosUser.mjs";
import "./headerEvento.css";

const headerStyle = {
  paddingLeft: "3.5rem"
};

function HeaderEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllEventsUser()
      .then((eventData) => {
        console.log("Dados recebidos da base de dados:", eventData);
        if (Array.isArray(eventData.data)) {
          const event = eventData.data.find((event) => event._id === id);

          if (event) {
            setEvento(event);
          } else {
            setError("Evento não encontrado.");
          }
        } else {
          setError("Dados de eventos inválidos.");
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
    <div style={headerStyle}>
      <div className='container contentor'>
        <section className='row justify-content-around align-items-center py-5 my-5 head'>
          <h1 className='text-primary col-12 col-sm-10 col-md-8 col-lg-12 ps-5 primeiro'>
            {evento.nome}
          </h1>
        </section>
      </div>
    </div>
  );
}

export default HeaderEvento;
