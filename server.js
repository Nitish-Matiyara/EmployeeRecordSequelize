const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT= process.env.PORT || 7000;
const db = require("./connections/db")
const  sequelize = db.sequelize;
const employeeRouter = require("./routes/apiRouter")
 
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

app.use('/employee', employeeRouter)
  
sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
 

app.listen(PORT, ()=>{
    console.log(`server is listening  on ${PORT}`);
}); 
  
  
module.exports = app;