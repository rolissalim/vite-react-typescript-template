import LazyImage from '@app/components/Image/LazyImage';
import { httpImage } from '@app/helper/string.helper';
import { logoutUser } from '@app/store/reducers/auth';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//import images
const ProfileDropdown = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { credentials } = useSelector((state: any) => state?.auth)

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/signin")
    }

    return (
        <React.Fragment>
            <Dropdown className="ms-sm-3 header-item topbar-user">
                <Dropdown.Toggle className="btn" data-toggle="dropdown" style={{ background: "transparent", border: "transparent" }}>
                    <span className="d-flex align-items-center">
                        <LazyImage className="rounded-circle header-profile-user" src={httpImage(credentials?.image?.src) || "-"}
                            alt="Header Avatar" defaultImage="/static/avatar.png" />

                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{credentials?.name}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">

                            </span>
                        </span>
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">

                    <h6 className="dropdown-header">{credentials?.name}!</h6>
                    <DropdownItem onClick={() => { navigate(`profile/user/${credentials?.id}`) }}><i className="fas fa-user text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle">Profil</span>
                    </DropdownItem>
                    <div className="dropdown-divider"></div>
                    <DropdownItem onClick={() => { handleLogout() }}>
                        <i
                            className="fas far fa-sign-out-alt text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle" data-key="t-logout" >Logout</span>
                    </DropdownItem>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;