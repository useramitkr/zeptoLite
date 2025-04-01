import React, { useState } from 'react';

const Header: React.FC = () => {

    return (
        <header className="bg-blue-600 text-white py-4">
            <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-semibold">
                    Zepto Lite
                </div>

                {/* Button */}
                <button
                    className="bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-400"
                >
                    Help: +91 9876543210
                </button>
            </div>
        </header>
    );
};

export default Header;
