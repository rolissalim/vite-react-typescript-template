import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FilterActionButton({
  textSubmit = "Filter",
  loading,
  onClickReset,
  className = "justify-content-between",
  top = "mt-4"
}: IFilterActionButton) {
  const navigate = useNavigate()
  const location = useLocation()



  const handleResetFilter = () => {
    navigate({ search: '' });

    if (onClickReset) onClickReset()
  }

  return (
    <Form.Group className={`${top} d-flex ${className}`}>
      <Button type='submit' variant='primary' className="me-2" disabled={loading}>
        {textSubmit}
      </Button>
      {onClickReset &&
        <Button type='button' variant='' onClick={handleResetFilter} disabled={location.search == ''}>
          Reset
        </Button>
      }

    </Form.Group>
  );
}

interface IFilterActionButton {
  loading?: boolean;
  onClickReset?: any
  textSubmit?: string
  className?: string
  top?: string
}
