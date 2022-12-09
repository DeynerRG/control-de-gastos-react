import { func } from 'prop-types';
import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ControlPresupuesto({gastos,setGastos,presupuesto,setPresupuesto,formatearDinero, setIsValidPresupuesto}) {
    const [porcentaje, setPorcentaje] = useState(0);
    const [ disponible, setDisponible ]= useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(()=>{
        const totalGastado = gastos.reduce((total, gasto)=> gasto.cantidad + total, 0);
        setGastado(totalGastado);
    }, [gastos])
    
    useEffect(()=>{
        const totalDisponible = presupuesto - gastado;
        setDisponible(totalDisponible);   
    },[gastado])

    useEffect(()=>{
        const nuevoPorcentaje = (((presupuesto - disponible) / presupuesto) * 100).toFixed(2); 
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 500);
    },[disponible]);
   
    function handleResetApp(){
       const response = confirm("¿Esta seguro que desea resetear la app?");
        if(response){
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false)
        }
    }

    return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
           <CircularProgressbar
                styles={ buildStyles({
                    pathColor: porcentaje > 100 ? "red" : "#3882f6",
                    trailColor:"#f5f5f5",
                    textColor: porcentaje > 100 ? "red" : "#3882f6"
                }) } 
                value={porcentaje}
                text={`${porcentaje} % Gastado`}
           />
        </div>
        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto: </span>{formatearDinero(presupuesto)}
            </p>
            <p className={  `${disponible < 0 ? 'negativo': ''}` }>
                <span>Disponible: </span>{formatearDinero(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearDinero(gastado)}
            </p>
            
            <button
                className='reset-app'
                onClick={handleResetApp}
            >
                Resetear App
            </button>
            
        </div>
    </div>
  )
}

export default ControlPresupuesto