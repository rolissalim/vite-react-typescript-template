import React, { useEffect } from 'react'

import { Route, Routes, useLocation } from 'react-router-dom';

import AppsLayout from "@app/modules/AppsLayout/AppsLayout";
import { useDispatch } from 'react-redux';
import Error404 from '@app/components/Error/Error404';
import { changeHTMLAttribute } from '@app/helper/layout.helper';
import { setActiveFilters, setActivePaging, setSearchKeyword } from '@app/store/reducers/ui';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
const ItemPage = React.lazy(() => import("@app/pages/DataMaster/Item/ItemPage"))


/**
 * NOTE: ROUTING APPS PAGE ADA DISINI
 * @returns 
 */
export default function AppsPage(): React.ReactElement {
  const location = useLocation()
  const dispatch = useDispatch()


  useEffect(() => {
    document.body.classList.remove("overflow-hidden");
    document.body.removeAttribute('style');
    changeHTMLAttribute("data-layout-style", "default")

    return () => {
      document.body.style.overflow = "hidden"
    }
  }, [])

  useEffect(() => {
    /** ERROR CHANGE PASS WARNING */
    dispatch(setActivePaging(0))
    dispatch(setActiveFilters(null));
    dispatch(setSearchKeyword(null));
  }, [location.pathname])

  return (
    <>
      <Routes>
        <Route path="" element={<AppsLayout />}>
          <Route path="/home" element={<React.Suspense fallback={<TopBarLoader />}><ItemPage /></React.Suspense>} />
          <Route path="*" element={<Error404 type="admin" />}></Route>
        </Route>
      </Routes>
    </>
  )
}