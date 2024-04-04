import "./bigcard.scss";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import { locations } from "../../../helpers/enums";
import img1 from "../../../assets/images/qr code/QR_Code_Example.svg.png";
import { useState } from "react";
import QrReader from "react-qr-scanner";

function BigCardGeral({ cardData }) {
  const [showModal, setShowModal] = useState(false);
  const [scannedQRCode, setScannedQRCode] = useState(null);

  const goBack = () => {
    window.history.back();
  };

  const handleScan = (data) => {
    if (data) {
      setScannedQRCode(data);
    }
  };

  const handleError = (error) => {
    console.error("Error:", error);
  };

  const openCamera = () => {
    setShowModal(true);
  };

  const closeCamera = () => {
    setShowModal(false);
  };

  if (!cardData) {
    return <p>Information not found</p>;
  }

  return (
    <div className='big-card-container main-section'>
      <div className='big-card-content'>
        <div className='big-card-image'>
          <img
            src={`http://${process.env.REACT_APP_API}/uploads/${cardData.imgUrl}`}
            alt={cardData.local}
          />
        </div>
        <div className='big-card-details'>
          <h2 className='big-card-title text-secondary'>{cardData.local}</h2>
          <div className='big-card-description'>
            {cardData.morada && (
              <p className='text-black'>
                <span className='text-primary label'>Morada:</span>{" "}
                {cardData.morada}
              </p>
            )}
            {cardData.coordenadas && (
              <p className='text-black'>
                <span className='text-primary label'>Coordenadas:</span>{" "}
                {cardData.coordenadas}
              </p>
            )}
            {cardData.horario && (
              <p className='text-black'>
                <span className='text-primary label'>Horário:</span>{" "}
                {cardData.horario}
              </p>
            )}
            {cardData.descricao && (
              <p className='text-black'>
                <span className='text-primary label'>Descrição:</span>{" "}
                {cardData.descricao}
              </p>
            )}
            {cardData.telefone && (
              <p className='text-black'>
                <span className='text-primary label'>Telefone:</span>{" "}
                {cardData.telefone}
              </p>
            )}
            {cardData.website && (
              <p className='text-black'>
                <span className='text-primary label'>Website:</span>{" "}
                {cardData.website}
              </p>
            )}
            {cardData.telemovel && (
              <p className='text-black'>
                <span className='text-primary label'>Telemóvel:</span>{" "}
                {cardData.telemovel}
              </p>
            )}
            {cardData.acessibilidade && (
              <p className='text-black'>
                <span className='text-primary label'>Acessibilidade:</span>{" "}
                {cardData.acessibilidade}
              </p>
            )}
            {cardData.pontosAssociados && (
              <p className='text-black'>
                <span className='text-primary label'>Pontos Associados:</span>{" "}
                {cardData.pontosAssociados}
              </p>
            )}
          </div>
          <Button
            className='btn btn-secondary mt-5 col-6 goBack'
            onClick={goBack}>
            Voltar para{" "}
            {cardData.tipo === locations.CastelosMuseus
              ? "Castelos e Museus"
              : cardData.tipo === locations.PatrimonioReligioso
              ? "Património Religioso"
              : cardData.tipo === locations.PontosNaturais
              ? "Pontos Naturais"
              : null}
          </Button>
          <div className='qr-code-symbol'>
            <img
              src={img1}
              alt='QR Code Scanner'
              id='qr_reader'
              onClick={openCamera}
            />
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={closeCamera} centered>
        <Modal.Header closeButton>
          <Modal.Title>QR Code Scanner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QrReader
            onScan={handleScan}
            onError={handleError}
            style={{ width: "100%" }}
          />
          {scannedQRCode && <p>Scanned QR Code: {scannedQRCode}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeCamera}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BigCardGeral;
