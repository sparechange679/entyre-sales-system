# Entyre Parts Catalog API Documentation

## Overview
This API provides endpoints for the Entyre car parts catalog system, specifically designed for roadside assistance and tire/parts sales. The system allows customers to browse parts, search by vehicle, and purchase parts online.

## Base URL
```
http://localhost/api/v1
```

---

## API Endpoints

### 1. Parts Categories

#### Get All Categories
```http
GET /api/v1/categories
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Tires",
    "slug": "tires",
    "description": "All types of vehicle tires including all-season, summer, and winter tires",
    "icon": "tire-icon",
    "is_active": true,
    "parts_count": 7
  }
]
```

#### Get Category by Slug
```http
GET /api/v1/categories/{slug}
```

**Example:**
```http
GET /api/v1/categories/tires
```

---

### 2. Vehicle Makes

#### Get All Makes
```http
GET /api/v1/vehicle-makes
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Toyota",
    "logo": null,
    "is_active": true,
    "vehicle_models_count": 4
  }
]
```

#### Get Make with Models
```http
GET /api/v1/vehicle-makes/{id}
```

---

### 3. Vehicle Models

#### Get All Models
```http
GET /api/v1/vehicle-models
```

**Query Parameters:**
- `make_id` (optional) - Filter by vehicle make

**Example:**
```http
GET /api/v1/vehicle-models?make_id=1
```

**Response:**
```json
[
  {
    "id": 1,
    "vehicle_make_id": 1,
    "name": "Corolla",
    "year_start": 2015,
    "year_end": null,
    "body_type": "Sedan",
    "vehicle_make": {
      "id": 1,
      "name": "Toyota"
    }
  }
]
```

---

### 4. Parts (Main Endpoints)

#### Get All Parts (Homepage/Catalog)
```http
GET /api/v1/parts
```

**Query Parameters:**
- `category_id` - Filter by category
- `tire_size` - Filter by tire size (e.g., "195/65R15")
- `brand` - Filter by brand
- `min_price` - Minimum price
- `max_price` - Maximum price
- `in_stock` - Show only in-stock items (true/false)
- `featured` - Show only featured items (true/false)
- `search` - Search by name, SKU, or brand
- `sort_by` - Sort field (default: created_at)
- `sort_order` - asc or desc (default: desc)
- `per_page` - Items per page (default: 15)

**Example:**
```http
GET /api/v1/parts?featured=true&in_stock=true&per_page=8
```

**Response:**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "category_id": 1,
      "sku": "TIRE-MICH-195-65-15",
      "name": "Michelin Primacy 4 195/65R15",
      "description": "High-performance all-season tire...",
      "brand": "Michelin",
      "tire_size": "195/65R15",
      "load_index": "91",
      "speed_rating": "V",
      "tire_type": "all-season",
      "tread_pattern": "Asymmetric",
      "price": "45000.00",
      "stock_quantity": 24,
      "is_active": true,
      "is_featured": true,
      "category": {
        "id": 1,
        "name": "Tires",
        "slug": "tires"
      },
      "primary_image": null
    }
  ],
  "per_page": 15,
  "total": 7
}
```

#### Get Featured Parts (For Homepage)
```http
GET /api/v1/parts/featured
```

Returns up to 8 featured, in-stock parts.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Michelin Primacy 4 195/65R15",
    "brand": "Michelin",
    "price": "45000.00",
    "tire_size": "195/65R15",
    "is_featured": true,
    "stock_quantity": 24,
    "category": {...},
    "primary_image": null
  }
]
```

#### Get Single Part
```http
GET /api/v1/parts/{id}
```

**Response includes:**
- Full part details
- Category information
- All images
- Compatible vehicle models with makes

#### Get Parts by Category
```http
GET /api/v1/parts/category/{categorySlug}
```

**Example:**
```http
GET /api/v1/parts/category/tires
```

#### Search Parts by Vehicle
```http
POST /api/v1/parts/search-by-vehicle
Content-Type: application/json

{
  "vehicle_model_id": 1
}
```

**Response:**
Returns all parts that fit the specified vehicle model.

---

### 5. Admin Endpoints (Require Authentication)

#### Get Low Stock Parts
```http
GET /api/v1/parts/low-stock
Authorization: Bearer {token}
```

Returns parts where stock_quantity <= min_stock_level.

