import { catchAsync, HttpStatusCode, Status } from '@server/utils';
import { Request, RequestHandler, Response } from 'express';
import { gdamModel } from '../../models/gadm/gadmModel';

export class AdministrativeServices {
  static findCountries: RequestHandler = catchAsync(
    async (_req: Request, res: Response): Promise<void> => {
      const countries = await gdamModel.aggregate([
        { $group: { _id: '$properties.COUNTRY' } },
        { $project: { _id: 0, name: '$_id' } },
        { $sort: { name: 1 } },
      ]);

      res.status(HttpStatusCode.OK).json({
        status: Status.SUCCESS,
        message: 'Countries fetched successfully.',
        payload: countries,
      });
    },
  );

  static findDivisionsByCountry: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { country } = req.params;

      const divisions = await gdamModel.aggregate([
        { $match: { 'properties.COUNTRY': country } },
        {
          $group: {
            _id: '$properties.GID_1',
            name: { $first: '$properties.NAME_1' },
          },
        },
        { $project: { _id: 0, gid: '$_id', name: 1 } },
        { $sort: { name: 1 } },
      ]);

      res.status(HttpStatusCode.OK).json({
        status: Status.SUCCESS,
        message: 'Divisions fetched successfully.',
        payload: divisions,
      });
    },
  );

  static findDistrictByDivision: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { division } = req.params;

      const districts = await gdamModel.aggregate([
        {
          $match: {
            'properties.NAME_1': division,
          },
        },
        {
          $group: {
            _id: '$properties.GID_2',
            name: { $first: '$properties.NAME_2' },
          },
        },
        {
          $project: {
            _id: 0,
            gid: '$_id',
            name: 1,
          },
        },
        { $sort: { name: 1 } },
      ]);

      res.status(200).json({
        status: 'success',
        message: 'Divisions fetched successfully.',
        payload: districts,
      });
    },
  );

  static findUpazilaByDistrict: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { district } = req.params;

      const upazila = await gdamModel.aggregate([
        {
          $match: {
            'properties.NAME_2': district,
          },
        },
        {
          $group: {
            _id: '$properties.GID_3',
            name: { $first: '$properties.NAME_3' },
          },
        },
        {
          $project: {
            _id: 0,
            gid: '$_id',
            name: 1,
          },
        },
        { $sort: { name: 1 } },
      ]);

      res.status(200).json({
        status: 'success',
        message: 'Upazila fetched successfully for the selected district.',
        payload: upazila,
      });
    },
  );

  static findUnionByUpazila: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { upazila } = req.params;

      const unions = await gdamModel.aggregate([
        {
          $match: {
            'properties.NAME_3': upazila,
          },
        },
        {
          $group: {
            _id: '$properties.GID_4',
            name: { $first: '$properties.NAME_4' },
          },
        },
        {
          $project: {
            _id: 0,
            gid: '$_id',
            name: 1,
          },
        },
        { $sort: { name: 1 } },
      ]);

      res.status(200).json({
        status: 'success',
        message: 'Unions fetched successfully for the selected sub-district.',
        payload: unions,
      });
    },
  );

  static findVillagesByUnion: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { union } = req.params;

      const villages = await gdamModel.aggregate([
        { $match: { 'properties.NAME_4': union } },
        {
          $group: {
            _id: '$properties.GID_5',
            name: { $first: '$properties.NAME_5' },
          },
        },
        { $project: { _id: 0, gid: '$_id', name: 1 } },
        { $sort: { name: 1 } },
      ]);

      res.status(200).json({
        status: Status.SUCCESS,
        message: 'Villages fetched successfully.',
        payload: villages,
      });
    },
  );

  static findHamletsByVillage: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { village } = req.params;

      const hamlets = await gdamModel.aggregate([
        { $match: { 'properties.NAME_5': village } },
        {
          $group: {
            _id: '$properties.GID_6',
            name: { $first: '$properties.NAME_6' },
          },
        },
        { $project: { _id: 0, gid: '$_id', name: 1 } },
        { $sort: { name: 1 } },
      ]);

      res.status(200).json({
        status: Status.SUCCESS,
        message: 'Hamlets fetched successfully.',
        payload: hamlets,
      });
    },
  );
}
