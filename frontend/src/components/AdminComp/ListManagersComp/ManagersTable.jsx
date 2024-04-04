import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Spin from "../../Spin";

import { Link } from "react-router-dom";

// import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const ManagersTable = ({ managersData, isLoading, onDelete }) => {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container className='mt-5 p-0'>
        <Table responsive striped hover variant='white'>
          <thead className='table-primary'>
            <tr>
              <th>
                <input type='checkbox' name='allManagers' />
              </th>
              <th>Nome</th>
              <th>Estado da conta</th>
              <th>Distrito gerido</th>
              <th colSpan={2}>Ações</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr colSpan={6}>
                <td colSpan={6}>
                  <Spin />
                </td>
              </tr>
            </tbody>
          ) : Array.isArray(managersData) && managersData.length > 0 ? (
            <tbody className='align-center'>
              {managersData.map((managers) => (
                <tr key={managers._id}>
                  <td>
                    <input type='checkbox' data-id={managers._id} />
                  </td>
                  <td>
                    <div className='d-flex align-items-center gap-3'>
                      <Image
                        src={managers.imgUrl}
                        alt=''
                        height={50}
                        width={50}
                      />
                      <div className='info'>
                        <p className='mb-0 mt-2 '>
                          {managers.firstName} {managers.lastName}
                        </p>
                        <p className='lead'>{managers.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className='lead fs-3 text-danger align-middle'>
                      {managers.accountStatus}
                    </p>
                  </td>
                  <td>{managers.tourismDistrict}</td>
                  <td>
                    <button
                      className='border-0 bg-transparent'
                      onClick={() => {
                        setModalData({});
                        setModalData(managers);
                        handleShow();
                      }}>
                      <i className='bi bi-x-circle-fill pe-2' /> Remover
                    </button>
                  </td>
                  <td>
                    <Link to={`edit/${managers._id}`}>
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
                <td colSpan={6}>
                  <p className='text-info fw-bold ps-5 py-3'>
                    De momento ainda não há gestores criados.
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
            <h4 className='text-danger'>Cuidado! Ação irrevertível.</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Tem a certeza que quer remover{" "}
            <span className='text-primary text-capitalize fw-bold'>
              {modalData.firstName} {modalData.lastName}
            </span>{" "}
            como gestor/a do distrito de{" "}
            <span className='text-primary text-capitalize fw-bold'>
              {modalData.tourismDistrict}
            </span>
            ?
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

export default ManagersTable;
