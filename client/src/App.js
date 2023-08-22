import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState(0);
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
      alert('Empleado Registrado');
    })
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
            <label for='exampleFormControlInput1' className='form-label'>Nombre</label>
            <input type='text' className='form-control' id='Nombre' placeholder='Kevins Vega' onChange={(event) => { setNombre(event.target.value) }} />
          </div>

          <div className='mb-3'>
            <label for='exampleFormControlInput1' className='form-label'>Edad</label>
            <input type='number' className='form-control' id='Edad' placeholder='Numero' onChange={(event) => { setEdad(event.target.value) }} />
          </div>

          <div className='mb-3'>
            <label for='exampleFormControlInput1' className='form-label'>Pais</label>
            <input type='text' className='form-control' id='Pais' placeholder='Pais de origen' onChange={(event) => { setPais(event.target.value) }} />
          </div>

          <div className='mb-3'>
            <label for='exampleFormControlInput1' className='form-label'>Cargo</label>
            <input type='text' className='form-control' id='Cargo' placeholder='Pais de origen' onChange={(event) => { setCargo(event.target.value) }} />
          </div>        
          
          <div className='mb-3'>
            <label for='exampleFormControlInput1' className='form-label'>Años</label>
            <input type='text' className='form-control' id='Anios' placeholder='Pais de origen' onChange={(event) => { setAnios(event.target.value) }} />
          </div>        

        </div>
        <div className='card-footer text-body-secondary'>
        <button className='btn  btn-success' onClick={add} >Registrar</button>
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
                        <button type="button" className="btn btn-info" onClick={()=>{
                          editarEmpleado(val)
                        }}>Editar</button>
                        <button type="button" className="btn btn-danger">Eliminar</button>
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
