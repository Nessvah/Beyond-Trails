import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../hook/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalUpdatePerfil({ show, onHide, title }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const user = useAuth();

  const resetPasswordUser = async (newPassword, confirmPassword) => {
    const requestData = {
      newPassword,
      confirmPassword
    };

    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_API}/api/users/reset-password-user/${user.userId}`,
        requestData,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao redefinir a senha:", error);
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw "Network request failed.";
      } else {
        throw error;
      }
    }
  };

  const handleConfirm = async () => {
    if (newPassword === "" || confirmPassword === "") {
      toast.error("Por favor, preencha ambos os campos de senha.");
    } else if (newPassword === confirmPassword) {
      try {
        const response = await resetPasswordUser(newPassword, confirmPassword);
        toast.success(response.message);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("A nova senha e a confirmação de senha não correspondem.");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='mb-4'>
          <label>Nova Senha</label>
          <br />
          <input
            type='password'
            placeholder='Nova Senha'
            value={newPassword}
            style={{
              width: "80%",
              marginTop: "1rem"
            }}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='mb-2'>Confirmar Senha</label>
          <br />
          <input
            type='password'
            placeholder='Confirmar Senha'
            value={confirmPassword}
            style={{
              width: "80%",
              marginTop: "1rem"
            }}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Fechar
        </Button>
        <Button variant='primary' onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' autoClose={5000} hideProgressBar />
    </Modal>
  );
}

export default ModalUpdatePerfil;
