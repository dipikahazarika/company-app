import React from 'react';

interface ArgsInterface {
    required?: boolean,
    minLength?: number,
    maxLength?: number
}

const ValidationMessage: React.FC<{
    name: string,
    errors?: any,
    args?: ArgsInterface,
    extraError?: any
}> = ({
    name,
    errors,
    args,
    extraError
}) => {
        return (
            <div>
                {!extraError && errors && errors[name] && errors[name]['type'] === "required" && (
                    <small className="text-left text-red-500 block mt-2 font-bold" role="alert">This is required</small>
                )}

                {!extraError && errors && errors[name] && errors[name]['type'] === "maxLength" && (
                    <small className="text-left text-red-500 block mt-2 font-bold" role="alert">Max length exceeded</small>
                )}

                {!extraError && errors && errors[name] && errors[name]['type'] === "minLength" && (
                    <small className="text-left text-red-500 block mt-2 font-bold" role="alert">Min {args?.minLength} characters required</small>
                )}

                {extraError && (
                    <small className="text-left text-red-1500 block mt-2 font-bold" role="alert">{extraError}</small>
                )}
            </div>
        )
    }

export default ValidationMessage;