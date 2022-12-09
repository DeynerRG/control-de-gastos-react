import React from 'react'

function Filtros({setFiltro, filtro}) {

    return (
    <div className='filtros sombra contenedor'>
        <form action="#">
           <div className='campo'>
                <label htmlFor="#">Filtrar Gastos</label>
                <select 
                    name="#" 
                    id="#"
                    value={filtro}
                    onChange={(e)=>{ setFiltro(e.target.value)}}
                >
                    <option value="">Todas las categorias</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="casa">Casa</option>
                    <option value="comida">Comida</option>
                    <option value="gastos">Varios gastos</option>
                    <option value="entretenimiento">Entretenimiento</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
           </div>
        </form>

    </div>
  )
}

export default Filtros