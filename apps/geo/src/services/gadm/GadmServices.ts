import { catchAsync, HttpStatusCode, Status } from '@server/utils';
import { Request, RequestHandler, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { gdamModel } from '../../models/gadm/gadmModel';

export class GadmServices {
  static createMany: RequestHandler = catchAsync(
    async (_req: Request, res: Response): Promise<void> => {
      const folderPath = path.join(process.cwd(), 'apps/geo/src/data');
      const files = fs.readdirSync(folderPath);

      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(folderPath, file);
          const fileData = fs.readFileSync(filePath, 'utf-8');
          const jsonData = JSON.parse(fileData);

          const features = jsonData.features;
          if (Array.isArray(features) && features.length > 0) {
            await gdamModel.insertMany(features);
          }
        }
      }

      res.status(HttpStatusCode.CREATED).json({
        status: Status.SUCCESS,
        message: 'All GADM JSON files uploaded successfully',
      });
    },
  );
}
