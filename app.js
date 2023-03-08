import express from "express"  //import express
const app = express()               //create express app
const port = 80                     //set port as 80
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import path from "path";
import authRoutes from './routes/auth.js';


app.use('/static', express.static(path.join('static')));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
const __dirname = path.resolve();

app.use('/auth', authRoutes);
// My Routes
app.get('/', (req, res) => {
    res.status(200).json({
      message: `Server is up and running on port ${process.env.PORT || 8000}`,
    });
});

app.get('/auth/signup', (req, res) => {
  res.sendFile('/public/form.html',{ root : __dirname})
    });

// Starting the server
app.listen(port, () => {
    console.log(`Server is up running on port ${port}🚀`);
  });

// MongoDB Connection
const URI = 'mongodb+srv://pranavz02:TeRxaoV8nX73MK7u@cluster0.dumnfge.mongodb.net/userData?retryWrites=true&w=majority'

try {
    mongoose.connect(URI, {
    //   useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect to DB!');
  } catch (error) {
    console.log('Error connecting to DB: ', error);
  };

