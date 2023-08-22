const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "empleados_crud"
});


// Establecer conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    


    const insertQuery = 'INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [nombre, edad, pais, cargo, anios], (err, result) => {
        if (err) {
            console.error("Error al insertar empleado:", err);
            res.status(500).json({ error: "Error al insertar empleado" });
        } else {
            console.log("Empleado Registrado con éxito!!");
            res.status(201).json({ message: "Empleado Registrado con éxito!!" });
        }
    });
});

app.get("/empleados",(req,res)=>{
    const consultar = 'SELECT * FROM empleados';
    db.query(consultar,
        (err, result) => {
        if (err) {
            console.error("Error al buscar empleados:", err);
            res.status(500).json({ error: "Error al insertar empleado" });
        } else {
            res.send(result);
        }
    });
});

app.put("/update",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    const id = req.body.id;


    const insertQuery = 'UPDATE empleados SET nombre = ?,edad = ?,pais = ?,cargo = ? WHERE id = ?';
    db.query(insertQuery, [nombre, edad, pais, cargo, anios,id], (err, result) => {
        if (err) {
            console.error("Error al actualizar empleado:", err);
            res.status(500).json({ error: "Error al insertar empleado" });
        } else {
           
            res.send("empleado actualizado con exitos pai")
        }
    });
});



const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`Corriendo en el puerto ${PORT}`)
})