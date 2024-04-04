//é responsável por exibir uma tabela de eventos e permitir a exclusão dos mesmos individualmente. Usa um modal para confirmar a exclusão e é capaz de lidar com eventos vazios.
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spin from "../../../Spin";
import { useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../../../../assets/images/eventos/no_image.jpg";

const EventsTable = ({ eventsData, isLoading, onDelete }) => {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});

  //função que fecha o modal ao definir o estado show como false.
  const handleClose = () => setShow(false);
  // abre o modal ao definir o estado show como true
  const handleShow = () => setShow(true);

  console.log(eventsData);

  return (
    <>
      <Container className='mt-5 p-0'>
        <Table responsive striped hover variant='white'>
          <thead className='table-primary'>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Local</th>
              <th>Hora</th>
              <th>bilhete</th>
              <th>Imagem</th>
              <th>Cartaz</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          {/* Dependendo do valor de isLoading, o componente renderiza um indicador de carregamento (um spinner) se os dados não estão a ser carregados. */}
          {isLoading ? (
            <tbody>
              <tr colSpan={7}>
                <td colSpan={7}>
                  <Spin />
                </td>
              </tr>
            </tbody>
          ) : Array.isArray(eventsData) && eventsData.length > 0 ? (
            <tbody className='align-center'>
              {eventsData.map((event) => (
                <tr key={event._id}>
                  <td>{event.nome}</td>
                  <td>{event.shortDescription}</td>
                  <td>{event.local}</td>
                  <td>{event.hora}</td>
                  <td>{event.bilhete}</td>
                  <td>
                    <Image
                      src={`http://${process.env.REACT_APP_API}/uploads/${event.image}`}
                      alt=''
                      height={50}
                      width={50}
                    />
                  </td>

                  <td>
                    {event.image ? (
                      <Image
                        src={`http://${process.env.REACT_APP_API}/uploads/${event.cartazUrl}`}
                        alt=''
                        height={50}
                        width={50}
                      />
                    ) : (
                      <Image src={image1} alt='' height={50} width={50} />
                    )}
                  </td>

                  <td>
                    <button
                      className='border-0 bg-transparent'
                      onClick={() => {
                        setModalData({});
                        setModalData(event);
                        handleShow();
                      }}>
                      <i className='bi bi-trash-fill'></i>
                    </button>
                  </td>
                  <td>
                    <Link to='/gestor/eventos/edit' state={event}>
                      <i className='bi bi-pencil-fill'></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={7}>
                  <p className='text-info fw-bold ps-5 py-3'>
                    De momento ainda não há eventos criados.
                  </p>
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </Container>

      <Modal
        key={modalData._id}
        centered
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className='text-danger'>Atenção!</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Tem a certeza que quer remover{" "}
            <span className='text-primary text-capitalize fw-bold'>
              {modalData.nome}
            </span>
            , magerico ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='outline-primary'
            className='btn main-btn'
            onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant='danger'
            className='btn main-btn'
            onClick={() => {
              onDelete(modalData._id);
              handleClose();
            }}>
            Apagar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EventsTable;
