const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');
// GET Personas
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM apideliv_deliverymagni.zpersonas order by fechaCreacion asc', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

  router.get('/:idturno',(req, res)=>{ 
        const {idturno}=req.params;
        mysqlConnection.query('SELECT * FROM apideliv_deliverymagni.turno INNER JOIN apideliv_deliverymagni.zpersonas ON turno.dni = zpersonas.dni INNER JOIN apideliv_deliverymagni.sala ON turno.idsala = sala.idsala  WHERE idturno = ?',[idturno ], (err,rows, fields)=>{
             if (!err){
                res.json(rows[0]);
            }else{
                console.log (err);
            }
        });
    });

   router.post('/addPersona', function (req, res) {
    var params  = req.body;
    console.log(params);
    mysqlConnection.query('INSERT INTO apideliv_deliverymagni.zpersonas SET ?', params, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 router.get('/ap1/salas', (req, res) => {
  mysqlConnection.query('SELECT * FROM apideliv_deliverymagni.sala', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

router.post('/ap2/addTurno', function (req, res) {
  var params  = req.body;
  console.log(params);
  mysqlConnection.query('INSERT INTO apideliv_deliverymagni.turno SET ?', params, function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
});

// GET Turno
router.get('/ap3/turnos', (req, res) => {
  mysqlConnection.query('SELECT * FROM apideliv_deliverymagni.turno INNER JOIN apideliv_deliverymagni.zpersonas ON turno.dni = zpersonas.dni INNER JOIN apideliv_deliverymagni.sala ON turno.idsala = sala.idsala order by idturno desc', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

router.delete('/ap4/delete/:idturno', (req, res) => {
  const { idturno } = req.params;
  mysqlConnection.query('DELETE FROM apideliv_deliverymagni.turno WHERE idturno = ?', [idturno], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Eliminado'});
    } else {
      console.log(err);
    }
  });
});



router.get('/ap5/fechas', (req, res) => {
  mysqlConnection.query('SELECT fecha FROM apideliv_deliverymagni.turno', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    
    } else {
      console.log(err);
    }
  });  
});



module.exports = router;