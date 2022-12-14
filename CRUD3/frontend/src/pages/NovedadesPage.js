import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NovedadItem from '../components/novedades/Novedaditem';
import '../styles/components/pages/NovedadesPage.css'

const NovedadesPage = (porps) => {
    const [loading, setLoading] = useState(false);
    const [novedades, setNovedades] = useState([]);

    useEffect(() => {
        const cargarNovedades = async () => {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/novedades');
            setNovedades(response.data)
            setLoading(false);
        };
        cargarNovedades();
    }, [])
    return (
        <body>
            <div className='container'><h2>Novedades</h2>
                <nav class="navbar bg-gradient">
                    <div class="buscador">
                        <input type="search" placeholder="Search" aria-label="Search" />
                    </div>
                </nav>
            </div>
            <div className='contenedor2'>
                <section className='contenedor1'>
                    {loading ? (
                        <p>cargando...</p>
                    ) : (
                        novedades.map(item => <NovedadItem key={item.id}
                            title={item.titulo} subtitle={item.subtitulo}
                            imagen={item.imagen} body={item.cuerpo} />)
                    )}
                </section>
            </div>

        </body>



    );
}

export default NovedadesPage;
