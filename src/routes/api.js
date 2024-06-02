import express from 'express';
import mainController from "../contorller/MainController.js";

export default () => {
  const router = express.Router();

  router.get('/rewards', mainController.getRewardForEmployee);
  router.post('/import/custom-dump', mainController.importCustomDumpFile);

  return router;
}