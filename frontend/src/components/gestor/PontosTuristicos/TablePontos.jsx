import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useState } from "react";
import Spin from "../../Spin";
import "./pontos.css";

const TablePontos = ({ PTData, isLoading, onDelete }) => {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container className='mt-5 p-0 main-section table-container'>
        <div className='table-container'>
          <Table responsive striped hover variant='white'>
            <thead className='table-primary'>
              <tr>
                <th>
                  <input type='checkbox' name='allPts' />
                </th>
                <th>Imagem</th>
                <th>Local</th>
                <th>Morada</th>
                <th>Coordenadas</th>
                <th>Horário</th>
                <th>Descrição</th>
                <th>Telefone</th>
                <th>Telemóvel</th>
                <th>Website</th>
                <th>Acessibilidade</th>
                <th>QrCode</th>
                <th>Tipo de Ponto</th>
                <th>Pontos Associados</th>
                <th colSpan={2}>Ações</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr colSpan={15}>
                  <td colSpan={15}>
                    <Spin />
                  </td>
                </tr>
              </tbody>
            ) : Array.isArray(PTData) && PTData.length > 0 ? (
              <tbody className='align-center data-rows'>
                {PTData.map((pontos) => (
                  <tr key={pontos._id}>
                    <td>
                      <input type='checkbox' data-id={pontos._id} />
                    </td>
                    <td>
                      <div className='d-flex align-items-center gap-3'>
                        <Image
                          src={`http://${process.env.REACT_APP_API}/uploads/${pontos.imgUrl}`}
                          alt=''
                          height={50}
                          width={50}
                        />
                      </div>
                    </td>
                    <td>{pontos.local}</td>
                    <td>{pontos.morada}</td>
                    <td>{pontos.coordenadas}</td>
                    <td>{pontos.horario}</td>
                    <td>{pontos.descricao}</td>
                    <td>{pontos.telefone}</td>
                    <td>{pontos.telemovel}</td>
                    <td>{pontos.website}</td>
                    <td>{pontos.acessibilidade}</td>
                    <td>{pontos.qrcode}</td>
                    <td>{pontos.tipo}</td>
                    <td>{pontos.pontosAssociados}</td>
                    <td>
                      <button
                        className='border-0 bg-transparent'
                        onClick={() => {
                          setModalData({});
                          setModalData(pontos);
                          handleShow();
                        }}>
                        <i className='bi bi-x-circle-fill pe-2' /> Remover
                      </button>
                    </td>
                    <td>
                      <Link to={`/gestor/pontos_turisticos/${pontos._id}`}>
                        <i className='bi bi-gear pe-2' />
                        Modificar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={14}>
                    <p className='text-info fw-bold ps-5 py-3'>
                      De momento ainda não há Pontos Turísticos criados.
                    </p>
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>
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
            <h4 className='text-danger'>Cuidado! Ação irrevertível.</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Tem a certeza que quer remover{" "}
            <span className='text-primary text-capitalize fw-bold'>
              {modalData.local}
            </span>{" "}
            como Ponto Turístico?
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

export default TablePontos;
