import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ImageModal = ({ images, showModal, handleCloseModal, handleImageClick, handleApiSubmit, selectedImage }) => {
  const [imageObjects, setImageObjects] = useState(['../photo/00000001_002.png']);
  useEffect(() => {
    const srcs = images.map((image) => {
      const byteCharacters = atob(image.file.buffer);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: image.file.mimetype });
      return {
        imageUrl: URL.createObjectURL(blob),
        imageId: image._id
      };
    });
    setImageObjects(srcs);


    return () => {
      srcs.forEach((src) => {
        URL.revokeObjectURL(src.inageUrl);
      });
    };
  }, [images]);


  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Patient X-Ray Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="image-gallery">
          {imageObjects.map((image, index) => (
            <img
              key={index}
              src={image.imageUrl}
              alt={`Gallery image ${index + 1}`}
              onClick={() => handleImageClick(image)}
              style={{
                border: selectedImage === image ? '2px solid blue' : '2px solid transparent',
                cursor: 'pointer',
                margin: '10px',
                width: '100px',
                height: '100px',
              }}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleApiSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;