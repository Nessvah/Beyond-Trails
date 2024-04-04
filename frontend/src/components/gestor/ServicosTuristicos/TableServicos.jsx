import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Spin from "../../Spin";
import "../PontosTuristicos/pontos.css";
import { partnerRole } from "../../../helpers/enums";

const TableServicos = ({
  STData,
  isLoading,
  onApprove,
  onDisapprove,
  onAnalyze
}) => {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleClose = () => {
    setShow(false);
  };

  const handleDisapproveClick = (servicoId) => {
    setModalData(STData.find((servico) => servico._id === servicoId));
    setShow(true);
  };

  return (
    <>
      <Container className='mt-5 p-0 main-section table-container'>
        <div className='table-container'>
          <Table responsive striped hover variant='white'>
            <thead className='table-primary'>
              <tr>
                <th>Nome do Serviço</th>
                <th>NIF</th>
                <th>Tipo de Entidade</th>
                <th>Morada</th>
                <th>Código Postal</th>
                <th>Cidade</th>
                <th>Telefone</th>
                <th>Telemóvel</th>
                <th>Website</th>
                <th>Horário</th>
                <th>Descrição</th>
                <th>Email</th>
                <th>Imagem</th>
                <th>Titularidade</th>
                <th>Representante</th>
                <th>Estado de Aprovação</th>
                <th colSpan={2}>Aprovação</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr colSpan={21}>
                  <td colSpan={21}>
                    <Spin />
                  </td>
                </tr>
              </tbody>
            ) : Array.isArray(STData) && STData.length > 0 ? (
              <tbody className='align-center data-rows'>
                {STData.map((servicos) => (
                  <tr key={servicos._id}>
                    <td>{servicos.name}</td>
                    <td>{servicos.nif}</td>
                    <td>{servicos.tipoEntidade}</td>
                    <td>{servicos.morada}</td>
                    <td>{servicos.codigoPostal}</td>
                    <td>{servicos.cidade}</td>
                    <td>{servicos.telefone}</td>
                    <td>{servicos.telemovel}</td>
                    <td>{servicos.website}</td>
                    <td>{servicos.horario}</td>
                    <td>{servicos.descricao}</td>
                    <td>{servicos.email}</td>
                    <td>
                      <div className='d-flex align-items-center gap-3'>
                        <Image
                          src={servicos.imgUrl}
                          alt=''
                          height={50}
                          width={50}
                        />
                      </div>
                    </td>
                    <td>{servicos.urlTitularidade}</td>
                    <td>{servicos.urlRepresentante}</td>
                    <td>
                      <div className='approval-status'>
                        {servicos.isApproved === partnerRole.Pendente && (
                          <div className='btn'>Pendente</div>
                        )}
                        {servicos.isApproved === partnerRole.Analise && (
                          <div className='analise'>Em Análise</div>
                        )}
                        {servicos.isApproved === partnerRole.Aprovado && (
                          <div className='btn btn-primary'>Aprovado</div>
                        )}
                        {servicos.isApproved === partnerRole.Rejeitado && (
                          <div className='btn btn-secondary'>Rejeitado</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div>
                        {(servicos.isApproved == partnerRole.Pendente ||
                          servicos.isApproved == partnerRole.Analise) && (
                          <button
                            className='btn btn-primary botaoServico'
                            onClick={() => onApprove(servicos._id)}>
                            Aprovar
                          </button>
                        )}
                        {(servicos.isApproved == partnerRole.Pendente ||
                          servicos.isApproved == partnerRole.Analise) && (
                          <button
                            className='btn btn-secondary botaoServico'
                            onClick={() => handleDisapproveClick(servicos._id)}>
                            Não Aprovar
                          </button>
                        )}
                        {servicos.isApproved == partnerRole.Pendente && (
                          <button
                            className='btn analise botaoServico'
                            onClick={() => onAnalyze(servicos._id)}>
                            Analisar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={14}>
                    <p className='text-info fw-bold ps-5 py-3'>
                      De momento ainda não há Serviços Turísticos registados.
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
            Tem a certeza que quer não aprovar{" "}
            <span className='text-primary text-capitalize fw-bold'>
              {modalData.name}
            </span>{" "}
            como Serviço Turístico?
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
              onDisapprove(modalData._id);
              handleClose();
            }}>
            Não aprovar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableServicos;
