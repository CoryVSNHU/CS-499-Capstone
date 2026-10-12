# CS 499 Computer Science Capstone
## Travlr Getaways — Full Stack Application Enhancements

**Southern New Hampshire University | Bachelor of Science in Computer Science**

**Developer:** Cory Valentine

## Project Overview

This repository contains my Computer Science Capstone project for Southern New Hampshire University (SNHU). The purpose of this project was to demonstrate the knowledge and technical skills I developed throughout my computer science degree by enhancing an application originally created during CS 465: Full Stack Development.

The selected artifact is **Travlr Getaways**, a travel booking application developed using Node.js, Express, Handlebars, and MongoDB technologies.

Rather than creating an entirely new application, I focused on improving the original artifact through three major enhancements:

1. Software Design and Engineering
2. Algorithms and Data Structures
3. Databases

Each enhancement builds upon the previous work, transforming the original application into a more functional, reliable, and maintainable system.

## Enhancement One: Software Design and Engineering

The first enhancement focused on improving the application's architecture and adding functionality to support customer reservations.

### Improvements

- Converted the travel listing into a dynamically generated page using Express and Handlebars.
- Implemented a reservation workflow that allows customers to select a travel package.
- Created reservation forms and confirmation pages.
- Added server-side validation for customer information, traveler counts, and travel dates.
- Implemented server-side pricing calculations to prevent users from manipulating reservation prices.
- Improved error handling and preserved form information when validation failed.
- Organized functionality using the Model-View-Controller (MVC) design pattern.

### Skills Demonstrated

This enhancement demonstrates software architecture, separation of concerns, server-side development, validation, security awareness, and user-centered design.

## Enhancement Two: Algorithms and Data Structures

The second enhancement focused on improving how travel packages are organized, searched, filtered, and retrieved.

### Improvements

- Implemented a Map data structure to support efficient trip-code lookups.
- Added travel-package searching.
- Introduced price-based filtering.
- Added sorting functionality.
- Improved the organization of travel-package data.
- Tested search, filtering, sorting, and lookup functionality.

### Skills Demonstrated

This enhancement demonstrates the application of data structures, algorithmic thinking, data retrieval, testing, and performance considerations.

Using a Map for trip-code lookups provides a more direct method of retrieving individual travel packages than repeatedly searching through an array.

## Enhancement Three: Databases

The third enhancement focused on implementing persistent reservation storage and improving the application's database capabilities.

### Improvements

- Integrated MongoDB with the Express application using Mongoose.
- Created a reservation schema with validation rules.
- Added unique confirmation numbers and database indexes.
- Updated the reservation workflow to save records permanently.
- Ensured reservation confirmations are displayed only after successful database operations.
- Improved error handling when database operations fail.
- Updated server startup to establish the database connection before accepting requests.
- Implemented reservation history retrieval with pagination.
- Developed aggregation reporting for reservation counts, traveler totals, revenue, and average reservation values.
- Reviewed and updated project dependencies to address reported security vulnerabilities.

### Skills Demonstrated

This enhancement demonstrates database integration, schema design, data validation, indexing, query optimization, aggregation, error handling, and application reliability.

## Technologies Used

| Technology | Purpose |
|---|---|
| JavaScript | Primary programming language |
| Node.js | Server-side JavaScript runtime |
| Express.js | Web application framework |
| Handlebars | Dynamic server-side templates |
| MongoDB | Document-oriented database |
| Mongoose | Database schemas, validation, and queries |
| HTML and CSS | Application interface |
| Git and GitHub | Version control and project documentation |
| MongoDB Compass | Database inspection and verification |
| PowerShell | Local development and testing |

## Repository Structure

