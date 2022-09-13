import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Context = React.createContext();

const Store = ({ children }) => {
    const [state, setState] = useState({});

    const [toastMessage, setToastMessage] = useState(null);

    const [toastTimeout, setToastTimeout] = useState(5000);

    const stateObject = {
        state,
        setState,
        setToastMessage,
        setToastTimeout,
    };

    useEffect(() => {
        if (!toastMessage) {
            return;
        }

        toast(toastMessage);

        setTimeout(() => {
            setToastMessage("");
        }, toastTimeout);
    }, [toastMessage]);

    return (
        <Context.Provider value={stateObject}>
            {children}
            <ToastContainer
                autoClose={toastTimeout}
                onClose={() => setToastMessage(null)}
            />
        </Context.Provider>
    );
};

export default Store;
