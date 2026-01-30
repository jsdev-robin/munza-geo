import { catchAsync, HttpStatusCode, Status } from '@server/utils';
import { Request, RequestHandler, Response } from 'express';
import { gdamModel } from '../../models/gadm/gadmModel';

export class GadmServices {
  static createMany: RequestHandler = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      await gdamModel.insertMany(req.body);

      res.status(HttpStatusCode.CREATED).json({
        status: Status.SUCCESS,
        message: 'Warehouse updated successfully.',
      });
    },
  );
}
