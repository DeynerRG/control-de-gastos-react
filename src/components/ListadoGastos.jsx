import React from 'react'
import Gasto from './Gasto'
function ListadoGastos({filtro,gastosFiltrados,setIdGastoEliminar, gastos, formatearDinero,gastoEditar,setGastoEditar}) {
  
  return (
    <div className='listado-gastos contenedor'>
     
        {
          filtro ? (
            
            <>
               <h2>{gastosFiltrados.length ? "Gastos" : "No existen gastos de esta categoria"}</h2>
              {
                gastosFiltrados.map((gasto)=>{
                  return <Gasto
                      key={gasto.id}
                      gasto={gasto}
                      formatearDinero={formatearDinero}
                      gastoEditar={gastoEditar}
                      setGastoEditar={setGastoEditar}
                      setIdGastoEliminar={setIdGastoEliminar}
                  />
                })
              }
            </>

          ):(
            
            <>
               <h2>{gastos.length ? "Gastos" : "No existen gastos"}</h2>
              {
                
                gastos.map((gasto)=>{
                  return <Gasto
                      key={gasto.id}
                      gasto={gasto}
                      formatearDinero={formatearDinero}
                      gastoEditar={gastoEditar}
                      setGastoEditar={setGastoEditar}
                      setIdGastoEliminar={setIdGastoEliminar}
                  />
                })

              }

            </>
          
          )

        }
    </div>
  )
}

export default ListadoGastos