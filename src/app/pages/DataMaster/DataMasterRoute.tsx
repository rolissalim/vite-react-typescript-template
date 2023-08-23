import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';


export default function DataMasterRoute() {
    return (
        <>
            <Routes>
                {/* <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><RWRoute /></React.Suspense>} /> */}
                <Route path="*" element={<Error404 type="admin" />}></Route>
            </Routes>
        </>
    )
}
