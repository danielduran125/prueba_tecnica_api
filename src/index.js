const express = require('express');
const app = express();
const cors = require('cors');


// Settings
app.set('port', process.env.PORT || 3000);
app.use(cors());

// Middlewares
app.use(express.json());

// Routes
app.use(require('./rutas/personas'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});