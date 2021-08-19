import express from 'express';
import dotenv from 'dotenv';

//import routes from './routes';

const app = express();

app.use(express.json());
//app.use(routes);

dotenv.config();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});