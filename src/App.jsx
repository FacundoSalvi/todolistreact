import { useEffect, useState } from 'react'
import './App.css'
import { Task } from './components/Task'
import { Form } from './components/Form'
function App() {
  const [actividad, setActividad] = useState('');
  const [actividades, setActividades] = useState([]);

  useEffect(() =>{
    document.title = `Actividades pendientes: ${actividades.length}`;
  }, [actividades])

  const handleChange = e =>{
    setActividad(e.target.value)
  }

  const addTask = e =>{
    e.preventDefault();
    if(actividad.trim() ===''){
      alert('Debes ingresar una actividad')
      return;
    }
    const nuevaActividad ={
      id: Date.now(),
      actividad, /*Es lo mismo que poner "actividad: actividad", al poner unicamente "actividad" el programa da por entendido que la key y el value son lo mismo  */
      terminada: false
    }
    const actividadesTotales = [nuevaActividad, ...actividades]
    setActividades(actividadesTotales);
    setActividad('')
  }
  const borrarActividad = id =>{
      const actividadesActualizadas = actividades.filter(actividad =>{
        return actividad.id !== id
      })
      setActividades(actividadesActualizadas);
  }


  return (
    <>
    <h2>To do List</h2>
    <Form
      handleChange = {handleChange}
      addTask = {addTask}
      actividad = {actividad}
    />
    {actividades.length > 1 && (
      <button onClick={()=>setActividades([])}>Vaciar actividades</button>
    )}
    {actividades.map(actividad=>(
      <Task
      key={actividad.id}
      id = {actividad.id}
      actividad = {actividad}
      borrarActividad = {borrarActividad}    
      />
    ))}
    </>
  )
}

export default App
