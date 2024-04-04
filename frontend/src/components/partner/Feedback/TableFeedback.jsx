import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import IconDestaque from "../../IconComp/IconDestaque";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteFeedback } from "../../../utils/feedbackApiCallss.mjs";
import { format } from "date-fns";

const FeedbackTable = ({ feedbackData, isLoading }) => {
  const [feedbacks, setFeedbacks] = useState(feedbackData.feedbacks);

  const handleRemoveFeedback = async (feedback) => {
    try {
      const result = await deleteFeedback(feedback._id);

      if (result.success) {
        const updatedFeedbacks = feedbacks.filter(
          (item) => item._id !== feedback._id
        );
        setFeedbacks(updatedFeedbacks);
        toast.success("Feedback removido com sucesso!");
        console.log("Feedback removido com sucesso!");
      } else {
        toast.error("Erro ao excluir feedback: " + result.message);
        console.error("Erro ao excluir feedback:", result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className='mt-5 p-0'>
        <Table responsive striped hover variant='white'>
          <thead className='table-primary'>
            <tr>
              <th>
                <input type='checkbox' name='allFeedbacks' />
              </th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Data de Criação</th>
              <th>Status</th>
              <th colSpan={2}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6}>Carregando...</td>
              </tr>
            ) : Array.isArray(feedbacks) && feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td>
                    <input
                      type='checkbox'
                      data-id={feedback._id}
                      onChange={() => handleRemoveFeedback(feedback)}
                    />
                  </td>
                  <td>{feedback.subject}</td>
                  <td>{feedback.description}</td>
                  <td>{format(new Date(feedback.createdAt), "dd/MM/yyyy")}</td>
                  <td>
                    <IconDestaque
                      iconName='bi bi-chat-heart-fill'
                      estilo={{ fontSize: "150%", color: "red" }}
                    />
                  </td>
                  <td>
                    <button
                      className='border-0 bg-transparent'
                      onClick={() => handleRemoveFeedback(feedback)}>
                      <i className='bi bi-x-circle-fill pe-2' /> Remover
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <p className='text-info fw-bold ps-5 py-3'>
                    Nenhum feedback disponível.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
      <ToastContainer position='top-center' autoClose={5000} hideProgressBar />
    </>
  );
};

export default FeedbackTable;
