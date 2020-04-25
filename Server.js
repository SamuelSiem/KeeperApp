require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost:27017/KeeperDB'),{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = new mongoose.model("Note", noteSchema);

app.get('/api', function(req,res){
  Note.find({})
    .then((data)=>{
      res.json(data);
    })
    .catch((error)=>{
      console.log(error);
    });
});

app.post('/save', function(req,res){
  const newNote = new Note(req.body);

  newNote.save(error =>{
    if(error){
      console.log(error);
    }else{
      res.json({msg: 'data inserted to mongodb/KepperDB/Notes'});
    }
  });
});

app.post('/delete', function(req, res){
  Note.deleteOne(req.body, function(err){
    if(err){
      console.log(err);
    }else{
      res.json({msg: 'successfully deleted the note'});
    }
  });
});

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}

app.listen((process.env.PORT || 8000)), function(){
  console.log("Server is running on port"+process.env.PORT);
});
