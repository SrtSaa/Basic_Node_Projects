require('dotenv').config();
require('express-async-errors');
// const cors=require('cors');
const express = require('express');
const filestore = require('./routes/routes');
const fileUpload = require('express-fileupload');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


const app = express();


// error handler
app.use(express.json());
app.use( fileUpload({createParentPath: true})  );

// routes
// app.use(cors());
// app.options("*",cors());

app.use("/filehandle", filestore);



//error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 7001;


const start = async() => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};



start();