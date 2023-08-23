import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

type Props = {
  modalProps: any;
  callbackmodal?: any;
  children?: any;
  ids?: string;
  declineSubmited?: boolean;
  closeButton?: boolean,
  isHeader?: boolean
  classHeader?: string
};

const ModalForm: FC<Props> = ({
  modalProps,
  children,
  ids = 'id',
  declineSubmited = true,
  closeButton = true,
  isHeader= true,
  classHeader="mx-3"
  
}) => {
  let [searchParams] = useSearchParams();
  const { callbackForm } = useSelector((state: any) => state.ui);

  const id = searchParams.get(ids);

  const [modal, setModal] = useState<any>({
    show: id ? true : false,
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
    setModal({ ...modal, ...modalProps });
  }, [modalProps]);

  const modalDecline = () => {
    setModal({ ...modal, show: false });
  };

  useEffect(() => {
    if (callbackForm && declineSubmited) {
      modalDecline()
    }
  }, [callbackForm])


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
      {
          isHeader &&
          <Modal.Header closeButton={closeButton} className={`${classHeader} pb-0`}>
            <Modal.Title>{modal?.title}</Modal.Title>
          </Modal.Header>
      }
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
