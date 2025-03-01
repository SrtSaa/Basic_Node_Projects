require('dotenv').config();
require('express-async-errors');
const express = require('express');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const connectDB = require('./db/connect');
const productRouter = require('./routes/routes');

const app = express();


// middleware
app.use(express.json());


// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 3000;


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log((`Server is listening on port ${port}...`)));
    } 
    catch (err) {
        console.log(err);
    }
}



start();
    



