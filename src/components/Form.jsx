import React from "react";

const Form = ({handleChange, addTask, actividad})=>{
    return (
        <div>
            <form onSubmit={addTask}>
            <input 
             type="text" value={actividad} 
             placeholder="Ingrese la actividad deseada..." 
             onChange={handleChange}
             style={{width: "100%"}}/>
             <button type="submit">Añadir</button>
            </form>
            

        </div>
    )
}
/*Acá uso "export {Form}"" en lugar de "export default Form" ya que en un futuro querré exportar más componentes proveniente de este archivo*/

export {Form}