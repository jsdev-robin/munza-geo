import express, { Router } from 'express';
import { GadmServices } from '../services/gadm/GadmServices';

const router: Router = express.Router();

router.post('/create-many', GadmServices.createMany);

export default router;
