# 🌐 Administrative Services API (GADM)

A high-performance Node.js/TypeScript API designed to serve hierarchical geographical data. This service utilizes the **GADM (Global Administrative Areas)** dataset to provide a drill-down interface for administrative boundaries.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Hierarchy Levels](#-hierarchy-levels)
- [API Endpoints](#-api-endpoints)
- [Data Schema & Indexing](#-data-schema--indexing)
- [Validation](#-validation)

---

## ✨ Features

- **Hierarchical Drill-Down:** Seamlessly navigate from country level down to local wards/unions.
- **Auto-Level Detection:** The root endpoint calculates the maximum administrative depth available for each country.
- **Optimized Queries:** Uses MongoDB aggregation pipelines with indexed fields for sub-second responses.
- **Type Safety:** Fully implemented in TypeScript with strict interface definitions.

---

## 🛠 Tech Stack

- **Runtime:** Node.js (TypeScript)
- **Framework:** Express.js
- **Database:** MongoDB via Mongoose
- **Validation:** Express-Validator
- **Architecture:** Controller-Service Pattern

---

## 🗂 Hierarchy Levels

The API follows a parent-name filtering logic. To fetch children, you must pass the string name of the immediate parent.

| Level | Description            | MongoDB Property |
| :---- | :--------------------- | :--------------- |
| **0** | Country                | `COUNTRY`        |
| **1** | Division / State       | `NAME_1`         |
| **2** | District / County      | `NAME_2`         |
| **3** | Upazila / Sub-District | `NAME_3`         |
| **4** | Union / Parish         | `NAME_4`         |
| **5** | Sub-Union / Ward       | `NAME_5`         |
| **6** | Local Area             | `NAME_6`         |

---

## 🔗 API Endpoints

### 1. Get All Countries

`GET /api/administrative/name-0`
Returns a list of all countries including their GID and the maximum administrative level depth supported.

### 2. Get Divisions (Level 1)

`GET /api/administrative/name-1/:name_0`

- **Param:** `name_0` (The Country Name, e.g., `Bangladesh`)

### 3. Get Districts (Level 2)

`GET /api/administrative/name-2/:name_1`

- **Param:** `name_1` (The Division Name, e.g., `Dhaka`)

### 4. Get Upazilas (Level 3)

`GET /api/administrative/name-3/:name_2`

- **Param:** `name_2` (The District Name, e.g., `Manikganj`)

### 5. Get Unions (Level 4)

`GET /api/administrative/name-4/:name_3`

- **Param:** `name_3` (The Upazila Name)

> **Note:** Endpoints for Level 5 and Level 6 follow the same pattern (`/name-5/:name_4` and `/name-6/:name_5`).

---

## 📦 Data Schema & Indexing

The `gadm` collection is optimized for read-heavy operations. The following indexes are applied to ensure high-speed filtering:

```typescript
// Example Indexes applied in Mongoose
GadmSchema.index({ 'properties.NAME_1': 1 });
GadmSchema.index({ 'properties.NAME_2': 1 });
GadmSchema.index({ 'properties.NAME_3': 1 });
GadmSchema.index({ 'properties.NAME_4': 1 });
```
