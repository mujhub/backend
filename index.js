import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import schema from './src/schema';
import models from './src/models';
import logger from './config/winston';

// if server is started using `npm start`, it will use .dev.env file to populate variables.
if (process.env.ENV === 'dev') dotenv.config({ path: '.dev.env' });
else dotenv.config({ path: '.env' });

const app = express();

const options = {
  keepAlive: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.DB_URI, options);

// Mongoose models are provided in context.
const server = new ApolloServer({
  schema,
  tracing: true,
  context: {
    models,
  },
  logger,
  plugins: [
    {
      requestDidStart() {
        return {
          didEncounterErrors(requestContext) {
            requestContext.logger.error(requestContext.errors);
          },
        };
      },
    },
  ],
});

// Applies cors, bodyparser middleware and stuff too.
server.applyMiddleware({ app, path: '/api' });

app.use(morgan('combined', { stream: logger.stream }));
app.listen(3000, () => {
  logger.info(
    `Apollo server listening at http://localhost:3000${server.graphqlPath}`,
  );
});
