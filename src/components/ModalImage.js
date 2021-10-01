import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalImage = (props) => {
  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {props.title}
      </Modal.Header>
      <Modal.Body>
        <img className='modal-image' src={props.image} alt='poster' />
      </Modal.Body>
    </Modal>
  );
}

export default ModalImage;
