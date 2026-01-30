# Administrative Services API

This API provides hierarchical administrative data (Country → Division → District → Upazila → Union → Sub-union → Level 6) based on **GADM** data.

**Base URL:** `/api/administrative`

---

## Table of Contents

- [Hierarchy Levels](#hierarchy-levels)
- [Endpoints](#endpoints)
  - [GET /name-0](#get-name-0)
  - [GET /name-1/:name_0](#get-name-1name_0)
  - [GET /name-2/:name_1](#get-name-2name_1)
  - [GET /name-3/:name_2](#get-name-3name_2)
  - [GET /name-4/:name_3](#get-name-4name_3)
  - [GET /name-5/:name_4](#get-name-5name_4)
  - [GET /name-6/:name_5](#get-name-6name_5)
- [Response Format](#response-format)
- [Validation](#validation)
- [Examples](#examples)

---

## Hierarchy Levels

| Level | Name         | MongoDB Field |
| ----- | ------------ | ------------- |
| 0     | Country      | COUNTRY       |
| 1     | Division     | NAME_1        |
| 2     | District     | NAME_2        |
| 3     | Upazila      | NAME_3        |
| 4     | Union        | NAME_4        |
| 5     | Sub-union    | NAME_5        |
| 6     | Level 6 Area | NAME_6        |

---

## Endpoints

### GET /name-0

**Description:** Fetch all countries.  
**Parameters:** None

**Response:**

```json
{
  "status": "success",
  "message": "NAME_0 fetched successfully.",
  "payload": {
    "name_0": [
      { "gid": "BGD", "name": "Bangladesh", "level": 0 },
      { "gid": "IND", "name": "India", "level": 0 }
    ]
  }
}
```
