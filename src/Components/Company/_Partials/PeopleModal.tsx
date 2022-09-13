import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePersonById, findPeopleByCompanyId } from '../../../Services/Person';
import LoadingIcon from '../../Assets/LoadingIcon';

interface OnModalCloseInterface {
    (close: boolean): void;
}

interface PersonInterface {
    _id?: string,
    name: string,
    address: string,
    companyId: string,
};

const PeopleModal: React.FC<{ companyId: string, onModalClose: OnModalCloseInterface }> = ({ companyId, onModalClose }) => {

    const [modal, setModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const [people, setPeople] = useState<any[]>([]);

    function setPeopleList() {
        findPeopleByCompanyId(companyId).then((res) => {
            setPeople(res);
        }).finally(() => setLoading(false));
    }

    function deletePerson(personId: any) {
        deletePersonById(personId).then(res => {
            setPeopleList();
        });
    }

    useEffect(() => {

        if (!companyId) {
            setPeople([]);
            setModal(false);
            return;
        }


        setModal(true);

        setLoading(true);

        // Purpose here is to display the loading icon
        setTimeout(() => {
            setPeopleList();
        }, 1000);


    }, [companyId])

    return (
        <div>
            <input onChange={() => setModal(modal)} checked={modal} type="checkbox" id="my-modal-2" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    {loading && people.length === 0 && <LoadingIcon />}

                    <ul className="menu">
                        {!loading && people && people.length === 0 && (
                            <li>
                                There is no person working in this company
                            </li>
                        )}

                        {people.map((person: PersonInterface) => (
                            <li className="flex items-center flex-row justify-between" key={'person' + person._id}>
                                <span>
                                    {person.name}
                                </span>

                                <div className="flex">
                                    <Link to={`/person/${person._id}/view`} className="mr-4 btn-sm btn btn-circle">
                                        <span className="material-icons">
                                            visibility
                                        </span>
                                    </Link>
                                    <Link to={`/person/${person._id}/edit`} className="mr-4 btn-sm btn btn-circle">
                                        <span className="material-icons">
                                            edit
                                        </span>
                                    </Link>
                                    <div className="cursor-pointer btn btn-circle btn-sm" onClick={() => deletePerson(person._id)}>
                                        <span className="material-icons">
                                            delete
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {!loading && (
                        <div className="modal-action">
                            <label onClick={() => {
                                onModalClose(true);
                            }} htmlFor="my-modal-2" className="btn">Close</label>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default PeopleModal;