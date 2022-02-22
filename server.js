const express = require('express')
app = express()
port = process.env.PORT || 3000;
mongoose = require('mongoose')
const uri = "mongodb://127.0.0.1:27017";
Data = require('./api/models/tendoAppModel')

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  }).then(res=>{
   console.log("DB Connected!")
  }).catch(err => {
   console.log(Error, err.message);
 })

 app.use(express.urlencoded({ extended: true }))
 app.use(express.json());

 const routes = require('./api/routes/tendoAppRoutes');
 routes(app);

 app.get('*', (req, res)=>{
  res.status(404).send({url: req.originalUrl + ' not found'})
  })


app.use(express.json)
app.listen(port);
console.log('RESTful API server started on: ' + port);