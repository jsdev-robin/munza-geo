import { Schema, model } from 'mongoose';
import { IGadm } from './types';

const GadmSchema = new Schema<IGadm>(
  {
    type: {
      type: String,
      enum: ['Feature'],
      required: true,
    },
    properties: {
      GID_4: { type: String },
      GID_0: { type: String },
      COUNTRY: { type: String },
      GID_1: { type: String },
      NAME_1: { type: String },
      GID_2: { type: String },
      NAME_2: { type: String },
      GID_3: { type: String },
      NAME_3: { type: String },
      NAME_4: { type: String },
      VARNAME_4: { type: String },
      TYPE_4: { type: String },
      ENGTYPE_4: { type: String },
      CC_4: { type: String },
    },
    geometry: {
      type: {
        type: String,
        enum: ['MultiPolygon'],
      },
      coordinates: {
        type: [[[[Number]]]],
      },
    },
  },
  { timestamps: true },
);

// GEO
// GadmSchema.index({ geometry: '2dsphere' });

// Division
GadmSchema.index({ 'properties.GID_1': 1 });
GadmSchema.index({ 'properties.NAME_1': 1 });

// District
GadmSchema.index({ 'properties.GID_2': 1 });
GadmSchema.index({ 'properties.NAME_2': 1 });

// Upazila
GadmSchema.index({ 'properties.GID_3': 1 });
GadmSchema.index({ 'properties.NAME_3': 1 });

// Union
GadmSchema.index({ 'properties.GID_4': 1 });
GadmSchema.index({ 'properties.NAME_4': 1 });
GadmSchema.index({ 'properties.CC_4': 1 });

export const gdamModel = model<IGadm>('gadm', GadmSchema);
