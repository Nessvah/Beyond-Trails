import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import promoSchema from "../../../../validationSchemas/promoSchema";
import Spin from "../../../Spin";
import { updatePromotionById } from "../../../../utils/promoApiCalls.mjs";
import UpdatePromotionsSection from "../Headers/UpdatePromotionsSection";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function UpdatePromotionForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    promotionName: "",
    description: "",
    endDate: "",
    startDate: ""
  });
  const [promotionData, setPromotionData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPromotionDataById = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_API}/api/partners/promotions-one/${id}`
        );

        if (response.data.status === "success") {
          const promotion = response.data.data;
          setPromotionData(promotion);

          setFormData({
            promotionName: promotion.promotionName,
            description: promotion.description,
            endDate: formatDateForServer(promotion.endDate),
            startDate: formatDateForServer(promotion.startDate)
          });
        } else {
          toast.error("Erro ao buscar dados da promoção");
        }
      } catch (e) {
        toast.error("Erro ao procurar dados no banco de dados");
      } finally {
        setIsLoading(false);
      }
    };

    getPromotionDataById();
  }, [id]);

  function formatDateForServer(date) {
    if (date) {
      const dateObject = new Date(date);
      const formattedDate = dateObject.toISOString().split("T")[0];
      return formattedDate;
    }
    return date;
  }

  const sendDataToUpdate = async (updatedData) => {
    setIsLoading(true);

    console.log("Dados de atualização enviados:", updatedData);

    try {
      const response = await updatePromotionById(id, updatedData);

      console.log("Resposta da atualização da promoção:", response);

      if (response.status === "success") {
        console.log(response.data, "resposta");
        setPromotionData(response.data);
        toast.success("Dados atualizados com sucesso!", {
          autoClose: 5000
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Erro ao atualizar a promoção");
    } finally {
      setIsLoading(false);
      console.log("isLoading:", isLoading);
    }
  };

  return (
    <div className='mt-5 container'>
      <UpdatePromotionsSection />
      <Link to='/parceiro/promocoes'>
        <Button variant='secondary' className='main-btn'>
          Retroceder
        </Button>
      </Link>

      {isLoading ? (
        <Spin text='Carregando formulário...' />
      ) : (
        <section className='mt-4'>
          <p className='lead fs-1'>
            Atualizar promoção de{" "}
            <span className='text-secondary'>
              {promotionData && promotionData.promotionName}
            </span>
          </p>

          <div className='row justify-content-end pe-3'>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                sendDataToUpdate(formData);
              }}
              className='bg-primary-subtle py-5 px-3 mt-5 w-85'>
              <Row className='mb-3 d-flex justify-content-center'>
                <Form.Group
                  as={Col}
                  md='4'
                  controlId='formPromotionName'
                  className='m-4'>
                  <Form.Label>Nome da Promoção</Form.Label>
                  <Form.Control
                    type='text'
                    name='promotionName'
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        promotionName: e.target.value
                      })
                    }
                    value={formData.promotionName}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  md='4'
                  controlId='formDescription'
                  className='m-4'>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    type='text'
                    name='description'
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    value={formData.description}
                  />
                </Form.Group>
              </Row>
              <Row className='mb-3 d-flex justify-content-center'>
                <Form.Group
                  as={Col}
                  md='4'
                  controlId='formEndDate'
                  className='m-4'>
                  <Form.Label>Data de Término</Form.Label>
                  <Form.Control
                    type='text'
                    name='endDate'
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    value={formData.endDate}
                    className='fs-2'
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md='4'
                  controlId='formStartDate'
                  className='m-4'>
                  <Form.Label>Data de Início</Form.Label>
                  <Form.Control
                    type='text'
                    name='startDate'
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    value={formData.startDate}
                    className='fs-2'
                  />
                </Form.Group>
              </Row>
              <div className='d-flex justify-content-center'>
                {promotionData && (
                  <Button
                    type='submit'
                    variant='secondary'
                    className='mt-4 ms-3 main-btn'>
                    Atualizar dados
                  </Button>
                )}
              </div>
            </Form>
          </div>
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
      )}
    </div>
  );
}

export default UpdatePromotionForm;
