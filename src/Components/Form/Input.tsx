import React from 'react';
import ValidationMessage from './ValidationMessage';

interface ArgsInterface {
    required?: boolean,
    minLength?: number,
    maxLength?: number
}

const Input: React.FC<{
    label: string,
    register?: any,
    name: string,
    args?: ArgsInterface
    errors?: any,
    type?: string,
    value?: string,
    extraError?: string
}> = ({ label, register, name, args, errors, type, value, extraError }) => {

    return (
        <div className="form-control mb-3">
            <label htmlFor={name} className="label">
                <span className="label-text">
                    {label}{args?.required ? '*' : ''}
                </span>
            </label>
            <input
                {...register(name, args)}
                type={(type ? type : 'text')}
                value={value}
                className="input input-bordered"
                id={name}
                name={name}
            />
            <ValidationMessage errors={errors} name={name} args={args} extraError={extraError} />
        </div>
    )
}

export default Input;