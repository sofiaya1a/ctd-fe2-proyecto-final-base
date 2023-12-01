import { useState } from 'react';
import { NombresSimpsons, INFO_SIMPSONS } from './constants';
import styles from '../bio/styles.module.css';
import { BioContainer,ContenedorBotones,BioImagen,BioNombre,BioDescripcion } from './styledBio';

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(INFO_SIMPSONS[NombresSimpsons.BART]);

  const onClick: (nombre: NombresSimpsons) => void = (nombre) => setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <button
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        className={bioActiva.id === nombre ? styles.botonBioActivo : styles.botonBioInactivo}
      >
        {nombre}
      </button>
    ));
  };

  return (
    <BioContainer>
      <ContenedorBotones>{crearBotones()}</ContenedorBotones>
      <div>
        <div>
          <BioImagen src={bioActiva.image} alt={bioActiva.nombre}></BioImagen>
        </div>
        <div>
          <BioNombre>{bioActiva.nombre}</BioNombre>
          <BioDescripcion>{bioActiva.descripcion}</BioDescripcion>
        </div>
      </div>
    </BioContainer>
  );
};

export default Bio;
