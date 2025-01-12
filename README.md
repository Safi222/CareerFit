# CareerFit Backend Documentation

## Overview

CareerFit is a platform designed to assist fresh graduates in finding jobs by analyzing their CVs and providing insightful reviews. This backend API powers the CareerFit platform by handling user authentication, CV analysis, job recommendations, and more.

---
## Features

- **Job Search**: Search for job CV
- **Matching with Jobs**: Matches user CVs with relevant job listings based on skills, experience, and qualifications.
- **CV Scoring & Weaknesses**: Provides a score for each CV based on its match with job descriptions, along with feedback on areas for improvement.
- **Latest Job Listings**: Offers real-time job updates, categorized by industry and role, to help users stay up-to-date with the job market.
- **Scrollable Job Feed**: Users can scroll through available jobs with filtering options to narrow down their search.
- **Personalized Recommendations**: Sends tailored job alerts and notifications based on the user's profile and preferences.

---
## Frontend

## Table of Contents Frontend

1. [Setup and Installation Frontend](#setup-and-installation-frontend)  
2. [Project Structure](#project-structure)  
3. [Technologies Used Frontend](#technologies-used-frontend)  
4. [API Integration with Backend](#api-integration-with-backend)  

## Setup and Installation Frontend

Installation Steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Safi222/CareerFit
   cd CareerFit/client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

## Project Structure

Components:
1. `Slogan`: Displays the website slogan.
2. `Login`: Handles user authentication.
3. `Register`: For new user registration.
4. `Search`: Enables job searches.
5. `Value`: Highlights the application's core values.
6. `AboutUs`: Provides information about the team and project.
7. `Footer`: Includes links copyright details and contact information.
8. `Jobs`: Displays job listings.
9. `Profile`: Provides an overview of user activity and stats.
10. `CVPilot`: Helps users build and upload their CVs.

## Technologies Used Frontend

1. React.js: For building user interfaces.
2. Vite: A fast build tool and development server.
3. Tailwind CSS: For efficient and modern styling.

## API Integration with Backend

The frontend is integrated with the backend API to support:

1. User authentication and authorization
2. Job searching and listing
3. CV upload and analysis
4. User dashboard with analytics
5. Ensure the backend server is running at the specified port for API requests.

## Backend

## Table of Contents

1. [Setup and Installation](#setup-and-installation)
2. [API Endpoints](#api-endpoints)
3. [Error Handling](#error-handling)
4. [Technologies Used](#technologies-used)
5. [Authors](#authors)
---

## Setup and Installation

### Prerequisites

- Node.js (>= 14.x)
- MongoDB
- Redis

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Safi222/CareerFit
   cd CareerFit/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

---

## API Endpoints

### Authentication

#### Register User

**POST** `/auth/register`

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

- Success (201):
  ```json
  {
    "status": "success",
    "data": {
      "token": "<jwt-token>"
    }
  }
  ```
- Error (400): Email already in use.

#### Login User

**POST** `/auth/login`

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

- Success (200):
  ```json
  {
    "status": "success",
    "data": {
      "token": "<jwt-token>"
    }
  }
  ```
- Error (404): User not found.
- Error (400): Incorrect password.

#### Google Authentication

**GET** `/auth/google`

**Description:** Redirects to Google for authentication.

**GET** `/auth/google/callback`

**Description:** Handles Google OAuth callback and returns a token.

---

### CV Analysis

#### Analyze CV

**GET** `/cv/analyze`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>"
}
```

**Response:**

- Success (200):
  ```json
  {
    "status": "success",
    "data": {
      "recommendation": ["Software Engineer", "Data Analyst"]
    }
  }
  ```
- Error (404): CV not found.

---

### Job Management

#### Fetch Jobs

**GET** `/jobs/home`

**Query Parameters:**

- `query` (string, optional): Search query.
- `page` (number, optional): Page number.
- `num_pages` (number, optional): Number of pages to fetch.

**Response:**

- Success (200):
  ```json
  {
    "status": "success",
    "data": {
      "jobs": [ { "title": "Software Engineer", "location": "Cairo" } ]
    }
  }
  ```
- Error (500): Failed to fetch jobs.

#### Search Jobs

**GET** `/jobs/search`

**Query Parameters:**

- `title`, `location`, `type`, `level` (all optional): Filters for job search.
- `page`, `num_pages` (optional): Pagination.

**Response:** Similar to `/jobs/home`.

---

### User Management

#### Upload Profile Picture

**POST** `/user/profile-picture`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>"
}
```

**Form Data:**

- `profilePic`: File upload (image).

**Response:**

- Success (200):
  ```json
  {
    "status": "success",
    "data": {
      "profilePic": "<image-url>"
    }
  }
  ```

#### Upload CV

**POST** `/user/cv`

**Headers:** Same as `/user/profile-picture`.

**Form Data:**

- `cvFile`: File upload (PDF).

**Response:**

- Success (200): CV uploaded successfully.

#### Get User Profile

**GET** `/user/profile`

**Headers:** Same as `/user/profile-picture`.

**Response:**

- Success (200):
  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com"
      }
    }
  }
  ```

---

## Error Handling

Errors are returned in the following format:

```json
{
  "status": "fail",
  "data": {
    "title": "Error message"
  }
}
```

---

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Redis**
- **Cloudinary**
- **Passport.js** for authentication
- **Bull** for background processing


## Authors

- **Shadi Mahmoud** - [GitHub](https://github.com/Oxshady) - backend developer
- **Ahmed Khalid** - [GitHub](https://github.com/ah0048) - backend developer
- **Safia Gibril Nouman** - [GitHub](https://github.com/safi222) - frontend developer
- **Khaled Mohamed Anwer** - [GitHub](https://github.com/khaledmohamed8895) - frontend developer
