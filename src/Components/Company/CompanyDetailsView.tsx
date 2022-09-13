import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanyInfo } from '../../Services/Company';
import CompanyGrid from './_Partials/CompanyGrid';
import PeopleModal from './_Partials/PeopleModal';

interface CompanyInterface {
    _id: string,
    phone: string,
    name: string,
    address: string,
    revenue: number
}

const CompanyDetailsView: React.FC = () => {

    const { companyId } = useParams<{ companyId?: string }>();

    const [company, setCompany] = useState<CompanyInterface>({
        _id: '',
        name: '',
        address: '',
        revenue: 0,
        phone: '',
    });

    const [companyIdForPeople, setCompanyIdforPeople] = useState<string>('');

    useEffect(() => {

        if (!companyId) {
            return;
        }

        getCompanyInfo(companyId).then(company => {
            setCompany(company);
        });

    }, [companyId])

    return (
        <div className="container mx-auto grid place-content-center min-h-screen grid-cols-1">
            <div className="lg:w-2/4 xs:w-full mx-auto">
                <CompanyGrid
                    company={company}
                    onSetPeopleModal={(companyId: string) => {
                        setCompanyIdforPeople(companyId);
                    }}
                    view={true}
                />
                <PeopleModal
                    companyId={companyIdForPeople}
                    onModalClose={() => {
                        setCompanyIdforPeople('');
                    }}
                />
            </div>
        </div>
    )
}

export default CompanyDetailsView;