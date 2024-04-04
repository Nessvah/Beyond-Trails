import Header from "../../components/HeaderComp/Header";
import CardSectionGeralPT from "../../components/SectionCardComp/CardSectionGeralPT";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import headerDados from "../../assets/js/locations";

function PontosTuristicos() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tipo = searchParams.get("ponto");

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_API}/api/users/pontos_turisticos?ponto=${tipo}`
      )
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [tipo]);

  const headerData = headerDados.filter((obj) => obj.id == tipo);

  return (
    <>
      <Header headerData={headerData} />
      <CardSectionGeralPT data={data} />
    </>
  );
}

export default PontosTuristicos;
