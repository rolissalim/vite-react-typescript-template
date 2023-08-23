import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

type Props = {
  modalProps: any;
  callbackmodal?: any;
  children?: any;
  ids?: string;
};

const ModalData: FC<Props> = ({
  modalProps,
  children,
}) => {

  const [modal, setmodal] = useState<any>({
    show: false,
    approved: false,
    size: modalProps?.size || 'sm',
    icon: '',
    title: 'Data',
    textApproved: 'Yes',
    classApproved: 'primary',
    textDecline: 'No',
    scrollable: false,
  });

  useEffect(() => {
    setmodal({ ...modal, ...modalProps });
  }, [modalProps]);

  const modalDecline = () => {
    setmodal({ ...modal, show: false });
  };



  return (
    <Modal
      className='confirm-delete'
      centered
      backdrop='static'
      keyboard={false}
      size={modal?.size || 'lg'}
      show={modal?.show}
      onHide={modalDecline}
      scrollable={modal?.scrollable}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modal?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalData;
