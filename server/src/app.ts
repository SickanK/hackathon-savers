import cookieParser from 'cookie-parser';
import MainRouter from './routes';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express';
dotenv.config({ path: '../env' });

const app = express();

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Acces-Control-Allow-Headers, Content-Type, Authorization');

  next();
});
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.json({ type: 'application/*+json' }));
const port = 3030;

app.use('/', MainRouter);

// define a route handler for the default home page

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
