
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { v4 as uuid } from 'uuid';

const icons: any = {
  facebook: 'fab fa-facebook',
  google: 'fab fa-google',
  googlePlus: 'fab fa-google-plus',
  print: 'fa fa-print',
  show: 'fas fa-file-powerpoint',
  search: 'fas fa-search',
  update: 'fas fa-paper-plane',
  reload: 'fas fa-sync-alt',
  delete: 'fas fa-trash',
  edit: 'fas fa-pencil-alt',
  check: 'fas fa-check',
  lock: 'fas fa-lock',
  user: 'fas fa-user',
  userJaringan: 'fas fa-users-class',
  userDelete: 'fas fa-users-slash',
  add: 'fas fa-plus-circle',
  broadcast: 'fas fa-bullhorn',
  // add: 'fas fa-plus',
  report: 'fas fa-file',
  close: 'fa fa-close',
  settings: 'far fa-cog',
  tools: 'fad fa-tools',
  tree: "far fa-folder-tree",
  filter: "fas fa-filter",
  detail: "fas fa-eye",
};

interface IAppButton {
  children?: any;
  isLoading?: boolean;
  isOverLay?: boolean;
  icon?: any;
  variant?: any;
  disabled?: any;
  iconOnly?: any;
  type?: any;
  onClick?: any;
  className?: any;
  placement?: any;
  textTooltip?: string;
  otherProps?: any
}
const AppButton = ({
  children,
  isLoading,
  icon,
  variant = 'primary',
  disabled,
  iconOnly,
  type = 'button',
  isOverLay = false,
  placement = "right",
  textTooltip = "",
  ...otherProps
}: IAppButton) => {
  let spinnerTemplate;
  let iconTemplate;

  if (isLoading) {
    spinnerTemplate = (
      <Spinner
        // className='ms-1'
        as='span'
        animation='border'
        size='sm'
        role='status'
        aria-hidden='true'
      />
    );
  }

  if (icon) {
    const iconClass = icons[icon] ? icons[icon] : icon;
    iconTemplate = <i className={`${iconClass} ${iconOnly ? '' : 'me-2'}`} />;
  }

  return (
    <>
      {
        isOverLay === true &&
        <OverlayTrigger
          placement={placement}
          delay={{ show: 250, hide: 400 }
          }
          overlay={
            <Tooltip id={uuid()}>
              {textTooltip}
            </Tooltip >
          }
        >
          <Button type={type} {...otherProps} variant={variant} disabled={isLoading || disabled}>
            {iconTemplate}
            {children}
            {spinnerTemplate}
          </Button>
        </OverlayTrigger >

      }
      {
        isOverLay == false &&
        <Button type={type} {...otherProps} variant={variant} disabled={isLoading || disabled}>
          {iconTemplate}
          {children}
          {spinnerTemplate}
        </Button>

      }

    </>
  );
};

export default AppButton;
