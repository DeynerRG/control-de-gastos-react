import React, { useEffect, useState } from "react";
import iconoCerrarModal from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

function Modal({ setModal, animarModal, setAnimarModal, guardarGasto, ocultarModal, gastoEditar }) {

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [fecha, setFecha] = useState("")
  const [id, setId] = useState("");

  useEffect(()=>{
    
    if(Object.keys(gastoEditar).length){
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);
    }

  },[]);

  function handleNuevoGasto(e){
    e.preventDefault();
    if([nombre, cantidad, categoria].includes("")){
        setMensaje("Todos los campos son obligatorios");
        setTimeout(() => {
            setMensaje("");
        }, 2000);
        return;
    }

    guardarGasto({nombre, cantidad, categoria, id, fecha})
 
  }
  

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={iconoCerrarModal} alt="icono-cerrar" onClick={ocultarModal} />
      </div>
      <form
        onSubmit={handleNuevoGasto}
        action="#"
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

        <div className="campo">
          <label htmlFor="nombre">Nombre del gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ejemplo: Gimnasio"
            value={nombre}
            onChange = {(e)=>{setNombre(e.target.value)}}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input 
            id="cantidad" 
            type="number" 
            placeholder="Ejemplo: 300" 
            min={0}
            value={cantidad}
            onChange={(e)=>{setCantidad(Number(e.target.value))}}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select 
            name="categoria" 
            id="categoria"
            value={categoria}
            onChange={(e)=>{setCategoria(e.target.value)}}
          >
            <option value="" disabled>
              seleccione
            </option>
            <option value="ahorro">Ahorro</option>
            <option value="casa">Casa</option>
            <option value="comida">Comida</option>
            <option value="gastos">Varios gastos</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value={gastoEditar.nombre ? "Guardar Cambios":"Añadir gasto"} />
        {
            //si existe un mensaje entonces se renderiza el elemento
           mensaje && ( 
             <Mensaje tipo={"error"}> 
                {mensaje}
             </Mensaje>
           )
        }
      </form>
    </div>
  );
}

export default Modal;
