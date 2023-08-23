import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function BreadcrumCustom() {
    const { currentPage } = useSelector((state: any) => state.ui)

    return (
        <React.Fragment>
            <Row>
                <Col md={12} >
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between" >
                        <h4 className="mb-sm-0" > {currentPage?.title} </h4>
                        {currentPage?.pageTitle &&
                            <div className="page-title-right" >
                                <ol className="breadcrumb m-0" >
                                    <li className="breadcrumb-item" >
                                        <Link to="#" >{currentPage?.pageTitle} </Link></li >
                                    <li className="breadcrumb-item active" > {currentPage?.title} </li>
                                </ol>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}
