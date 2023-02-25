import React, { children } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaHome, FaUser, FaCalendarPlus, FaBars, FaGoogle, FaSearch, FaBell } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { icons } from 'react-icons/lib';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from './Images/AitLogo.png'
const routes = [

    {
        path: "/Home",
        name: "Home",
        icon: <FaHome />,
    },

    {
        path: "/",
        name: "Goggle ",
        icon: <FaGoogle />,
    },
    {
        path: "/",
        name: "OnBoard",
        icon: <FaUser />,
    },
    {
        path: "/",
        name: "Other",
        icon: <FaHome />,
    },
    {
        path: "/",
        name: "Attendence",
        icon: <FaCalendarPlus />,
    },

]

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <img src={logo} className="navbar-brand" style={{ width: "50px", height: "50px" }} />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form className="d-flex">
                        <input className="form-control me-1" type="search" id='inputbtn' placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-primary" id='searchbtn' type="submit"><FaSearch /></button>
                    </form>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">&nbsp;</li>
                            <li className="nav-item">&nbsp;</li>
                            <li className="nav-item">&nbsp;</li>
                            <li className="nav-item">&nbsp;</li>
                            <li className="nav-item">
                                <form className="d-flex">
                                    <input className="form-control me-1" type="search" id='inputbtn' placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-primary" id='searchbtn' type="submit"><FaSearch /></button>
                                </form>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </nav>

            <div className='main-container'>
               <motion.div animate={{
                    width: isOpen ? "200px" : "45px",
                    //  transition: {
                    //     duration: 0.5,
                    //     type: 'spring', damping: 10
                    // }
                }} className="sidebar">
                    <div className='top_section'>
                        {isOpen && <h1 className='logo'>SideBar</h1>}
                        <div className='bars'>
                            <FaBars onClick={toggle} />
                        </div>
                    </div>
                    {/* <div className='search'>
            <div className='search-icon'>
                <BiSearch/>
            </div>
            <input placeholder='Search...'/>
        </div> */}
                    <section className='routes'>
                        {routes.map((route) => (
                            <NavLink to={route.path} key={route.name} className="link">
                                <div className='icon'>{route.icon}</div>
                                <AnimatePresence>
                                    {isOpen &&
                                        <motion.div className='link-text'>{route.name}</motion.div>}
                                </AnimatePresence>
                            </NavLink>
                        ))}
                    </section>
                </motion.div>
                <main>{children}</main>
            </div>
        </>
    )
}

export default Sidebar;
