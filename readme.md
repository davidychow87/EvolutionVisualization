# My Dream Porsche
> A project that will train you on React, Auth system, RESTful APIs, and persistent storage.

## Install

Clone repository and run:

```sh
$ npm install
```

## Development

```sh
$ npm start
```

App will be running on [http://localhost:3001](http://localhost:3001).

## Summary

This app will require a user to sign up and log in for access. Once they are logged in, they will be presented with a list of all Porsche models to choose from. Their goal is to select a dream porsche to add to their "Favorites" list. They can maintain their list by adding or deleting porsches. This list will be saved per user and should reappear when the user logs out and logs back in again.

## Specifications

There will be 3 parts to this project. 1) The authentication system where the user can sign up or log in. 2) Making API requests for the Porsche data and saving them to a database. 3) Maintaining a "Favorites" list of porsches. All 3 parts will require you to use a persistent storage. Namely, MongoDB and a library called Mongoose.

In order to get started, you will first need to follow the instructions to install MongoDB [https://docs.mongodb.com/manual/installation/] and Mongoose [http://mongoosejs.com/docs/].

A sample app has already been written for you which includes a library called React Router [https://github.com/ReactTraining/react-router]. This library allows you to create routes within a single page app. Look at main.jsx for how it's implemented.

# Part 1 - Authentication System

Here, you will create a log in and sign up page. Both of these pages should have two text inputs for email and password.

When the user signs up, their email and password should be saved to mongodb. However, make sure you do NOT store the raw password. You need to hash it in case the database gets hacked so the hacker can't steal their password. Read here for more information on password hashing [https://crackstation.net/hashing-security.htm]. There is a plethora of hashing libraries on npm. Use whatever you want. Even the ones that the link doesn't recommend like MD5.

When the user logs in, their email and password should be checked against the existing record in the database and grant them access to a dashboard page.

There should be a log out link or button on the dashboard.

Here is an example of how to write a login system using react router. However, you will have to modify it to work using a database. [https://github.com/ReactTraining/react-router/tree/master/examples/auth-flow]

# Part 2 - Requesting Porsche data via API

The second part involves a one time request for data on porsches and saving them to mongodb to use. This is so you don't have to make repeated requests to the API for data plus it's faster to access information from your own database.

To get a list of all the porsche models and its trims, you need to make api calls to www.carqueryapi.com. You can view their api usage here [http://www.carqueryapi.com/documentation/api-usage/]. You need to store the model details for ALL porsche models and their trims into your database. Include whatever details you want. The minimum details must include model name, model year, model trim,  0 - 60 mph acceleration, and horsepower.

Once, you have stored everything in your database, you need to display the results as a choice on the frontend dashboard. You should use a series of select elements. Model -> Year -> Trim. The user should first select from Model and then given the selected model, display the options for year, then options for trim. Upon selection of the trim, its details should be displayed. The user can reselect any values, so the UI must be updated accordingly.

# Part 3 - Favorites

Once a trim has been selected, an "Add" button should appear. Clicking this button should add this specific model and trim to the "Favorites" list (Hint: use a select element with a multiple attribute). Make sure this list is associated with the logged in user in the database.

Make sure not to include duplicate models and trims in the "Favorites" list. A star should be displayed on the corner of the details information to indicate that this specific trim has already been favorited.

When a porsche on the "Favorites" list is selected, the 3 select elements along with the displayed details should be automatically selected to the right values and shown.

The "Favorites" list should also have a DELETE button, which will delete the selected model and trim.

Any changes made to the "Favorites" list should be saved and recorded in the database so that when the user logs out and logs back in, he should see his saved "Favorites".
