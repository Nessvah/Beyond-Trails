import { useState } from "react";
import RegistoVisitante from "./RegistoVisitante";
import RegistoPartner from "./RegistoPartner";

import ButtonLaranja from "../BotaoLaranja/ButtonLaranja";
const BotaoSelecionado = () => {
  const [selectedOption, setSelectedOption] = useState("visitante");

  return (
    <div className='container pt-5'>
      <div className='d-flex justify-content-center py-3'>
        <ButtonLaranja
          label='Visitante'
          className={`btn btn-outline-danger ${
            selectedOption === "visitante" ? "active" : ""
          }`}
          onClick={() => setSelectedOption("visitante")}
        />

        <ButtonLaranja
          label='Colaborador'
          className={`btn btn-outline-danger ${
            selectedOption === "colaborador" ? "active" : ""
          }`}
          onClick={() => setSelectedOption("colaborador")}
        />
      </div>

      {selectedOption === "visitante" ? (
        <RegistoVisitante />
      ) : (
        <RegistoPartner />
      )}
    </div>
  );
};

export default BotaoSelecionado;
