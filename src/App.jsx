import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import iconoNuevoGasto from './img/nuevo-gasto.svg'
import Filtros from './components/Filtros'
function App() {

  const [gastos, setGastos] = useState(
   localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  );
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto" ?? 0))
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({});
  const [idGastoEliminar, setIdGastoEliminar] = useState("");
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  useEffect(()=>{
    // Evalua si el objeto gastoEditar contiene propiedades o no
    if(Object.keys(gastoEditar).length){
      handleNuevoGasto(); // Abrir Modal
    }
  },[gastoEditar]);

  useEffect(()=>{
    if(idGastoEliminar){
      const gastosActualizados = gastos.filter((gastos)=> gastos.id != idGastoEliminar)
      setGastos(gastosActualizados);
    }
    setIdGastoEliminar("");
  },[idGastoEliminar]);

  useEffect(()=>{
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  },[presupuesto]);

  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem("presupuesto") ?? 0)
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true);
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  },[gastos]);

  useEffect(()=>{
    
    if(filtro){
      const gastosFiltrados = gastos.filter((gasto)=> gasto.categoria === filtro );
      setGastosFiltrados(gastosFiltrados);
    }

  },[filtro]);

  function formatearDinero(valor){
    const formatter = new Intl.NumberFormat("en-US",{
      style:"currency",
      currency:"USD"
    })
    return formatter.format(valor);
  }

  function handleNuevoGasto(){
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }

  function guardarGasto(objGasto){
    const {id} = objGasto;
    if(id){
      // Actualizar
      const gastosActualizados = gastos.map((gasto)=> gasto.id === id ? objGasto : gasto)
      setGastos(gastosActualizados);
      setGastoEditar({})
    }else{
      // Nuevo Gasto
      objGasto.id = generarId();
      objGasto.fecha = Date.now(); //pendiente
      setGastos([...gastos, objGasto]);
    }

    
    ocultarModal();
  }

  function ocultarModal() {
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
    setGastoEditar({}); // reset al state
  }

  return (
   <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        formatearDinero={formatearDinero}
        gastos={gastos}
        setGastos={setGastos}
        
      />
      {
        isValidPresupuesto ? (
          
          // fragment start
          <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}  
            />
            <ListadoGastos
              gastos={gastos}
              formatearDinero={formatearDinero}
              gastoEditar={gastoEditar}
              setGastoEditar={setGastoEditar}
              setIdGastoEliminar={setIdGastoEliminar}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}

            />
          </main>

           <div className='nuevo-gasto'>
            <img 
            src={iconoNuevoGasto} 
            alt="icono-nuevo-gasto" 
            onClick={handleNuevoGasto}
            />
          </div>
          
          </>
          // fragment end

        ): null

      }
      {
        modal && (
          <Modal 
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            guardarGasto={guardarGasto}
            ocultarModal={ocultarModal}
            gastoEditar={gastoEditar}
          />
        )
      }

   </div>

  )
}

export default App
