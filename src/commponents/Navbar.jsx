import React, { useState } from "react";
import './styles.css';

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="nav">
            <a href="/" className="en-title">
                Engineer
            </a>
            <ul>
                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a href="/insert">Upload</a>
                </li>
                <li>
                    <a href="/up">Database</a>
                </li>

                {/* <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        onClick={toggleDropdown} // toggle dropdown on click
                        aria-expanded={isDropdownOpen ? "true" : "false"}
                    >
                        More
                    </a>
                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" href="/logout">Logout</a>
                            </li>
                        </ul>
                    )}
                </li> */}

            </ul>
        </nav>
    );
}

export default Navbar;
