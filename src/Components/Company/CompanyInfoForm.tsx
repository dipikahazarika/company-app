import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Input from '../Form/Input';
import InputMask from 'react-input-mask';
import ValidationMessage from '../Form/ValidationMessage';
import { getCompanyInfo, saveCompanyInfo } from '../../Services/Company';
import { Context } from '../../Hooks/Store';

const CompanyInfoForm: React.FC = () => {

    type CompanyFormValues = {
        _id?: string,
        name: string,
        address: string,
        revenue: string,
        phone: string,
    };

    const navigate = useNavigate();

    const { companyId } = useParams<{ companyId?: string }>();

    const [loading, setLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CompanyFormValues>();

    const [company, setCompany] = useState<CompanyFormValues>();

    const { setToastMessage } = useContext(Context);

    function submitForm(formData: CompanyFormValues): void {

        setLoading(true);

        if (companyId) {
            formData._id = companyId;
        }

        saveCompanyInfo(formData)
            .then(res => {

                if ((res && res.data && res.data._id) || (res && res.data === 'Accepted')) {
                    setToastMessage(
                        (companyId ? 'The company details have been updated' : 'Company has been successfully created')
                    );

                    navigate('/companies');
                }

            }).finally(() => setLoading(false));
    }

    useEffect(() => {

        if (!companyId) {
            return;
        }

        getCompanyInfo(companyId).then(company => {
            setCompany(company);
            setValue('name', company.name);
            setValue('address', company.address);
            setValue('revenue', company.revenue);
            setValue('phone', company.phone);
        });

    }, [companyId])

    return (
        <form className="mt-12 xl:w-2/4 mx-auto card shadow-md bg-base-100" onSubmit={handleSubmit(submitForm)}>
            <div className="card-body">
                <h2 className="card-title flex items-center">
                    <Link to="/companies" className="btn btn-circle mr-4">
                        <span className="material-icons">
                            arrow_back
                        </span>
                    </Link>
                    {(company && company.name ? `Edit: ${company.name}` : `Add New Company`)}
                </h2>

                <Input
                    name="name"
                    label="Company Name"
                    register={register}
                    args={{ required: true, maxLength: 100, minLength: 3 }}
                    errors={errors}
                />

                <Input
                    name="address"
                    label="Company Address"
                    register={register}
                    args={{ required: false, maxLength: 100, minLength: 10 }}
                    errors={errors}
                />

                <Input
                    name="revenue"
                    label="Revenue"
                    register={register}
                    args={{ required: false, minLength: 3, maxLength: 9 }}
                    errors={errors}
                    type="tel"
                />

                <div className="form-control">
                    <label htmlFor='phone' className="label">
                        <span className="label-text">
                            Phone
                        </span>
                    </label>

                    <InputMask
                        {...register('phone', { required: false, minLength: 10 })}
                        name="phone"
                        mask={'999 999 9999'}
                        maskPlaceholder=" "
                        className="input input-bordered"
                        id="phone"
                    />

                    <ValidationMessage errors={errors} name="phone" args={{ required: true, minLength: 10 }} />
                </div>

                <div className="justify-end card-actions">
                    <button type="submit" className={`btn btn-ghost ${loading ? 'loading' : ''}`}>
                        <span className="material-icons mr-2">
                            save
                        </span>
                        Save Info
                    </button>
                </div>
            </div>
        </form>
    )
}

export default CompanyInfoForm;