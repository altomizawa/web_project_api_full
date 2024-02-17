# Tripleten web_project_api_full

This project is a share photos app created for the last Sprint of the Web Developer course offered by Triple Ten.

This website lets people add and delete a picture card to/from their database. The user can also change their profile info and avatar, by fetching from the server.

Only people logged in can see the cards. They can signup for the service in the signup page, then log in.

Once logged in, you can change your profile info, picture, add cards, like cards and delete them (if you're the owner of the card).
![login](https://github.com/altomizawa/web_project_api_full/assets/45319659/e77529a4-a8ba-4c3c-a370-43fd19cbde0f)
![home](https://github.com/altomizawa/web_project_api_full/assets/45319659/3f10c099-48b4-43cd-a670-a2815fc75455)
![updateProfileInfo](https://github.com/altomizawa/web_project_api_full/assets/45319659/64d7b0bb-395d-4b92-b7a4-16c9d8130063)
![addPlace](https://github.com/altomizawa/web_project_api_full/assets/45319659/0291ea8f-193d-4ff9-9c44-34d01df80e4e)
![bigPicture](https://github.com/altomizawa/web_project_api_full/assets/45319659/300d3ddd-74f0-4862-9d8e-a56fdcac11c5)


https://github.com/altomizawa/web_project_api_full/assets/45319659/68b46a24-9327-46cb-8098-4d134a995828

## Live Website
https://www.discoverus.fairuse.org/

# FRONTEND SECTION

## Tools Used

FrontEnd: HTML, CSS, Javascript, React

## Avaliable Scripts

`npm start`
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

`npm run build`
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.


# BACKEND SECTION

## Current Working Routes
`/cards` — empty array 
`/users` — brings all the users in the database
`/users/:id` — bring the user by id

## Directories

`/data` — database.js connects to Mongodb database

`/routes` — routing files.

`/controllers` — 'cards' and 'users' controllers

`/models` — 'cards' and 'users' mongoose models

All other directories are optional and may be created by the developer if necessary.

## Running the Project

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.


## Technologies Used in this project
Node.js, Javascript, MongoDb

## Cloud service
Google Cloud
