import express, { Router } from 'express';
import { AdministrativeServices } from '../services/administrative/AdministrativeServices';

const router: Router = express.Router();

router.get('/countries', AdministrativeServices.findCountries);
router.get('/division/:country', AdministrativeServices.findDivisionsByCountry);
router.get(
  '/district/:division',
  AdministrativeServices.findDistrictByDivision,
);
router.get('/upazila/:district', AdministrativeServices.findUpazilaByDistrict);
router.get('/union/:upazila', AdministrativeServices.findUnionByUpazila);
router.get('/village/:union', AdministrativeServices.findVillagesByUnion);
router.get('/hamlet/:village', AdministrativeServices.findVillagesByUnion);

export default router;
