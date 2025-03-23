import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Top Section */}
            <div 
                className="flex flex-col items-center justify-center h-3/4 w-full " 
                style={{ 
                    backgroundImage: "url('https://i.pinimg.com/736x/ff/43/be/ff43be5b071a29829fe119c2b04b59f0.jpg')", 
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <img
                    src="https://i.pinimg.com/736x/c7/55/65/c7556550a929d54ec7f56e28c1ccd82b.jpg"
                    alt="Logo"
                    className="w-40 h-auto rounded-lg object-contain"
                />
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col items-center justify-center h-1/4 gap-4 bg-gray-50">
                <button
                    className="w-48 py-2 text-gray-100 bg-black border border-black rounded-lg hover:bg-gray-100 hover:text-gray-800"
                    onClick={() => navigate('/user/login')}
                >
                    Customer
                </button>
                <button
                    className="w-48 py-2 text-gray-100 bg-black border border-black rounded-lg hover:bg-gray-100 hover:text-gray-800"
                    onClick={() => navigate('/captain/Login')}
                >
                    Captain
                </button>
            </div>
        </div>
    );
}

export default Home;