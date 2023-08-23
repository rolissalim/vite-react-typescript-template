import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Icon = styled.div`
  font-size: 2rem;
`;
const Desc = styled.p`
  line-height: 1;
`;

type Props = {
  modalConfirmProps: any;
  callbackModalConfirm: any;
};

const ModalConfirm: FC<Props> = ({
  modalConfirmProps,
  callbackModalConfirm,
}) => {
  const { t } = useTranslation()
  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'far fa-trash',
    description: 'Delete this data',
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Yes',
    classApproved: 'primary',
    textDecline: 'No',
  });

  useEffect(() => {
    setModalConfirm({ ...modalConfirmProps });
  }, [modalConfirmProps]);

  const modalConfirmDecline = () => {
    setModalConfirm({ ...modalConfirm, show: false });
    callbackModalConfirm(false);
  };

  const modalConfirmAccept = () => {
    setModalConfirm({
      ...modalConfirm,
      show: false,
      approved: true,
    });
    callbackModalConfirm(true);
  };

  return (
    <Modal
      className='confirm-delete'
      centered
      backdrop='static'
      keyboard={false}
      size={modalConfirm.size || 'sm'}
      show={modalConfirm.show}
      onHide={modalConfirmDecline}
    >
      <Modal.Body className='p-4'>
        <Icon className='text-muted'>
          <i className={modalConfirm.icon} />
        </Icon>
        <h5 className='my-2'>{t(modalConfirm.description)}</h5>
        {modalConfirm.subDescriotion && (
          <Desc className='text-muted'>{t(modalConfirm.subDescriotion)}</Desc>
        )}

        <div className='d-flex justify-content-between mt-4'>
        {
          modalConfirm.textDecline && 
          <button className='btn me-2 w-50' onClick={modalConfirmDecline}>
            {t(modalConfirm.textDecline || 'No')}
          </button>
        }
          <button
            className={`btn btn-${modalConfirm.classApproved} ms-2 ${modalConfirm.textDecline ? 'w-50' : 'w-100' } text-white`}
            onClick={modalConfirmAccept}
          >
            {t(modalConfirm.textApproved || 'Yes')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalConfirm;
