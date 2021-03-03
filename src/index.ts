import dotenv from 'dotenv';
import express, {Router} from 'express';
import bodyParser from 'body-parser';

import subscriptionRoutes from './routes/subscription';

import {DB} from './database/init';
import {Logger} from './utils/Logger';
import {logError, clientError, notFound} from './middlewares';

process.on('unhandledRejection', (...error) => Logger.error('Unhandled Rejection', {error}));

dotenv.config();
DB.init();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => res.status(200).send({title: 'Public API'}));

app.use('/subscriptions', subscriptionRoutes(Router));

app.get('/favicon.ico', (req, res) => res.status(200).send());
app.use(notFound);
app.use(logError);
app.use(clientError);

app.listen(Number(process.env.PORT), process.env.HOSTNAME, () => {
  Logger.info(`Server started on http://${process.env.HOSTNAME}:${process.env.PORT}`, {port: process.env.PORT});
});
