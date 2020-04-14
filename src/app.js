const express = require('express');
const bodyParser = require('body-parser');
const covidEstimator = require('./estimator')
const O2x = require('object-to-xml');
const logger = require('./logger');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.get('/api/v1/on-covid-19/logs',(req,res) => {
  const stream = fs.createReadStream(__dirname + '/logs.log');
  stream.pipe(res);
});

app.use(logger);

app.post('/api/v1/on-covid-19',(req,res) => {
  const result = covidEstimator(req.body)
  res.status(201).json({Estimation:result})
 });

app.post('/api/v1/on-covid-19/:format',(req,res) => {
 const result = covidEstimator(req.body)
 if (req.params.format === 'json') {
  res.status(201).json({result:result})
 }else{
   res.send(O2x({
     '?xml version=\"1.0\" encoding=\"iso-8859-1\"?':null,
     result
   }))
 }
  
});

module.exports = app;