# structure-studios-interview

# BikeManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

This project was built by Darren Laser and may not be reused without his permission.

## Data and Data Persistence
An initial data set is stored in a bikes.json file within the assets folder and will load on site load, and 
can be refreshed by refreshing the page. Due to no official backend server and not using local storage,
there is no data persistence during a refresh. However, navigation while within the application will 
maintain the data state.

## Application Requirements

As requested, this site handles basic CRUD actions. A user can:
1. Create a new bike item in the store
2. View the list of bikes within the store. This list can be filtered by quantity, price and rating.
3. Update an individual bike inventory record in the store
4. Purchase a bike, therefore reducing item quantity
5. Remove bike inventory from the store entirely.

Users can upload images. Images are stored as Base64 strings within the JSON file and are converted when
uploaded when adding new bike inventory items, or updating a bike inventory record. 

Styling was done using Tailwindcss.

This application also connects to live weather data based on location. Please allow browser location 
permissions for the weather and location data to load correctly. More information on the weather API
can be found below.

## API Key for Location/Weather

The API Key for the location and weather data can be attained by creating an account here: https://openweathermap.org/.

The API key in use is set as an environment variable on Netlify for the production environment, however
locally the key is hard coded. The development environment file is not included in the repository so if
the goal is to run locally, weather and location data will not be pulled without an API key.

## Error logging

Due to the simple nature of the application, all errors are logged to the browser developer tools console.
This would normally be logged to a logging or monitoring service.  

## Starting a Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Deployment

The project was deployed on Netlify at https://app.netlify.com/. 
