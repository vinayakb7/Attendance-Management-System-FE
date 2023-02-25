import React from 'react'
import {FaBell, FaSearch, FaCalendarPlus, FaEllipsisV, FaCog} from 'react-icons/fa'

const NavbarUp = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" id="navbgclr">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Project</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/Tabular_View">Tabular</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Calender_View">Calender</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/List_view">ListView</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Opening</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Tabular_View">Regularization</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link"><FaBell/></a></li>
                            <li className="nav-item"><a className="nav-link"><FaSearch/></a></li>
                            <li className="nav-item"><a className="nav-link"><FaCalendarPlus/></a></li>
                            <li className="nav-item"><a className="nav-link"><FaCog/></a></li>
                            <li className="nav-item"><a className="nav-link"><FaEllipsisV/></a></li>
                        </ul>
                        
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavbarUp;
