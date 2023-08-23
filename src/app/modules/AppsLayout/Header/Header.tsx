import React from 'react';
import { useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
  const { credentials } = useSelector((state: any) => state.auth);


  console.log("credentials", credentials);
  return (
    <React.Fragment>
      <header id="page-topbar" className="">
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">

              <div className="d-flexs justify-content-starts">
                <div className="fs-4 fs-weight">Stock Items</div>
              </div>

            </div>

            <div className="d-flex align-items-center">
              {credentials &&
                <ProfileDropdown />
              }
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}