#### Create New Part
```http
POST /api/v1/parts
Authorization: Bearer {token}
Content-Type: application/json

{
  "category_id": 1,
  "sku": "TIRE-TEST-001",
  "name": "Test Tire",
  "description": "Test description",
  "brand": "Test Brand",
  "tire_size": "195/65R15",
  "load_index": "91",
  "speed_rating": "V",
  "tire_type": "all-season",
  "price": 50000.00,
  "cost_price": 40000.00,
  "stock_quantity": 20,
  "min_stock_level": 5,
  "is_featured": true
}
```

#### Update Part
```http
PUT /api/v1/parts/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "price": 48000.00,
  "stock_quantity": 25
}
```

#### Delete Part
```http
DELETE /api/v1/parts/{id}
Authorization: Bearer {token}
```

---

## Common Use Cases

### 1. Homepage Featured Parts Display
```http
GET /api/v1/parts/featured
```

### 2. Customer Searches by Vehicle
**Step 1:** Get vehicle makes
```http
GET /api/v1/vehicle-makes
```

**Step 2:** Get models for selected make
```http
GET /api/v1/vehicle-models?make_id=1
```

**Step 3:** Search parts for selected model
```http
POST /api/v1/parts/search-by-vehicle
{
  "vehicle_model_id": 1
}
```

### 3. Browse Parts by Category
```http
GET /api/v1/parts/category/tires?in_stock=true&sort_by=price&sort_order=asc
```

### 4. Search Parts by Name/Brand
```http
GET /api/v1/parts?search=michelin&in_stock=true
```

### 5. Filter by Price Range
```http
GET /api/v1/parts?min_price=40000&max_price=60000&category_id=1
```

---

## Sample Data Included

### Vehicle Makes:
- Toyota, Honda, Nissan, Ford, Mazda, Hyundai, Kia, Volkswagen

### Vehicle Models:
- Toyota: Corolla, Camry, RAV4, Hilux
- Honda: Civic, Accord, CR-V
- Nissan: Altima, Rogue
- Ford: Ranger, Focus

### Tire Parts (7 items):
1. Michelin Primacy 4 195/65R15 - MWK 45,000
2. Goodyear EfficientGrip 205/55R16 - MWK 52,000
3. Bridgestone Turanza T005 215/60R16 - MWK 55,000
4. Continental CrossContact LX2 225/65R17 - MWK 68,000
5. Pirelli Scorpion ATR 265/70R16 - MWK 78,000
6. Yokohama BluEarth 185/60R15 - MWK 38,000
7. Dunlop Grandtrek AT3 205/70R15 - MWK 48,000

### Battery Parts (2 items):
1. Bosch S4 Silver 55Ah Battery - MWK 25,000
2. Varta Blue Dynamic 75Ah Battery - MWK 35,000

---

## Error Responses

### 404 Not Found
```json
{
  "message": "No query results for model..."
}
```

### 422 Validation Error
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "vehicle_model_id": [
      "The vehicle model id field is required."
    ]
  }
}
```

---

## Testing the API

You can test the API using:

1. **Browser:** Navigate to `http://localhost/api/v1/parts/featured`

2. **Postman:** Import endpoints and test

3. **cURL:**
```bash
curl http://localhost/api/v1/parts/featured
```

4. **JavaScript Fetch:**
```javascript
fetch('http://localhost/api/v1/parts/featured')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Database Schema

### Tables Created:
1. `vehicle_makes` - Car manufacturers
2. `vehicle_models` - Car models with year ranges
3. `parts_categories` - Product categories
4. `parts` - Main parts catalog
5. `part_fitments` - Links parts to compatible vehicles
6. `part_images` - Product images

### Key Relationships:
- Parts belong to Categories
- Parts can fit multiple Vehicle Models (many-to-many)
- Vehicle Models belong to Vehicle Makes
- Parts can have multiple Images

---

## Next Steps

1. **Add Authentication:** Implement Sanctum tokens for protected routes
2. **Add Image Upload:** Implement image upload functionality
3. **Add Shopping Cart:** Create cart/order endpoints
4. **Add Payment Integration:** Integrate Mpamba/Airtel Money
5. **Add Towing Services:** Create service request endpoints
6. **Add Admin Dashboard:** Build admin panel for inventory management

---

## Support

For questions or issues, contact the development team.
