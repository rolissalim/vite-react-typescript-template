import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header/Header';

import { AppProvider } from '@app/context/AppContext';
import { Container } from 'react-bootstrap';
// import Breadcrumb from './Header/Breadcrumb';

/**  COMBINE LAYOUT APPS ADA DISINI */


function AppsLayout() {

  return (
    <React.Fragment>
      <AppProvider>
        <div id="layout-wrapper">
          <Header />
          {/* <Sidebar /> */}

          <div className="main-content">

            <div className="page-content">
              <Container fluid>

                {/* <Breadcrumb /> */}
                <Outlet />

              </Container>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
        {/* <RightSidebar /> */}
      </AppProvider>
    </React.Fragment>

  );
}

export default AppsLayout;
