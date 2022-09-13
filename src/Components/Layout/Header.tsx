import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <div className="navbar bg-base-100 mb-2 shadow-lg text-light-content px-0">
            <div className="container mx-auto">
                <div className="flex-none">
                    <Link to="/" className="text-lg font-bold">
                        SigFig
                        <span className="text-yellow-500 ml-1 font-bold">RPT</span>
                    </Link>
                </div>
                <div className="flex-1 px-2 mx-2">
                    <div className="items-stretch hidden lg:flex">
                        <Link to="/companies" className="btn btn-ghost btn-sm rounded-btn active">
                            Companies
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header;