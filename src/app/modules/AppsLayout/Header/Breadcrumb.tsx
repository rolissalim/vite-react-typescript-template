import { LazyImage } from '@app/components';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Breadcrumb() {
    const { currentPage } = useSelector((state: any) => state.ui)
    const { t } = useTranslation()

    return (
        <React.Fragment>
            <Row>
                <Col md={12} >
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between" >
                        <div className='d-flex jsutify-content-start'>
                            <div className="d-flex align-items-center me-1" style={{ height: "1.5rem" }}>
                                <LazyImage src="/static/icons/icon-breadcrum.png" className="fit-height" />
                            </div>
                            <h4 className="mb-sm-0 d-flex align-items-center" > {t(currentPage?.pageTitle)} </h4>
                        </div>
                        {currentPage?.pageTitle &&
                            <div className="page-title-right" >
                                <ol className="breadcrumb m-0" >
                                    <li className="breadcrumb-item" > {t(currentPage?.title)} </li>


                                    {currentPage?.pageSubTitle &&
                                        <li className="breadcrumb-item" > {t(currentPage?.pageSubTitle)} </li>
                                    }
                                    <li className={`breadcrumb-item active`} >
                                        <Link to="#" >
                                            {t(currentPage?.pageTitle)}
                                        </Link>
                                    </li >
                                </ol>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}
