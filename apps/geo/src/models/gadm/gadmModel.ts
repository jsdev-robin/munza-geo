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
      GID_4: { type: String, required: true },
      GID_0: { type: String, required: true },
      COUNTRY: { type: String, required: true },
      GID_1: { type: String, required: true },
      NAME_1: { type: String, required: true },
      GID_2: { type: String, required: true },
      NAME_2: { type: String, required: true },
      GID_3: { type: String, required: true },
      NAME_3: { type: String, required: true },
      NAME_4: { type: String, required: true },
      VARNAME_4: { type: String },
      TYPE_4: { type: String, required: true },
      ENGTYPE_4: { type: String, required: true },
      CC_4: { type: String, required: true },
    },
    geometry: {
      type: {
        type: String,
        enum: ['MultiPolygon'],
        required: true,
      },
      coordinates: {
        type: [[[[Number]]]],
        required: true,
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
