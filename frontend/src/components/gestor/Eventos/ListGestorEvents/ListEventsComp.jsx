//representa um componente React que lida com a gestão de eventos. permite a criação de eventos, bem como a exibição de uma lista de eventos existentes. O código faz uso de axios para fazer solicitações HTTP e da biblioteca react-toastify para exibir notificações ao usuário.
import { useState, useEffect } from "react";
import axios from "axios";
//biblioteca de notificações
import { ToastContainer, toast } from "react-toastify";
import FormEvents from "./FormEvent";
import EventsTable from "./TableEvents";
import Button from "react-bootstrap/Button";
import "react-toastify/dist/ReactToastify.css";
import { deleteEventById } from "../../../../utils/eventosApiCalls.mjs";

// declarar vários estados usando o useState
const ListEventsComp = () => {
  //controlar se o formulário de criação de eventos está visível
  const [showForm, setShowForm] = useState(false);
  //controlar se o botão de criação de eventos está oculto
  const [hideCreateBtn, setHideCreateBtn] = useState(false);
  //armazenar mensagens de erro
  const [error, setErrorMsg] = useState("");
  // indicar se a aplicação está carregando dados
  const [isLoading, setIsLoading] = useState(true);
  //armazenar os dados dos eventos
  const [eventsData, setEventsData] = useState([]);

  //função para lidar com a exclusão de eventos
  const handleEventDeletion = async (id) => {
    setIsLoading(true);

    try {
      const result = await deleteEventById(id);

      if (result) {
        setEventsData((prevData) =>
          prevData.filter((event) => event._id !== id)
        );

        setIsLoading(false);
        toast.success(result.message);
      }
    } catch (e) {
      setIsLoading(false);
      toast.error(e.data.message);
    }
  };

  //usado para buscar os dados dos eventos. É feito através de uma solicitação GET para uma URL local.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_API}/api/gestor/eventos`
        );
        if (response.data.response === "ok") {
          setEventsData(response.data.data);
        } else {
          console.error("Resposta não OK:", response);
        }
      } catch (error) {
        console.error("Erro na solicitação GET:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  //para lidar com o envio do formulário de criação de eventos
  async function onSubmit(values) {
    setIsLoading(true);
    console.log(values);

    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_API}/api/gestor/eventos`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(response);
      if (response.data.status === "success") {
        setEventsData([...eventsData, response.data.data]);

        setIsLoading(false);
        toast.success(response.data.message);
        setShowForm(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <main className='container'>
      <header className='row justify-content-between mt-5 py-5 px-4 flex-shrink-0 col-auto'>
        <h2 className='display-4 col-auto'>Gestão de registos de Eventos</h2>
      </header>
      <section className='px-4 mt-4 pb-5 mb-5 pt-5'>
        <div className='row justify-content-end pe-3 pb-5 mb-5'>
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
              Criar Evento
            </Button>
          )}
        </div>

        {showForm ? (
          <FormEvents onSubmit={onSubmit} setShowForm={setShowForm} />
        ) : (
          <EventsTable
            eventsData={eventsData}
            isLoading={isLoading}
            onDelete={handleEventDeletion}
          />
        )}

        {/* exibir notificações na parte superior do aplicativo.(reat-toqastify) */}
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
      </section>
    </main>
  );
};

export default ListEventsComp;
