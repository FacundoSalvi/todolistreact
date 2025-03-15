import { useEffect, useState } from 'react';
import './App.css';
import { Task } from './components/Task';
import { Form } from './components/Form';
import { supabase } from '../supabase';

function App() {
  const [actividad, setActividad] = useState('');
  const [actividades, setActividades] = useState([]);

    useEffect(()=>{
      const fetchActividades = async () => {
        const { data, error } = await supabase.from("activity").select("*");
        if (error){
          console.error("Error al obtener actividades:", error);
        } else{
          setActividades(data);
        }
      };
      fetchActividades();
  }, []);
  
  useEffect(()=>{
    document.title = `Actividades pendientes: ${actividades.length}`;
  }, [actividades]);

  const handleChange = e =>{
    setActividad(e.target.value)
  }

  const addTask = async (e) =>{
    e.preventDefault();
    if(actividad.trim() ===''){
      alert('Debes ingresar una actividad')
      return;
    }

    const {data, error} = await supabase
    .from("activity")
    .insert([{actividad, terminada: false}])
    .select();

    if(error){
      console.error("Error al agregar actividad: ", error);
      return;
    } else{
      console.log("Actividades obtenidas: ", data)
      setActividades(data)
    }
    setActividades([...actividades, data[0]]);
    setActividad("");
  };

  const borrarActividad = async (id) =>{
    const {error} = await supabase.from("activity").delete().eq("id", id);
    if (error){
      console.error("Error al borrar actividad: ", error);
      return;
    }
    setActividades(actividades.filter((actividad) => actividad.id !== id));
  }


  return (
    <>
    <h2>To do List</h2>
    <Form
      handleChange = {handleChange}
      addTask = {addTask}
      actividad = {actividad}
    />
    {actividades.length > 1 && 
      <button onClick={()=>setActividades([])}>Vaciar actividades</button>
    }
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
