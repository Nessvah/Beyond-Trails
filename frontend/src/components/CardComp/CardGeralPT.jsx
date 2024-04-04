import "./card.scss";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/qr code/QR_Code_Example.svg.png";
import QrReader from "react-qr-scanner";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

function CardGeralPT({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [scannedQRCode, setScannedQRCode] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScannedQRCode(data);
      console.log("qr code", data);
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

  return (
    <div className='row gap-4 justify-content-between align-items-center'>
      {data.map((card, i) => {
        return (
          <article key={i + card.id} className='col-12 col-md-6 col-lg-5 bordo'>
            <div className='card mb-3 rounded-4 cartao'>
              <div className='row g-0'>
                <div className='col-md-4'>
                  <img
                    src={`http://${process.env.REACT_APP_API}/uploads/${card.imgUrl}`}
                    className='img-fluid rounded-start-4 h-100 '
                  />
                </div>
                <div className='col-md-8'>
                  <div className='card-body bg-white '>
                    <h5 className='card_title'>{card.local}</h5>
                    <p className='card_text'>{card.descricao}</p>
                    <div>
                      <Link
                        className='btn botao_cards botao'
                        to={`/pontos_turisticos/${card._id}`}>
                        Ver +
                      </Link>
                    </div>
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
              </div>
            </div>
          </article>
        );
      })}
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

export default CardGeralPT;
