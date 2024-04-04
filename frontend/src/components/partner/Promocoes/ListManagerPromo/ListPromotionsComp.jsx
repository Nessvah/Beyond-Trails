import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import FormPromo from "./FormPromo";
import TablePromo from "./TablePromo";
import Button from "react-bootstrap/Button";
import getAllPromotionsData from "../../../../utils/fetchPromotionsData";
import { deletePromotionById } from "../../../../utils/promoApiCalls.mjs";
import "react-toastify/dist/ReactToastify.css";
import VerHeader from "../Headers/VerPromo";
import { useAuth } from "../../../../hook/useAuth";
const ListPromotionsComp = () => {
  // state para mostrar ou ocultar o formulário
  const [showForm, setShowForm] = useState(false);
  // state para mostrar ou ocultar o botão de criar promoção
  const [hideCreateBtn, setHideCreateBtn] = useState(false);
  // acompanhar o estado de erros
  const [error, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const user = useAuth();

  // state para armazenar os dados das promoções para renderizar na tabela
  const [promotionsData, setPromotionsData] = useState([]);

  const handlePromotionDeletion = async (id) => {
    setIsLoading(true);

    try {
      const result = await deletePromotionById(id);

      if (result) {
        console.log(result);
        // filtra tabela => os dados da promoção excluída
        setPromotionsData((prevData) =>
          prevData.filter((promotion) => promotion._id !== id)
        );

        setIsLoading(false);
        toast.success(result.message);
      }
    } catch (e) {
      setIsLoading(false);
      toast.error(e.data.message);
    }
  };

  useEffect(() => {
    async function wrapper() {
      const promotionsInfo = await getAllPromotionsData(user.userId);
      console.log(promotionsInfo, "este e o promotionsInfo");
      setPromotionsData(promotionsInfo);
      setIsLoading(false);
    }
    wrapper();
  }, []);

  async function onSubmit(values) {
    console.log(values);
    setIsLoading(true);
    setHideCreateBtn(false);

    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_API}/api/partners/promotions/${user.userId}`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log("Response data:", response.data);
      if (response.data.status === "success") {
        // estado com os dados atualizados
        console.log("sucesso!");
        setPromotionsData([...promotionsData, ...response.data.data]);

        setIsLoading(false);
        toast.success(response.data.message);
        console.log("Toast success triggered");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <main className='container mt-5 pt-5'>
      <VerHeader />
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
              Criar promoção
            </Button>
          )}
        </div>

        {showForm ? (
          <FormPromo onSubmit={onSubmit} setShowForm={setShowForm} />
        ) : (
          <TablePromo
            promotionsData={promotionsData}
            isLoading={isLoading}
            onDelete={handlePromotionDeletion}
          />
        )}

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

export default ListPromotionsComp;
