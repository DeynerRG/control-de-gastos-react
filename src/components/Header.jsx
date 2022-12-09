import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'


function Header({gastos, setGastos,presupuesto, setPresupuesto,isValidPresupuesto,setIsValidPresupuesto,formatearDinero}) {
  
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {
          isValidPresupuesto ? (
            <ControlPresupuesto
              presupuesto={presupuesto}
              formatearDinero={formatearDinero}
              gastos={gastos}
              setGastos={setGastos}
              setPresupuesto={setPresupuesto}
              setIsValidPresupuesto={setIsValidPresupuesto}
            />
          )
          : (
            <NuevoPresupuesto 
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              setIsValidPresupuesto={setIsValidPresupuesto}
              gastos={gastos}
            />
          )

        }
        

    </header>
  )
}

export default Header