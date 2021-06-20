# Blackmarket

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.7.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4600/`. The app will automatically reload if you change any of the source files.

### External Dependencies Other than Angular

1. Angular Material for UI.
2. ngx-webstorage for session and local storage maintenance.
3. bootstrap css framework.

#### Get Started.

UserInfo for using the App
username: ferb@gmail.com
password: 12345

More users in file: https://github.com/AbhiKalra5/angularShop/blob/main/src/data/user-data.json

Products for the App.
Products file: https://github.com/AbhiKalra5/angularShop/blob/main/src/data/product-data.json

Categories for the App.
Categories Data file: https://github.com/AbhiKalra5/angularShop/blob/main/src/data/category-data.json

#### About

Sample Angular project with main flow of e-commerce. (main: browse and search through the catalogue move all the way to checkout through cart page ).
This project leverage basic concepts of Angular such as:

1. Division of whole into smaller reusable and maintainable blocks.
2. Inter-Component Communication.
3. Routing (browsing without reloading).
4. Lazyloading with preloading of lazily loaded modules.

Modules: App is broadly divided into 3 modules
1.	App Module
2.	Auth Module
3.	Cart Module


This program uses internal data files in json format for simulation of database.

The program is properly linted and has passed the linting tests.

Backend Approach:
The Application is using JSON files for backend. These resides in src/data folder of the app. These are then fetched by http calls.

Authentication Approach:
The user info is fetched from JSON file and then the username and password are compared with the username and password entered at login page. If the login is successful, the user info will be saved onto the local storage. Cart page and checkout page are guarded by auth-guard. 



Points for  evaluators

1. Category tree upto one level is maintained.
2. Translation are implemented. Instead of dropdown in header the language changer feature is implemented in side-bar. Toggle Sidebar from hamburger button shown in top left just below nav-brand.
3. The App is hosted on netlify with url: https://sharp-khorana-3c02c6.netlify.app/
4. Auth Guards have been implemented in the project. The user will be unable to go to cart page until he is logged in. Although there is no restriction in adding product to cart. The anonymous cart will be restored to the user after loggin into the app.
5. Basic Routing has been implemented in the application with the use of lazy loading. Two modules are loaded lazily: Auth Module and Cart Module.
6. Form Validation is implemented in cart page to address fields.
7. CSS Library: Bootstrap framework and angular material has been used in this sample app. On some parts custom css has also been applied.
8. Two feature modules are being loaded lazily with Preload strategy.


Assumptions:

1. Quantity wise deletion is not provided on cart page. Only complete deletion is implemented.
