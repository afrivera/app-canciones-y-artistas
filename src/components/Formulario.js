import React, { useState } from 'react'

const initialState = {
    artista: '',
    cancion: ''
}

const Formulario = ({ setBusquedaLetra }) => {
    
    const [busqueda, setBusqueda] = useState(initialState);
    const [error, setError] = useState(false);

    const { artista, cancion} = busqueda;

    // función a cada input leer su contenido
    const actualizarState = e =>{
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    // consultar las apis
    const handleSubmit = e=> {
        e.preventDefault();

        if(artista.trim() === '' || cancion.trim() === ''){
            setError( true );
            return;
        }

        setError( false );
        // todo bien pasar al componente principal
        setBusquedaLetra( busqueda );

    }

    return (
        <div className='bg-info'>
            
            <div className='container'>
                <div className='row'>
                    <form
                        className='col card text-white bg-transparent mb-5 pt-5 pb-2'
                        onSubmit={handleSubmit}
                    >
                        <fieldset>
                            <legend className='text-center'>Buscador Letras Canciones</legend>

                            <div className='row'>
                                <div className='col md-6'>
                                    <div className='form-group'>
                                        <label htmlFor='artista'>Artista</label>
                                        <input 
                                            type='text'
                                            className='form-control'
                                            name='artista'
                                            id='artista'
                                            placeholder='Nombre Artista'
                                            onChange={actualizarState}
                                            value={artista}
                                        />
                                    </div>
                                </div>
                                <div className='col md-6'>
                                    <div className='form-group'>
                                        <label htmlFor='cancion'>Canción</label>
                                        <input 
                                            type='text'
                                            className='form-control'
                                            name='cancion'
                                            id='cancion'
                                            placeholder='Nombre Canción'
                                            onChange={actualizarState}
                                            value={cancion}
                                        />
                                    </div>

                                </div>
                            </div>
                            <button 
                                type='submit'
                                className='btn btn-primary float-right'
                            >Buscar</button>
                        </fieldset>
                        {
                            error &&
                                <p className='alert alert-danger text-center p-2 mt-3'>Todos los Campos son Obligatorios</p>
                        }

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario