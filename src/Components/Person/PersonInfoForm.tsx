import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Input from '../Form/Input';
import { getList } from '../../Services/Company';
import { Context } from '../../Hooks/Store';
import { getPersonInfo, savePersonInfo } from '../../Services/Person';

const PersonInfoForm: React.FC = () => {

    type PersonFormValues = {
        _id?: string,
        name: string,
        address: string,
        companyId: string,
    };

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<PersonFormValues>();

    const [loading, setLoading] = useState<boolean>(false);

    const { personId } = useParams<{ personId?: string }>();

    const { setToastMessage } = useContext(Context);

    const [companies, setCompanies] = useState<any[]>([]);

    const [person, setPerson] = useState<any[]>([]);

    const navigate = useNavigate();

    async function initList() {
        setCompanies(
            await getList()
        )
    }

    function submitForm(formData: PersonFormValues): void {
        setLoading(true);

        if (personId) {
            formData._id = personId;
        }

        savePersonInfo(formData)
            .then(res => {

                if ((res && res.data && res.data._id) || (res && res.data === 'Accepted')) {
                    setToastMessage(
                        (personId ? 'The person\'s details have been updated' : 'The person has been successfully created')
                    );

                    navigate('/companies');
                }

            }).finally(() => setLoading(false));
    }

    useEffect(() => {

        if (!personId) {
            return;
        }

        getPersonInfo(personId).then(person => {
            setPerson(person);
            setValue('name', person.name);
            setValue('address', person.address);
            setValue('companyId', person.companyId);
        });

    }, [personId])

    useEffect(() => {
        initList();
    }, [])

    return (
        <form className="mt-12 xl:w-2/4 mx-auto card shadow-md bg-base-100" onSubmit={handleSubmit(submitForm)}>
            <div className="card-body">
                <h2 className="card-title flex items-center">
                    <Link to="/companies" className="btn btn-circle mr-4">
                        <span className="material-icons">
                            arrow_back
                        </span>
                    </Link>
                    Add New Person
                </h2>

                <Input
                    name="name"
                    label="Person Name"
                    register={register}
                    args={{ required: true, maxLength: 100, minLength: 2 }}
                    errors={errors}
                />

                <Input
                    name="address"
                    label="Address"
                    register={register}
                    args={{ required: false, maxLength: 100, minLength: 10 }}
                    errors={errors}
                />

                <div className="form-control mb-3">
                    <label htmlFor="company" className="label">
                        <span className="label-text">
                            Company*
                        </span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        id="company"
                        {...register('companyId', { required: true })}
                    >

                        {companies.map((company) => (
                            <option key={'select-company-' + (company._id)} value={company._id}>{company.name}</option>
                        ))}
                    </select>
                </div>

                <div className="justify-end card-actions">
                    <button type="submit" className="btn btn-ghost">
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

export default PersonInfoForm;