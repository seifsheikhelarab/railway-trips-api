# Railway Trips REST API

## Overview

This is a simple REST API for managing railway trips. The API allows users to:

- Fetch a list of trips with optional filters, sorting, and pagination.
- Schedule a new trip with required details.

## Technologies Used

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/seifsheikhelarab/railway-trips-api
   cd railway-trips-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=<your_mongodb_connection_string>
   PORT=3000
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### 1. Fetch All Trips

**Endpoint:** `GET /api/trips`

#### Query Parameters (Optional)

- **Pagination:** `?page=2&limit=15`
- **Date range:** `?date_from=23-04-2024&date_till=12-07-2024`
- **Sorting:** `?sort=destination,passengers,-startDate`
- **Filtering:** `?departure=Cairo&destination=Luxor`

#### Example Request

```sh
GET /api/trips?page=1&limit=10&departure=Cairo&destination=Luxor&sort=-startDate
```

### 2. Schedule a New Trip

**Endpoint:** `POST /api/trips`

#### Request Body (JSON)

```json
{
  "departurePlace": "Cairo",
  "destination": "Luxor",
  "startDate": "23-04-2024",
  "duration": 5,
  "numberOfPassengers": 2
}
```

#### Validation Rules

- All fields are **required**.
- `startDate` format: **DD-MM-YYYY**.
- `numberOfPassengers` must be **greater than 1**.

## License

This project is open-source. Feel free to use and modify it!

