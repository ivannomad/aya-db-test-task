import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./spec/swagger.js";
import cors from "cors";
import express from "express";
import api from "./routes/api.js";

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

// For passing text/plain content-type as request body
app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});

app.use('/', api());

export default app;