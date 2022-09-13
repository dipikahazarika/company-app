import React from 'react';

const LoadingIcon: React.FC = () => {
    return (
        <div className="flex items-center justify-center">
            <div
                className="spinner my-spinner
                            w-16
                            h-16
                            border-4 border-solid
                            rounded-full
                            animate-spin"
            ></div>
        </div>
    )
}

export default LoadingIcon;