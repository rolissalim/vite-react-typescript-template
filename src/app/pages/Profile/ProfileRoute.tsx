import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const ProfileUser = React.lazy(() => import("@app/pages/Profile/ProfileUser"))

export default function ProfileRoute() {
    return (
        <>
            <Routes>
                <Route path="user/:id" element={<React.Suspense fallback={<TopBarLoader />}><ProfileUser /></React.Suspense>} />
                <Route path="*" element={<Error404 type="admin" />}></Route>
            </Routes>
        </>
    )
}
