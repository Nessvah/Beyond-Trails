import { useState } from "react";
import "./galeria.css";

import imagemHeader from "../../assets/images/galeria/galeria-outra--.png";
import Header from "../HeaderComp/Header";
const images = [
  require("../../assets/images/galeria/galeria6.png"),
  require("../../assets/images/galeria/galeria5.png"),
  require("../../assets/images/galeria/galeria4.png"),
  require("../../assets/images/homepage/imagem14.png"),
  require("../../assets/images/homepage/imagem4.png"),
  require("../../assets/images/homepage/imagem5.png"),
  require("../../assets/images/homepage/imagem1.png"),
  require("../../assets/images/homepage/imagem10.png"),
  require("../../assets/images/homepage/imagem9.png"),
  require("../../assets/images/homepage/imagem2.png"),
  require("../../assets/images/homepage/imagem3.png"),
  require("../../assets/images/homepage/imagem13.png"),
  require("../../assets/images/homepage/imagem11.png"),
  require("../../assets/images/galeria/galeria1.png"),
  require("../../assets/images/galeria/galeria7.png"),
  require("../../assets/images/homepage/imagem12.png"),
  require("../../assets/images/homepage/imagem6.png"),
  require("../../assets/images/homepage/imagem8.png")
];

function ImageGallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div className='image-gallery main-section pb-5'>
      <div className='gallery-content '>
        <div className='container col-7 mx-auto'>
          <div className='row'>
            {/* <Header className='Galeria img src={imagemHeader}'></Header> */}
            <Header heading='Galeria' imgUrl={imagemHeader} />
            {/* <div className='col-md-6 text-primary text-center titulo'>
              <h1 className='m-5 p-5 text-success'>Galeria</h1>
            </div>
            <div className='col-md-6 imagem '>
              <img src={imagemHeader} alt='imagem ilustrativa' />
            </div> */}
          </div>
        </div>
      </div>

      <div className='grid-container pt-5'>
        <div className='thumbnail-gallery'>
          {images.map((image, index) => (
            <div
              key={index}
              className='thumbnail'
              onClick={() => openLightbox(index)}>
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      {selectedImageIndex !== null && (
        <Modal
          currentImage={selectedImageIndex}
          images={images}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
}

function Modal({ currentImage, images, onClose, onNext, onPrev }) {
  return (
    <div
      className='modal fade show'
      style={{ display: "block" }}
      tabIndex='-1'
      role='dialog'>
      <div className='modal-dialog modal-dialog-centered'>
        <div
          className='modal-content'
          style={{
            borderColor: "primary",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderWidth: "2px",
            borderStyle: "solid"
          }}>
          <div
            className='modal-body'
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderColor: "primary",
              borderWidth: "1px",
              borderStyle: "solid"
            }}>
            <span
              className='close text-secondary'
              style={{
                position: "absolute",
                fontSize: "3rem",
                top: "5%",
                right: "5%",
                padding: "0",
                margin: "0",
                cursor: "pointer"
              }}
              onClick={onClose}>
              &times;
            </span>

            <button
              type='button'
              className='btn btn-secondary'
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)"
              }}
              onClick={onPrev}>
              <i className='bi bi-chevron-compact-left '></i>
            </button>
            <img
              src={images[currentImage]}
              alt={`Imagem ${currentImage + 1}`}
              style={{
                width: "100%",
                height: "500px"
              }}
            />
            <button
              type='button'
              className='btn btn-secondary'
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)"
              }}
              onClick={onNext}>
              <i className='bi bi-chevron-compact-right '></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;
