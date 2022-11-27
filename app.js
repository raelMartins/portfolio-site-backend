const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const visitorRouter = require('./routes/visitor.route');
const mediaRouter = require('./routes/media.route');
const organizationRouter = require('./routes/organization.route');
const projectRouter = require('./routes/project.route');
const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/appError');

const io = require('socket.io')(http, {
  cors: { origin: '*' }
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static('uploads'));

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION: Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 8080;

let DB = process.env.DB.replace('<PASSWORD>', process.env.DBPASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database Connected');
  });

// app.use('/image/:imageName', (req, res, next) => {
//   console.log(req);
//   res.renderFile(`/uploads/images/${req.imageName}`);
// });
// app.use('/video/:videoName', (req, res, next) => {
//   console.log(req);
//   res.renderFile(`/uploads/videos/${req.videoName}`);
// });
app.use('/api/v1/media', mediaRouter);
app.use('/api/v1/organization', organizationRouter);
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/visitor', visitorRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

//Socket functions

// io.on('connection', (socket) => {
//   console.log(`A user connected: ${socket.id}`);

//   socket.on('online', (user) => {
//     console.log(`User Online: ${user}, Socket ID: ${socket.id}`);
//     socket.broadcast.emit('user:online', { user, socketID: socket.id });
//   });
// });

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
