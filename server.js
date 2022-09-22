const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT= process.env.PORT || 7000;
const db = require("./connections/db")
const  sequelize = db.sequelize;
const employeeRouter = require("./routes/apiRouter")
const empSettingRouter = require("./routes/empSettingRouter")
const empCompanyRouter = require("./routes/empCompanyRouter")
const empProjectRouter = require("./routes/empProjectRouter")
 
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

app.use('/employee', employeeRouter)
app.use('/api', empSettingRouter )
app.use('/empCompany', empCompanyRouter )
app.use('/empProject', empProjectRouter)
  
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