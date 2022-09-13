import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPersonInfo } from '../../Services/Person';

interface PersonInterface {
    _id: string,
    name: string,
    address: string
}

const PersonDetailsView: React.FC = () => {

    const { personId } = useParams<{ personId?: string }>();

    const [person, setPerson] = useState<PersonInterface>({
        _id: '',
        name: '',
        address: ''
    });

    useEffect(() => {

        if (!personId) {
            return;
        }

        getPersonInfo(personId).then(person => {
            setPerson(person);
        });

    }, [personId])

    return (
        <div className="container mx-auto grid place-content-center min-h-screen grid-cols-1">
            <div className="lg:w-2/4 xs:w-full mx-auto">
                <div className="card card-bordered bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title flex items-center">
                            <Link to="/companies" className="btn btn-circle mr-4">
                                <span className="material-icons">
                                    arrow_back
                                </span>
                            </Link>
                            {person?.name}
                        </h2>

                        {person.address && (
                            <p className="flex items-center">
                                <span className="material-icons block mr-2">
                                    location_on
                                </span>
                                {person.address}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonDetailsView;