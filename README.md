
# This project is still in development!

## Overview
LaptopManagerApp is a web application developed for the *Programming and Design System* course at @Babes-Bolyai University. 
The app is designed for managing a database of laptops, offering a user-friendly interface and a robust backend.

##Tech Stack:
- Frontend: React (VS Code)
- Backend: Spring Boot (IntelliJ IDEA)
At present, data is not stored in a database; however, database integration will be implemented in the near future.

## Key Features:
- Full CRUD Operations;
- RESTful API Communication: The app communicates with the backend using a RESTful API for efficient data handling.
- Frontend Routing System: Seamless navigation between different views of the application.
- Chart Data and Real-Time Updates;
- Filtering and Sorting of the entities;
- Server Downtime Detection:
  - Periodically pings the server to check its status.
  - If the server is unavailable, the app switches to a local storage solution that queues CRUD operations.
  - Once the server is back online, operations are automatically synced with the server.
- Endless scrolling:
  - data is displayed dynamically;
  - When the last item is displayed, the next page of data is automatically fetched from the backend.
- Upload and download file system;
- Backend Architecture: Controller-Service-Repository pattern.

