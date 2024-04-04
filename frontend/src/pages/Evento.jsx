import HeaderEvento from "../components/HeaderEvento/HeaderEvento";
import ImagemEvento from "../components/ImagemEvento/ImagemEvento";
import EventDescription from "../components/EventDescription/EventDescription";
import EventDetails from "../components/InfoEvent/InfoEvent";
import { useParams } from "react-router-dom";
import eventInfo from "../assets/js/eventInfo";

function Evento() {
  const paramsId = useParams("id");
  const eventoId = paramsId.id;

  const evento = eventInfo.filter((eachEvent) => eachEvent.id + 1 == eventoId);

  return (
    <div className='Eventos'>
      <HeaderEvento evento={evento} />
      <ImagemEvento evento={evento} />
      
      <EventDescription evento={evento} />
      <EventDetails evento={evento} />
    </div>
  );
}

export default Evento;
