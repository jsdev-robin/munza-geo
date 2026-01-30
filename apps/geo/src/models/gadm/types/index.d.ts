import { Document } from 'mongoose';

export interface IGadm extends Document {
  type: 'Feature';
  properties: {
    GID_4: string;
    GID_0: string;
    COUNTRY: string;
    GID_1: string;
    NAME_1: string;
    GID_2: string;
    NAME_2: string;
    GID_3: string;
    NAME_3: string;
    NAME_4: string;
    VARNAME_4: string;
    TYPE_4: string;
    ENGTYPE_4: string;
    CC_4: string;
    GID_5: string;
    NAME_5: string;
  };
  geometry: {
    type: 'MultiPolygon';
    coordinates: number[][][][];
  };
}
