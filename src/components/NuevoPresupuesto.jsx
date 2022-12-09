import React, { useState } from 'react'
import Mensaje from './Mensaje';

function NuevoPresupuesto({gastos, presupuesto, setPresupuesto,setIsValidPresupuesto}) {
    
    const [mensaje, setMensaje] = useState("");

    const handleNuevoPresupuesto = (e)=>{
        e.preventDefault();
       
        // presupuesto no valido
        if(!presupuesto || presupuesto < 0 ){
            setMensaje("No es un presupuesto valido")
            setIsValidPresupuesto(false);
            setTimeout(()=>{
                setMensaje("")
            }, 3000);
            return;
        }

        // presupuesto valido 
        setIsValidPresupuesto(true);
  
    }



  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form  
            action="#" 
            className='formulario'
            onSubmit={handleNuevoPresupuesto}>

            <div className='campo'>
                <label 
                    htmlFor="inputPresupuesto"
                >Definir Presupuesto</label>
                <input 
                    value={presupuesto}
                    id='inputPresupuesto' 
                    type="number" 
                    className='nuevo-presupuesto'
                    placeholder='Agrega tu presupuesto'
                    onChange={ (e) => {setPresupuesto( Number(e.target.value) )} }
                />
                <input 
                    type="submit" 
                    value={"Agregar"}
                />
                {mensaje && <Mensaje tipo={"error"}> { mensaje } </Mensaje>}
            </div>
        </form>
    </div>
  )
}

export default NuevoPresupuesto