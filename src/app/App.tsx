import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/** PROTECTED ROUTE / GUARD */
import ProtectedRoute from "@app/routes/ProtectedRoute";

import TopBarLoader from "@app/components/Loader/TopBarLoader";
import Error404 from "@app/components/Error/Error404";
import NotificationPopup from '@app/components/Notification/NotificationPopup';
const Signin = React.lazy(() => import("@app/pages/Auth/SigninPage"))
const Index = React.lazy(() => import("@app/pages/index"))

function App(): React.ReactElement {

  return (
    <>
      <Router>
        <Routes>
          <Route
            path='signin'
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <Signin />
              </React.Suspense>
            }
          />
          <Route
            path='/*'
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<TopBarLoader />}>
                  <Index />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<Error404 />} />
        </Routes>
      </Router>
      <NotificationPopup />

    </>

  );
}

export default App;