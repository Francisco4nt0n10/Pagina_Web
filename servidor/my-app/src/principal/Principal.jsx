import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        
        <div>
            <h1 >sistema de informacion</h1>
            <div>
                <h2>catalogos</h2>
                <button>clientes</button>
                <button>productos</button>
            </div>
            <div>
                <h2>movimientos</h2>
                <button>compras</button>
                <button>ventas</button>
            </div>
        </div>
        
    );
};

export default Home;
