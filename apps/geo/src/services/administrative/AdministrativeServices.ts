import { catchAsync, HttpStatusCode, Status } from '@server/utils';
import { Request, RequestHandler, Response } from 'express';
import { gdamModel } from '../../models/gadm/gadmModel';

export class AdministrativeServices {
  static NAME_0: RequestHandler = catchAsync(async (_req, res) => {
    const name_0 = await gdamModel.aggregate([
      {
        $group: {
          _id: '$properties.GID_0',
          name_0: { $first: '$properties.COUNTRY' },
          name_1: { $first: '$properties.NAME_1' },
          name_2: { $first: '$properties.NAME_2' },
          name_3: { $first: '$properties.NAME_3' },
          name_4: { $first: '$properties.NAME_4' },
          name_5: { $first: '$properties.NAME_5' },
          name_6: { $first: '$properties.NAME_6' },
        },
      },
      {
        $addFields: {
          level: {
            $switch: {
              branches: [
                { case: { $ifNull: ['$name_6', false] }, then: 6 },
                { case: { $ifNull: ['$name_5', false] }, then: 5 },
                { case: { $ifNull: ['$name_4', false] }, then: 4 },
                { case: { $ifNull: ['$name_3', false] }, then: 3 },
                { case: { $ifNull: ['$name_2', false] }, then: 2 },
                { case: { $ifNull: ['$name_1', false] }, then: 1 },
              ],
              default: 0,
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          gid: '$_id',
          name: '$name_0',
          level: 1,
        },
      },
      { $sort: { name: 1 } },
    ]);

    res.status(200).json({
      status: Status.SUCCESS,
      message: 'NAME_0 fetched successfully.',
      payload: { name_0 },
    });
  });

  static NAME_1: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { name_0 } = req.params;

      const name_1 = await gdamModel.aggregate([
        { $match: { 'properties.COUNTRY': name_0 } },
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
        message: 'NAME_1 fetched successfully.',
        payload: {
          name_1,
        },
      });
    },
  );

  static NAME_2: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { name_1 } = req.params;

      const name_2 = await gdamModel.aggregate([
        { $match: { 'properties.NAME_1': name_1 } },
        {
          $group: {
            _id: '$properties.GID_2',
            name: { $first: '$properties.NAME_2' },
          },
        },
        { $project: { _id: 0, gid: '$_id', name: 1 } },
        { $sort: { name: 1 } },
      ]);

      res.status(200).json({
        status: 'success',
        message: 'NAME_2 fetched successfully.',
        payload: {
          name_2,
        },
      });
    },
  );

  static NAME_3: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { name_2 } = req.params;

      const name_3 = await gdamModel.aggregate([
        { $match: { 'properties.NAME_2': name_2 } },
        {
          $group: {
            _id: '$properties.GID_3',
            name: { $first: '$properties.NAME_3' },
          },
        },
        { $project: { _id: 0, gid: '$_id', name: 1 } },
        { $sort: { name: 1 } },
      ]);

      res.status(200).json({
        status: 'success',
        message: 'NAME_3 fetched successfully.',
        payload: {
          name_3,
        },
      });
    },
  );

  static NAME_4: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { name_3 } = req.params;

      const name_4 = await gdamModel.aggregate([
        { $match: { 'properties.NAME_3': name_3 } },
        {
          $group: {
            _id: '$properties.GID_4',
            name: { $first: '$properties.NAME_4' },
          },
        },
        { $project: { _id: 0, gid: '$_id', name: 1 } },
        { $sort: { name: 1 } },
      ]);

      res.status(200).json({
        status: 'success',
        message: 'NAME_4 fetched successfully.',
        payload: {
          name_4,
        },
      });
    },
  );

  static NAME_5: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { name_4 } = req.params;

      const name_5 = await gdamModel.aggregate([
        { $match: { 'properties.NAME_4': name_4 } },
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
        message: 'NAME_5 fetched successfully.',
        payload: {
          name_5,
        },
      });
    },
  );

  static NAME_6: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { name_5 } = req.params;

      const name_6 = await gdamModel.aggregate([
        { $match: { 'properties.NAME_5': name_5 } },
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
        message: 'NAME_6 fetched successfully.',
        payload: {
          name_6,
        },
      });
    },
  );
}
