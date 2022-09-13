import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getList } from '../../Services/Company';
import CompanyGrid from './_Partials/CompanyGrid';
import PeopleModal from './_Partials/PeopleModal';

interface CompanyInterface {
    _id: string,
    phone: string,
    name: string,
    address: string,
    revenue: number
}

const CompaniesList: React.FC = () => {

    const [companies, setCompanies] = useState<any[]>([]);

    const [companyId, setCompanyId] = useState<string>('');

    async function initList() {
        setCompanies(
            await getList()
        )
    }

    useEffect(() => {
        initList();
    }, [])

    return (
        <div className="container mx-auto py-4">
            <div className="flex justify-between items-center mb-8 xs:flex-col lg:flex-row gap-4">
                <h2 className="text-xl font-bold text-base-content">Companies</h2>
                <div className="flex lg:flex-row xs:flex-col gap-4">
                    <Link to="/company/add/new" className="btn btn-primary btn-sm rounded flex items-center">Add New Company</Link>
                    <Link to="/person/add/new" className="btn btn-outline btn-sm rounded flex items-center">Add New Person</Link>
                </div>
            </div>

            {companies.length === 0 && (
                <div className="alert alert-info">
                    <div className="flex-1">
                        <label>The company list is empty</label>
                    </div>
                </div>
            )}

            <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                {companies.map((company: CompanyInterface) => (
                    <CompanyGrid
                        key={`company-${company._id}`}
                        company={company}
                        onSetPeopleModal={(companyId: string) => {
                            setCompanyId(companyId);
                        }}
                    />
                ))}

            </div>

            <PeopleModal
                companyId={companyId}
                onModalClose={() => {
                    setCompanyId('');
                }}
            />

        </div>
    )
}

export default CompaniesList;