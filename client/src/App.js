import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


function App() {

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [anios, setAnios] = useState('');
  const [id, setId] = useState('');
  const [empleadosList, setEmpleados] = useState([]);

  
  const [editar, setEditar] = useState(false);

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
  
  }


  const add = () => {
    Axios.post('http://localhost:3001/create', {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      MySwal.fire({
        title: <strong>Empleado {nombre} Agregado!</strong>,
        timer : 3000,
        icon: 'success'
      })
      limpiarCampos();
    })
  }

  const update = () => {
    Axios.put('http://localhost:3001/update', {
      id:id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then((r) => {
      getEmpleados();
      MySwal.fire({
        title: <strong>Empleado {nombre} Actualizado!</strong>,
        timer : 3000,
        icon: 'success'
      })
      limpiarCampos();
    })
  }

   const Delete = () => {
    Axios.delete('http://localhost:3001/delete', {
      id:id,
    }).then((r) => {
      alert(r);
      MySwal.fire({
        title: <strong>Empleado  Eliminado!</strong>,
        timer : 3000,
        icon: 'success'
      })
      getEmpleados();
    })
  }

  const limpiarCampos = () => {
    setAnios("");
    setNombre("");
    setPais("");
    setCargo("");
    setEdad("");
    setEditar(false);
  }


  const getEmpleados = () => {
    Axios.get('http://localhost:3001/empleados').then((response) => {
      setEmpleados(response.data);
    })
  }

  getEmpleados();

  return (
    <div className='container'>


      <div className='card text-center'>
        <div className='card-header'>
          GESTION DE EMPLEADOS
        </div>
        <div className='card-body'>
          <div className='mb-3'>
            <label for='exampleFormControlInput1'  className='form-label'>Nombre</label>
            <input type='text' value={nombre} className='form-control' id='Nombre' placeholder='Kevins Vega' onChange={(event) => { setNombre(event.target.value) }} />
          </div>

          <div className='mb-3'>
            <label for='exampleFormControlInput1'  className='form-label'>Edad</label>
            <input type='number' value={edad} className='form-control' id='Edad' placeholder='Numero' onChange={(event) => { setEdad(event.target.value) }} />
          </div>

          <div className='mb-3'>
            <label for='exampleFormControlInput1'  className='form-label'>Pais</label>
            <input type='text' value={pais} className='form-control' id='Pais' placeholder='Pais de origen' onChange={(event) => { setPais(event.target.value) }} />
          </div>

          <div className='mb-3'>
            <label for='exampleFormControlInput1' value={cargo} className='form-label'>Cargo</label>
            <input type='text' value={cargo} className='form-control' id='Cargo' placeholder='Pais de origen' onChange={(event) => { setCargo(event.target.value) }} />
          </div>        
          
          <div className='mb-3'>
            <label for='exampleFormControlInput1' className='form-label'>Años</label>
            <input type='text' value={anios} className='form-control' id='Anios' placeholder='Pais de origen' onChange={(event) => { setAnios(event.target.value) }} />
          </div>        

        </div>
        <div className='card-footer text-body-secondary'>
          {
            editar?
            <div>
            <button className='btn  btn-warning m-2 ' onClick={update} >Actualizar</button>
            <button className='btn  btn-danger m-2 ' onClick={limpiarCampos} >Cancelar</button>
            </div>
            :<button className='btn  btn-success' onClick={add} >Registrar</button>
          }
        
        </div>
      </div>

      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Edad</th>
            <th scope='col'>Pais</th>
            <th scope='col'>Cargo</th>
            <th scope='col'>Experiencia</th>
            <th scope='col'>Funciones</th>
          </tr>
        </thead>

        <tbody>
        {
            empleadosList.map((val, key) => {
              return <tr className='table-active'>
                      <th scope='row'>{val.id}</th>
                      <th scope='row'>{val.nombre}</th>
                      <th scope='row'>{val.edad}</th>
                      <th scope='row'>{val.pais}</th>
                      <th scope='row'>{val.cargo}</th>
                      <th scope='row'>{val.anios}</th>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-info" onClick={(event)=>{
                          editarEmpleado(val);
                        }}>Editar</button>
                        <button type="button" className="btn btn-danger" onClick={(event)=>{
                          Delete(val.id);
                        }}>Eliminar</button>
                      </div>
                    </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
