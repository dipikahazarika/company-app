import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="container mx-auto min-h-screen grid items-center justify-center">
            <div>
                <div
                    className="spinner my-spinner
                                w-16
                                h-16
                                border-4 border-black border-solid
                                rounded-full
                                animate-spin"
                ></div>
                <div className="mt-4">Loading...</div>
            </div>
        </div>
    )
}

export default Loading;