import axios from "axios";
import { useEffect, useState } from "react";
import Cancion from "./components/Cancion";
import Formulario from "./components/Formulario";
import Info from "./components/Info";


function App() {

  // definir el state
  const [busquedaLetra, setBusquedaLetra] = useState({});
  const [letra, setLetra] = useState('');
  const [info, setInfo] = useState({});

  useEffect(()=> {

    if(Object.keys(busquedaLetra).length === 0 ) return;

    const ConsultarApiLetra = async()=> {

      const { artista, cancion } = busquedaLetra;

      const url = `https://api.lyrics.ovh/v1/${ artista }/${ cancion }`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${ artista }`;

      try {
        const [letraCancion, informacion ] = await Promise.all([
          axios( url ), axios( url2)
        ])
        // const informacion = await axios( url2 );
        setLetra(letraCancion.data.lyrics);
        setInfo(informacion.data.artists[0]);
        
      } catch (error) {
        console.log(error);
        setLetra('');
      }


    }

    ConsultarApiLetra();
  }, [busquedaLetra, info])
  return (
    <>
      <Formulario 
        setBusquedaLetra={ setBusquedaLetra }
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={ info } />
          </div>
          <div className="col-md-6">
            {
              letra &&
                <Cancion letra={letra } />
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
