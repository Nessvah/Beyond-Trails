import "./bigcard.scss";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function BigCardPN({ info }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/pontos-naturais");
  };

  if (!info) {
    return <p>Information not found</p>;
  }

  return (
    <div className='justify-content-between align-items-center'>
      <div className='row'>
        <div className='col'>
          {info.morada ? (
            <p>
              <span className='border-secondary label'>Morada</span>{" "}
              {info.morada}
            </p>
          ) : null}
          {info.coordenadas ? (
            <p>
              <span className='border-secondary label'>Coordenadas</span>{" "}
              {info.coordenadas}
            </p>
          ) : null}
          {info.horario ? (
            <p>
              <span className='border-secondary label'>Horário</span>{" "}
              {info.horario}
            </p>
          ) : null}
          {info.descricao ? (
            <p>
              <span className='border-secondary label'>Descrição</span>{" "}
              {info.descricao}
            </p>
          ) : null}
          {info.telefone ? (
            <p>
              <span className='border-secondary label'>Telefone</span>{" "}
              {info.telefone}
            </p>
          ) : null}
          {info.website ? (
            <p>
              <span className='border-secondary label'>Website</span>{" "}
              {info.website}
            </p>
          ) : null}
          {info.telemovel ? (
            <p>
              <span className='border-secondary label'>Telemóvel</span>{" "}
              {info.telemovel}
            </p>
          ) : null}
        </div>
      </div>
      <div className='row-'>
        <Button className='btn btn-secondary col-3 goBack' onClick={goBack}>
          Voltar para Pontos Naturais
        </Button>
      </div>
    </div>
  );
}

export default BigCardPN;
