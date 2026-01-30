import express, { Router } from 'express';
import { AdministrativeServices } from '../services/administrative/AdministrativeServices';

const router: Router = express.Router();

router.get('/countries', AdministrativeServices.COUNTRY);
router.get('/name-1/:name_0', AdministrativeServices.NAME_1);
router.get('/name-2/:name_1', AdministrativeServices.NAME_2);
router.get('/name-3/:name_2', AdministrativeServices.NAME_3);
router.get('/name-4/:name_3', AdministrativeServices.NAME_4);
router.get('/name-5/:name_4', AdministrativeServices.NAME_5);
router.get('/name-6/:name_5', AdministrativeServices.NAME_6);

export default router;
