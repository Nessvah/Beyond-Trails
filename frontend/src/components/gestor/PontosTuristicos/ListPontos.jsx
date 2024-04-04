import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import FormPontos from "./FormPontos";
import TablePontos from "./TablePontos";
import Button from "react-bootstrap/Button";
import { getAllPtData } from "../../../utils/pontosApiCalls.mjs";
import { deletePtById } from "../../../utils/pontosApiCalls.mjs";
import "react-toastify/dist/ReactToastify.css";
/* import { useAuth } from "../../../hook/useAuth"; */

const ListPontos = () => {
  /* const { userName } = useAuth(); */
  // keep track of errors state
  const [error, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // state to show or hide the form
  const [showForm, setShowForm] = useState(false);
  // state to show or hide the create pt button
  const [hideCreateBtn, setHideCreateBtn] = useState(false);

  //state to store pts data to render on the table
  const [PTData, setPtData] = useState([]);

  useEffect(() => {
    async function wrapper() {
      const PTInfo = await getAllPtData();
      console.log(PTInfo);
      setPtData(PTInfo);

      setIsLoading(false);
    }
    if (PTData.length === 0) wrapper();
  }, []);

  const handlePtDeletion = async (id) => {
    setIsLoading(true);

    try {
      const result = await deletePtById(id);

      if (result) {
        // filter out from the records table the pt deleted
        setPtData((prevData) => prevData.filter((ponto) => ponto._id !== id));

        setIsLoading(false);
        toast.success(result.message);
      }
    } catch (e) {
      setIsLoading(false);
      toast.error(e.data.message);
    }
  };

  async function onSubmit(values) {
    setIsLoading(true);
    setHideCreateBtn(false);

    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_API}/api/gestor/pontos_turisticos`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }

        /* { withCredentials: true } */
      );

      if (response.data.response === "ok") {
        // Update the state with the updated data
        setPtData([...response.data.data, ...PTData]);
        setIsLoading(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <main className='container'>
      <header className='row justify-content-between mt-5 py-5 px-4 flex-shrink-0 col-auto'>
        {/* {showForm ? null : <h1>Bem-vindo {userName}</h1>} */}

        <h2 className='display-4 col-auto'>
          Gestão de registos de Pontos Turísticos
        </h2>
      </header>
      <section className='px-4 mt-4 table-width'>
        <div className='row justify-content-end pe-3'>
          {hideCreateBtn ? (
            <Button
              type='button'
              variant='outline-secondary'
              className='col-auto main-btn'
              onClick={() => {
                setShowForm(false);
                setHideCreateBtn(false);
              }}>
              Retroceder
            </Button>
          ) : (
            <Button
              type='button'
              variant='secondary'
              className='col-auto main-btn'
              onClick={() => {
                if (error) setErrorMsg("");
                setHideCreateBtn(true);
                setShowForm(true);
              }}>
              Registar Ponto Turístico
            </Button>
          )}
        </div>
        {showForm ? (
          <FormPontos onSubmit={onSubmit} setShowForm={setShowForm} />
        ) : (
          <TablePontos
            PTData={PTData}
            isLoading={isLoading}
            onDelete={handlePtDeletion}
          />
        )}
      </section>

      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </main>
  );
};

export default ListPontos;
