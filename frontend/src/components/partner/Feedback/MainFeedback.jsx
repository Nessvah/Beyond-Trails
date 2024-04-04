import { useState } from "react";
import Button from "react-bootstrap/Button";
import FormFeedback from "./FormFeedback";
import FeedbackTable from "./TableFeedback";
import { getFeedbackHistory } from "../../../utils/feedbackApiCallss.mjs";
import "./css/FeedStyle.css";
import { useAuth } from "../../../hook/useAuth";
function MainFeedback() {
  const user = useAuth();
  console.log(user.userId, "user ");
  const [showFeedbackForm, setShowFeedbackForm] = useState(true);
  const [showFeedbackTable, setShowFeedbackTable] = useState(false);
  const [data, setData] = useState([]);

  const handleShowFeedbackForm = () => {
    setShowFeedbackForm(true);
    setShowFeedbackTable(false);
  };

  const handleShowFeedbackTable = async () => {
    try {
      const feedbackData = await getFeedbackHistory(user.userId);
      console.log(feedbackData);
      setData(feedbackData);
      setShowFeedbackForm(false);
      setShowFeedbackTable(true);
    } catch (error) {
      console.error("Erro ao buscar histórico de feedbacks", error);
    }
  };

  return (
    <div className='FeedbackPage main-section fundo '>
      <div className='button-container text-center justify-content-center d-flex '>
        <div className='pe-5'>
          <Button
            type='button'
            variant='secondary'
            className='col-auto main-btn'
            onClick={handleShowFeedbackForm}>
            Criar Feedback
          </Button>
        </div>
        <Button
          type='button'
          variant='secondary'
          className='col-auto main-btn'
          onClick={handleShowFeedbackTable}>
          Consultar Histórico
        </Button>
      </div>
      {showFeedbackForm && <FormFeedback />}{" "}
      {showFeedbackTable && <FeedbackTable feedbackData={data} />}{" "}
    </div>
  );
}

export default MainFeedback;
