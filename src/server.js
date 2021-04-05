const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/material-dashboard-angular2-master'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/material-dashboard-angular2-master/index.html'));