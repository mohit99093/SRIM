const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true, useFindAndModify: false }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const allcoursesRouter = require('./routes/allcourses');
const TagsRouter = require('./routes/Tags')
const ProfessorRouter = require('./routes/Professor')
const Student = require("./routes/Student")
const alltopicsRouter = require("./routes/alltopics")
const adminRouter = require("./routes/admin")
const AuthRouter = require("./routes/Auth.routes")
const studentdataRouter = require("./routes/studentdata")
const professordataRouter = require("./routes/professordata")
const ChatRouter = require("./routes/Chat")
// const usersRouter = require('./routes/users');
app.use('/allcourses', allcoursesRouter);
app.use('/Tags', TagsRouter);
app.use('/professor', ProfessorRouter);
app.use('/student',Student)
app.use("/alltopics",alltopicsRouter)
app.use("/Admin", adminRouter)
app.use("/", AuthRouter)
app.use("/studentdata", studentdataRouter)
app.use("/professordata", professordataRouter)
app.use("/chat", ChatRouter)
// app.use('/users', usersRouter);

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


connection.on("connected", () => {
  console.log("Connected To Database...");
  io.on("connection", socket => {
    const { id } = socket.client;
    console.log(`User Connected: ${id}`);
    socket.leaveAll()
    socket.on("changeroom", (room)=>{
      try{
        console.log('[socket]','join room :',room)
        socket.leaveAll()
        socket.join(room);
       
      }catch(e){
        console.log('[error]','join room :',e);
      
      }
    })
    socket.on("c1", (msg ) => {
      console.log(msg);
      console.log(socket.rooms);
      let values = Object.values(socket.rooms)
      let room = values[values.length-1]
      io.sockets.in(room).emit("c1remote",  msg);
    });
  });
  
  });
