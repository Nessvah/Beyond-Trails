import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export function CenteredModal(props) {
  const [email, setEmail] = useState(null);

  /**
   *  This function will allow us to keep track of the email
   * provided by the user until he submits it
   * @param {event} e
   */
  function emailChange(e) {
    setEmail({ email: e.target.value });
  }

  /**
   * we can pass the email from the input of the modal through
   * the function passed from the parent component and providing
   * it with the value that we want
   */
  const sendEmail = () => {
    props.onHide(email);
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <h4 className='text-primary'>Pedido de nova palavra passe</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='col-5'>
        <p>Insira o email associado à palavra-passe:</p>
        <input
          type='email'
          name='email'
          id='email'
          className='w-100'
          onChange={emailChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn main-btn' onClick={sendEmail}>
          Enviar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
