import React from 'react';
import { Link } from 'react-router-dom';

interface CompanyInterface {
    _id: string,
    phone: string,
    name: string,
    address: string,
    revenue: number
}

interface SetPeopleModalInterface {
    (companyId: string): void;
}

const CompanyGrid: React.FC<{ company: CompanyInterface, onSetPeopleModal: SetPeopleModalInterface, view?: boolean }> = ({
    company, onSetPeopleModal, view
}) => {
    return (
        <div className="card card-bordered bg-base-100 company-grid">
            <div className="card-body">
                <h2 className="card-title flex items-center">
                    {view && (
                        <Link to="/companies" className="btn btn-circle mr-4">
                            <span className="material-icons">
                                arrow_back
                            </span>
                        </Link>
                    )}
                    {company.name}
                </h2>

                {company.address && (
                    <p className="flex items-center">
                        <span className="material-icons block mr-2">
                            location_on
                        </span>
                        {company.address}
                    </p>
                )}

                {company.revenue && (
                    <p className="flex items-center mt-4">
                        <span className="material-icons block mr-2">
                            attach_money
                        </span>
                        {company.revenue}
                    </p>
                )}

                {company.phone && (
                    <p className="flex items-center mt-4">
                        <span className="material-icons block mr-2">
                            call
                        </span>
                        {company.phone}
                    </p>
                )}

                <p className="flex items-center mt-4">
                    <span className="material-icons block mr-2">
                        groups
                    </span>
                    <span onClick={() => {
                        onSetPeopleModal(company._id);
                    }} className="underline decoration-dashed italic cursor-pointer">People Who Work Here</span>
                </p>
                <div className="justify-end card-actions">
                    {!view && (
                        <Link className="btn btn-ghost" to={`/company/${company._id}/view`}>
                            <span className="material-icons mr-2">
                                visibility
                            </span>
                            View Info
                        </Link>
                    )}
                    <Link className="btn btn-ghost" to={`/company/${company._id}/edit`}>
                        <span className="material-icons mr-2">
                            edit
                        </span>
                        Edit Info
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CompanyGrid;