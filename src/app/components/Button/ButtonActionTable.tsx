import React from 'react';
import { Form } from 'react-bootstrap';

export default function ButtonActionTable({
    className = "justify-content-end me-1",
    handleEdit,
    handleDelete,
    data
}: IButtonStatus) {

    return (
        <>
            <Form.Group className={` d-flexs ${className}`}>

                {handleEdit &&
                    <div className='text-left pointer' onClick={() => handleEdit(data)}>
                        <i className='fas fa-pencil'></i> <u>Edit</u>
                    </div>
                }

                {handleDelete &&
                    < div onClick={() => handleDelete(data)}>
                        <i className='fas fa-close pointer'></i> <u>Hapus</u>
                    </div>
                }



            </Form.Group >
        </>
    );
}
interface IButtonStatus {
    className?: string
    data: any
    handleEdit?: any
    isBtnSM?: boolean
    handleDelete?: any
}