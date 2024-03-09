require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

dbConnect(); // connect to database mongodb

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// main routes
app.use('/api/user', require('./routes/authR'))
app.use('/api/product', require('./routes/productR'))

// error handlers
app.use(notFound);
app.use(errorHandler);

// run main
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});