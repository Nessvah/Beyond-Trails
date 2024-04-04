// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { validarCodigoVisitante } from "../../../utils/atualizarInfoPartner";
// import ButtonLaranja from "../../BotaoLaranja/ButtonLaranja";

// function QRCodeForm() {
//   const showSuccessToast = () => {
//     toast.success("Código QR válido", {
//       position: "top-right"
//     });
//   };

//   const showErrorToast = () => {
//     toast.error("Erro ao validar código QR", {
//       position: "top-right"
//     });
//   };

//   return (
//     <div>
//       <Formik
//         initialValues={{ qrCode: "" }}
//         validationSchema={Yup.object({
//           qrCode: Yup.string().required("O Código QR é obrigatório")
//         })}
//         onSubmit={async (values, { setSubmitting }) => {
//           try {
//             const response = await validarCodigoVisitante(values.qrCode);
//             console.log("Resposta de validarCodigoVisitante:", response);

//             showSuccessToast();
//           } catch (error) {
//             console.error("Erro ao validar código QR:", error);

//             showErrorToast();
//           }
//           setSubmitting(false);
//         }}>
//         <Form
//           className='bg-white customForm'
//           style={{
//             maxWidth: "85rem",
//             margin: "0 auto",
//             padding: "1.25rem",
//             boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//             borderRadius: "2rem",
//             marginBottom: "15rem"
//           }}>
//           <div className='container todo'>
//             <div className='row'>
//               <div className='col-md-12 form-group'>
//                 <div className='formGroup p-4 mt-5'>
//                   <label htmlFor='qrCode'>Código QR</label>
//                   <Field
//                     type='text'
//                     name='qrCode'
//                     className='form-control fs-3'
//                   />
//                   <ErrorMessage
//                     name='qrCode'
//                     component='div'
//                     className='text-danger'
//                   />
//                 </div>
//                 <ButtonLaranja label='Registar' type='submit' />
//               </div>
//             </div>
//           </div>
//           <ToastContainer autoClose={false} closeOnClick={false} />
//         </Form>
//       </Formik>
//     </div>
//   );
// }
import "./css/qrcode.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import QrReader from "react-qr-scanner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validarCodigoVisitante } from "../../../utils/atualizarInfoPartner";
import ButtonLaranja from "../../BotaoLaranja/ButtonLaranja";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function RegistoQRCode() {
  const [showModal, setShowModal] = useState(false);
  const [scannedQRCode, setScannedQRCode] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const showSuccessToast = () => {
    toast.success("Código QR válido", {
      position: "top-right"
    });
  };

  const showErrorToast = () => {
    toast.error("Erro ao validar código QR", {
      position: "top-right"
    });
  };

  const handleScan = (data) => {
    if (data) {
      setScannedQRCode(data);
      validarQRCode(data);
    }
  };

  const handleError = (error) => {
    console.error("Error:", error);
    showErrorToast();
  };

  const openCamera = () => {
    setShowModal(true);
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setShowModal(false);
    setIsCameraOpen(false);
  };

  const validarQRCode = async (qrCode) => {
    try {
      const response = await validarCodigoVisitante(qrCode);
      console.log("Resposta de validarCodigoVisitante:", response);
      showSuccessToast();
    } catch (error) {
      console.error("Erro ao validar código QR:", error);
      showErrorToast();
    }
  };

  const styleIcon = {
    backgroundImage: "linear-gradient(to right, #03E7FA, #007D93, #005068)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "10vw",
    paddingBottom: "16rem"
  };

  return (
    <div className='d-flex justify-content-center align-items-center pb-5'>
      <div style={{ width: "90%" }}>
        <Formik
          initialValues={{ qrCode: "" }}
          validationSchema={Yup.object({
            qrCode: Yup.string().required("O Código QR é obrigatório")
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await validarCodigoVisitante(values.qrCode);
              console.log("Resposta de validarCodigoVisitante:", response);
              showSuccessToast();
            } catch (error) {
              console.error("Erro ao validar código QR:", error);
              showErrorToast();
            }
            setSubmitting(false);
          }}>
          <Form
            className='bg-white customForm'
            style={{
              maxWidth: "85rem",
              margin: "0 auto",
              padding: "1.25rem",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "2rem",
              marginBottom: "15rem"
            }}>
            <div className='container todo'>
              <div className='row'>
                <div className='col-md-12 form-group '>
                  <div className='formGroup p-4 mt-5'>
                    <label htmlFor='qrCode'>Código QR</label>
                    <Field
                      type='text'
                      name='qrCode'
                      className='form-control fs-3'
                    />
                    <ErrorMessage
                      name='qrCode'
                      component='div'
                      className='text-danger'
                    />
                  </div>
                  <ButtonLaranja label='Registar' type='submit' />
                </div>
              </div>
            </div>
            <ToastContainer autoClose={false} closeOnClick={false} />
          </Form>
        </Formik>
      </div>

      <div style={{ width: "50%" }}>
        <div
          className='d-flex justify-content-start ps-5  ms-5 align-items-center'
          onClick={openCamera}>
          <i className='bi bi-qr-code' style={styleIcon}></i>
        </div>
        <Modal show={showModal} onHide={closeCamera} centered>
          <div className='header'>
            <Modal.Header closeButton>
              <h4 className='modal-title'>QR Code Scanner</h4>
            </Modal.Header>
          </div>
          <Modal.Body>
            {isCameraOpen && (
              <QrReader
                onScan={handleScan}
                onError={handleError}
                style={{ width: "100%" }}
              />
            )}
            {scannedQRCode && <p>Scanned QR Code: {scannedQRCode}</p>}
          </Modal.Body>
          <div className='header-footer'>
            <Modal.Footer>
              <ButtonLaranja onClick={closeCamera} label='Close' />
            </Modal.Footer>
          </div>
        </Modal>
        <ToastContainer autoClose={false} closeOnClick={false} />
      </div>
    </div>
  );
}

export default RegistoQRCode;
