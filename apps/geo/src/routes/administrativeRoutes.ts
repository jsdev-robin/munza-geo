import { validationRequest } from '@server/middlewares';
import express, { Router } from 'express';
import { param } from 'express-validator';
import { AdministrativeServices } from '../services/administrative/AdministrativeServices';

const router: Router = express.Router();

router.get('/name-0', AdministrativeServices.NAME_0);

router.get(
  '/name-1/:name_0',
  param('name_0').notEmpty().withMessage('name_0 is required'),
  validationRequest,
  AdministrativeServices.NAME_1,
);

router.get(
  '/name-2/:name_1',
  param('name_1').notEmpty().withMessage('name_1 is required'),
  validationRequest,
  AdministrativeServices.NAME_2,
);

router.get(
  '/name-3/:name_2',
  param('name_2').notEmpty().withMessage('name_2 is required'),
  validationRequest,
  AdministrativeServices.NAME_3,
);

router.get(
  '/name-4/:name_3',
  param('name_3').notEmpty().withMessage('name_3 is required'),
  validationRequest,
  AdministrativeServices.NAME_4,
);

router.get(
  '/name-5/:name_4',
  param('name_4').notEmpty().withMessage('name_4 is required'),
  validationRequest,
  AdministrativeServices.NAME_5,
);

router.get(
  '/name-6/:name_5',
  param('name_5').notEmpty().withMessage('name_5 is required'),
  validationRequest,
  AdministrativeServices.NAME_6,
);

export default router;
