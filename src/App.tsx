import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Components/Layout/Header';
import Loading from './Components/Assets/Loading';
import PersonDetailsView from './Components/Person/PersonDetailsView';

const CompaniesList = React.lazy(() => import('./Components/Company/CompaniesList'));
const CompanyInfoForm = React.lazy(() => import('./Components/Company/CompanyInfoForm'));
const CompanyDetailsView = React.lazy(() => import('./Components/Company/CompanyDetailsView'));
const PersonInfoForm = React.lazy(() => import('./Components/Person/PersonInfoForm'));

function App() {
    return (
        <div className="App min-h-screen lg:bg-base-200">
            <Header />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/companies" />} />

                    {/* Company */}
                    <Route path="/companies" element={<CompaniesList />} />
                    <Route path="/company/add/new" element={<CompanyInfoForm />} />
                    <Route path="/company/:companyId/edit/" element={<CompanyInfoForm />} />
                    <Route path="/company/:companyId/view/" element={<CompanyDetailsView />} />

                    {/* Person */}
                    <Route path="/person/add/new" element={<PersonInfoForm />} />
                    <Route path="/person/:personId/edit/" element={<PersonInfoForm />} />
                    <Route path="/person/:personId/view/" element={<PersonDetailsView />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
