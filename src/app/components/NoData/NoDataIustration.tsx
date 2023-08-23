
import React from "react";

import styled from 'styled-components';
import NoDataIllustration from "@app/components/Illustration/NoDataIllustration";
import { useTranslation } from "react-i18next";

const NoData = styled.div`
  width: 5rem;
  padding: 1.1rem;
  background: var(--black-25);
  border-radius: 1rem;
  margin:0 auto;
`;
export default function NoDataIustration({
    data,
    className = "",
    isLoading = false
}: INoDataIustration) {

    const { t } = useTranslation()


    return (
        <>

            {(data?.length === 0 || !data) && !isLoading &&
                <div className={className}>
                    <NoData><NoDataIllustration></NoDataIllustration></NoData>
                    <p className='mt-3 text-center text-not-found'>{t('Data not found')}</p>

                </div>
            }


        </>
    )
}

interface INoDataIustration {
    data?: any
    className?: string
    isLoading: boolean
}