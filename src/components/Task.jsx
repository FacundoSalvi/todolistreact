import React, {useState} from 'react'
import '../Task.css'

const Task = ({actividad, borrarActividad}) =>{
    const[hecha, setHecha] = useState(false)
    return (
        <div className={hecha?'containerActividad containerActividadHecha':'containerActividad'}>
            <h2 className={hecha? 'hecha': 'noHecha'}>{actividad.actividad}</h2>
            <button id='hacer' onClick={()=>setHecha(!hecha)}>{hecha? 'No hecha':'Hecha'}</button>
            <button onClick={()=>borrarActividad(actividad.id)} id='borrar'>Borrar</button>
            

        </div>
    )
}
/*Acá uso "export {Task}"" en lugar de "export default Task" ya que en un futuro querré exportar más componentes provenientes de este archivo*/
export {Task}       