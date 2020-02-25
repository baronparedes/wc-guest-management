import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
    return (
        <div className="text-center d-block">
            <FaSpinner className="fa-spin" size={40} />
        </div>
    );
};

export default Loading;
