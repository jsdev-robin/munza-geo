import { catchAsync, HttpStatusCode, Status } from '@server/utils';
import { Request, RequestHandler, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { gdamModel } from '../../models/gadm/gadmModel';

export class GadmServices {
  static createMany: RequestHandler = catchAsync(
    async (_req: Request, res: Response): Promise<void> => {
      const filePath = path.join(
        process.cwd(),
        'apps/geo/src/data/gadm41_DEU_4.json',
      );

      const fileData = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileData);

      const features = jsonData.features;

      await gdamModel.insertMany(features);

      res.status(HttpStatusCode.CREATED).json({
        status: Status.SUCCESS,
        message: 'GADM data uploaded successfully',
      });
    },
  );
}
