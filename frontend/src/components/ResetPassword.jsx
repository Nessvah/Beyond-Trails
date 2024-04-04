import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyCredentials } from "../utils/apiCalls.mjs";
import Spin from "./Spin";
import { CenteredModal } from "./Modals/CenteredModal";

function ResetPassword() {
  const { id, token } = useParams();

  // set the response that the server sends back
  const [resp, setResp] = useState(null);
  // handle open/close modal for entering an email if the user
  // asks for a reset
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    async function sendCredentialsToServer(id, token) {
      const resp = await verifyCredentials(id, token);

      setResp(resp);
    }

    sendCredentialsToServer(id, token);
  }, [token]);

  async function updatePwd() {}
  return (
    <div className='row my-5'>
      {resp ? (
        <div className='col-auto mx-auto'>
          <h1>{resp.status}</h1> <p>{resp.message}</p>
        </div>
      ) : (
        <Spin text='Aguarde enquanto verificamos o acesso...' />
      )}
    </div>
  );
}

export default ResetPassword;