```text
CS-499-Capstone/
├── Original-Travlr/
│   └── Original application artifact
├── Enhanced-Travlr/
│   ├── app_server/
│   │   ├── controllers/
│   │   ├── models/
│   │   │   ├── db.js
│   │   │   └── reservation.js
│   │   ├── routes/
│   │   └── views/
│   ├── bin/
│   ├── public/
│   ├── scripts/
│   │   ├── reservationHistory.js
│   │   └── reservationReport.js
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
├── Documentation/
├── docs/
└── README.md
```

The original artifact is preserved separately to demonstrate the progression of the application throughout the capstone.

## Installation and Setup

### Prerequisites

To run the enhanced application locally, install:

- Node.js and npm
- MongoDB Community Server
- Git (optional for downloading the repository through the command line)

### 1. Clone the Repository

```bash
git clone https://github.com/CoryVSNHU/CS-499-Capstone.git
cd CS-499-Capstone/Enhanced-Travlr
```

### 2. Install Dependencies

```bash
npm install
```

On Windows PowerShell, use `npm.cmd install` if your execution policy prevents `npm` from running.

### 3. Configure MongoDB

Ensure MongoDB Community Server is installed and running locally.

The application uses the following default connection:

```text
mongodb://127.0.0.1:27017/travlr
```

The connection can also be configured using the `MONGODB_URI` environment variable.

### 4. Start the Application

```bash
npm start
```

On Windows PowerShell:

```powershell
npm.cmd start
```

### 5. Open the Application

Navigate to:

```text
http://localhost:3000/travel
```

The travel page allows users to explore available packages and access the reservation workflow.

## Database Reporting

The database enhancement includes two command-line scripts.

### Reservation History

Retrieves reservation records using pagination:

```bash
node scripts/reservationHistory.js 1 2
```

The example requests page 1 with 2 reservations per page.

### Reservation Report

Generates aggregated reservation statistics:

```bash
node scripts/reservationReport.js
```

The report summarizes confirmed reservations by trip, including reservation counts, travelers, total revenue, and average reservation values.

These scripts are intended for local administrative use and are not exposed as public website endpoints.

## Testing and Validation

Testing was performed throughout the enhancement process to verify functionality and prevent regressions.

Testing included:

- Reservation form validation
- Successful reservation submission
- Database persistence verification through MongoDB Compass
- Trip searching, filtering, and sorting
- Reservation history pagination
- Database aggregation reporting
- Database connection failure handling
- Application startup and regression testing

Following the final dependency updates, all nine final regression checks passed.

The final npm security audit reported:

**0 vulnerabilities**

## Security Considerations

Security and data integrity were considered throughout development.

Implemented practices include server-side input validation, trusted pricing calculations, database schema validation, unique reservation identifiers, database error handling, and dependency maintenance.

Environment configuration files and installed dependencies are excluded from version control through `.gitignore`.

The application remains an academic portfolio project rather than a production-ready reservation platform. Additional authentication, authorization, privacy controls, and deployment hardening would be necessary before using it to process real customer reservations.

## Professional Reflection

Completing this capstone allowed me to revisit an application I developed earlier in my computer science education and evaluate it from a more experienced perspective.

Throughout the project, I worked on software architecture, algorithms, data structures, database integration, testing, and security. Each enhancement required me to consider not only how to implement a feature but also how that feature would affect the overall application.

One of my biggest takeaways was the importance of incremental development and testing. By implementing and validating changes individually, I was able to identify problems more effectively and maintain working functionality throughout the project.

My professional experience working with data, analytics, and technical projects also influenced my approach. I focused on developing improvements that supported reliability, maintainability, and meaningful data analysis.

The completed project represents my growth as a computer science student and demonstrates my ability to evaluate existing software, identify opportunities for improvement, and implement practical technical solutions.

## Project Documentation

Additional capstone materials, enhancement narratives, and supporting documentation are maintained in the `Documentation` and `docs` directories.

## Author

**Cory Valentine**

Bachelor of Science in Computer Science  
Southern New Hampshire University

**GitHub:** https://github.com/CoryVSNHU

---

*Developed as part of the Southern New Hampshire University CS 499 Computer Science Capstone.*