import React from "react";
import { useTranslation } from "react-i18next";
interface ILoader {
    loader: any
}
export default function Loader({
    loader
}: ILoader) {
    const { t } = useTranslation()
    const LdsSpinner = () => {
        if (loader?.Loading) {
            return (
                <div className="lds-spinner text-danger">
                    <i className="fad fa-spinner-third fa-spin fa-lg"></i>
                </div>
            )
        } else if (loader?.NoData && !loader?.Loading) {
            return (
                <>
                    <div className="no-result">{loader?.Text ? loader?.Text : t('Data not found')}</div>
                </>
            )
        }
    }

    const LdsRing = () => {
        if (loader?.Loading) {
            return (
                <div className="lds-ring  text-danger">
                    <i className="fad fa-spinner fa-spin fa-lg"></i>
                </div>
            )
        } else if (loader?.NoData && !loader?.Loading) {
            return (
                <>
                    <div className="no-result">{loader?.Text ? loader?.Text : t('Data not found')}</div>
                </>
            )
        }
    }

    const renderLoader = () => {
        switch (loader?.Type) {
            case 'lds':
                return LdsSpinner();
                break;
            case 'lds-ring':
                return LdsRing();
                break;
            default:
                return LdsRing();
                break;
        }
    }

    return <>{renderLoader()}</>
}