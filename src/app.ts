var express = require('express');
var cors = require('cors');
var path = require('path');
var logger = require('morgan');
import { router as feedsRouter } from './routes/feeds-route';

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(feedsRouter);

module.exports = app;
