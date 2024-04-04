import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ButtonLaranja from "../../../BotaoLaranja/ButtonLaranja";

import Modal from "react-bootstrap/Modal";
import "./css/Table.css";
import { Link } from "react-router-dom";
import image1 from "../../../../assets/images/rewards/coupon.png";
import { format } from "date-fns";
const PromotionsTable = ({ promotionsData, isLoading, onDelete }) => {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [pageSize, setPageSize] = useState(7); // tamanho de página inicial

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePageChange = (paginationModel) => {
    setPageSize(paginationModel.pageSize);
  };
  let mappedPromotionsData = [];
  if (promotionsData) {
    // Verifica se existem promoções
    if (promotionsData.length > 0) {
      mappedPromotionsData = promotionsData.map((promotion) => ({
        ...promotion,
        id: promotion._id
      }));
    } else {
      // Se não houver promoções, exibe a mensagem 'Nenhuma promoção encontrada'
      return <p>Nenhuma promoção encontrada</p>;
    }
  } else {
    // Se promotionsData for indefinido ou nulo, mostra o carregamento ou algo similar
    if (isLoading) {
      return <p>Carregando...</p>;
    } else {
      return <p>Nenhuma promoção encontrada</p>;
    }
  }

  return (
    <>
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
              {modalData.promotionName}
            </span>{" "}
            como promoção?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <ButtonLaranja label='Cancelar' onClick={handleClose} />
          <ButtonLaranja
            label='Apagar'
            onClick={() => {
              onDelete(modalData._id);
              handleClose();
            }}
          />
        </Modal.Footer>
      </Modal>

      <DataGrid
        rows={mappedPromotionsData}
        columns={[
          {
            field: "selection",
            headerClassName:
              "header-large-font d-flex text-center justify-content-center",
            cellClassName: "cell-large-font text-center justify-content-center",
            headerName: <input type='checkbox' name='allPromotions' />,
            renderCell: (params) => (
              <input type='checkbox' name={`row-${params.row.id}`} />
            )
          },
          // {
          //   field: "promotionName",
          //   headerName: "Nome",
          //   flex: 1,
          //   headerClassName:
          //     "header-large-font d-flex text-center justify-content-center p-4",
          //   cellClassName: "cell-large-font justify-content-start p-4",
          //   renderCell: (params) => (
          //     <div className='d-flex align-items-center gap-2'>
          //       <Image src={image1} alt='' height={50} width={50} />
          //       <div className='info'>
          //         <p className='mb-0 mt-2'>{params.row.promotionName}</p>
          //       </div>
          //     </div>
          //   )
          // },
          {
            field: "promotionName",
            headerName: "Nome",
            flex: 1,
            headerClassName:
              "header-large-font d-flex text-center justify-content-center p-4",
            cellClassName: "cell-large-font justify-content-start p-4",
            renderCell: (params) => (
              console.log(params.row.image),
              (
                <div className='d-flex align-items-center gap-2'>
                  {params.row.image ? (
                    // se houver imagem na base de dados, exiba-a
                    // <img src={params.row.image} alt='' height={50} width={50} />
                    <img
                      src={`http://${process.env.REACT_APP_API}/uploads/${params.row.image}`}
                      alt=''
                      height={50}
                      width={50}
                    />
                  ) : (
                    // caso contrário
                    <img src={image1} alt='' height={50} width={50} />
                  )}

                  <div className='info'>
                    <p className='mb-0 mt-2'>{params.row.promotionName}</p>
                  </div>
                </div>
              )
            )
          },
          {
            field: "description",
            headerName: "Descrição",
            flex: 1,
            headerClassName:
              "header-large-font d-flex text-center justify-content-center p-4",
            cellClassName: "cell-large-font justify-content-start p-4"
          },
          {
            field: "startDate",
            headerName: "Data de Início",
            flex: 1,
            headerClassName:
              " header-large-font d-flex text-center justify-content-center p-4 ",
            cellClassName: "cell-large-font justify-content-start p-4",
            valueFormatter: (params) => {
              const date = new Date(params.value);
              return format(date, "dd/MM/yyyy");
            }
          },
          {
            field: "endDate",
            headerName: "Data de Término",
            flex: 1,
            headerClassName:
              "header-large-font d-flex text-center justify-content-center p-4 ",
            cellClassName: "cell-large-font  justify-content-start p-4",
            valueFormatter: (params) => {
              const date = new Date(params.value);
              return format(date, "dd/MM/yyyy");
            }
          },
          {
            field: "requiredPoints",
            headerName: "Pontos Necessários",
            flex: 1,
            headerClassName:
              "header-large-font d-flex text-center justify-content-center p-4",
            cellClassName: "cell-large-font justify-content-start p-4"
          },
          {
            field: "actions",
            headerName: "Ações",
            headerClassName:
              " header-large-font d-flex text-center justify-content-center p-4",
            cellClassName: "cell-large-font  justify-content-start p-4",
            flex: 1,
            renderCell: (params) => (
              <>
                <ButtonLaranja
                  label='Remover'
                  onClick={() => {
                    setModalData({});
                    setModalData(params.row);
                    handleShow();
                  }}
                />
                <Link to={`/parceiro/promocoes/${params.row.id}`}>
                  <i className='bi bi-gear pe-2' />
                  Modificar
                </Link>
              </>
            )
          }
        ]}
        pageSize={pageSize}
        pagination
        loading={isLoading}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PromotionsTable;
