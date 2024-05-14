# My Restaurant List

This is a backend programming assignment from the Alpha Camp bootcamp: a restaurant list website built using Node.js + Express, which includes various restaurant information for users to browse, view details, and search.
<img width="1429" alt="螢幕截圖 2024-05-14 21 48 11" src="https://github.com/DonaldWongSuiSang/Restaurant-List/assets/99122276/f688a1e5-cf67-40b5-8554-9471057fb435">
<img width="1433" alt="螢幕截圖 2024-05-14 21 48 31" src="https://github.com/DonaldWongSuiSang/Restaurant-List/assets/99122276/355b39fd-ab91-4c78-b0fb-b433c8e6da58">
<img width="1407" alt="螢幕截圖 2024-05-14 22 16 52" src="https://github.com/DonaldWongSuiSang/Restaurant-List/assets/99122276/2ea913af-d840-427a-8578-4de2129403a9">

## Features:

1. Users can browse all restaurants and view basic information such as name, category, image, and rating.
2. Users can click on any restaurant to view detailed information including name, category, address, phone number, description, and images.
3. Users can create new restaurant for providing detailed information including name, category, address, phone number, description, and images.
4. Users can edit the restaurant detailed information including name, category, address, phone number, description, and images.
5. Users can delete the restaurant
6. Users can search for restaurants by Chinese name, English name, or category, with case-insensitive and space-insensitive matching.
7. Users can sorting the restaurant by the name, category or location
8. User have to login for the restaurant list, there are sample account below or register a new account or login via Facebook

### Prerequisites

```
Node.js v20.11.1
```

### Installing

Open your terminal and clone the project to your local machine:

```
git clone https://github.com/DonaldWongSuiSang/Restaurant-List.git
```

Navigate to the project folder:

```
cd restaurant-list
```

Install npm packages:

```
npm install
```

Install Express:

```
npm i express
```

Install nodemon:

```
npm install -g nodemon
```

Install mySQL and sequelize

```
npm install mysql2 sequelize sequelize-cli
```

Install method-override, connect-flash, express-session, dotenv, passport, passport-local, passport-facebook and bcryptjs

```
npm install method-override connect-flash express-session passport passport-local passport-facebook bcryptjs dotenv
```

Build a Database restaurant in mySQL Workbench

```mySQL
CREATE DATABASE restaurant;
```

Migrate with mySQL in terminal

```
npx sequelize db:migrate
```

Insert the data from JSON to mySQL

```
npx sequelize db:seed:all
```

Set the Node environment as development

```
export NODE_ENV=development
```

Start the server by running the app.js file:

```
npm run dev
```

When you see the following message in the terminal, it indicates that the server and database have started successfully:

```
express server is running on http://localhost:3000
```

Open any web browser and go to http://localhost:3000 to start browsing the restaurant list.

There are two account for the demo, the information as following:  
> 1st User  
> email: user1@example.com  
> password: 12345678  

> 2nd User  
> email: user2@example.com  
> password: 12345678  

## Built With

- [Node.js](https://nodejs.org/en) - JavaScript runtime
- [Express](https://expressjs.com/) - Web application framework for Node.js
- [Express-handlebars](https://www.npmjs.com/package/express-handlebars) - Templating engine
- [MySQL](https://www.mysql.com/) - Relational database management system
- [Sequelize](https://sequelize.org/) - Promise-based Node.js ORM for MySQL
- [Method-override](https://www.npmjs.com/package/method-override) - Middleware for HTTP method override in Express.js
- [Connect-flash](https://www.npmjs.com/package/connect-flash) - Middleware for displaying flash messages
- [Dotenv](https://www.npmjs.com/package/dotenv) - Module for loading environment variables
- [Passport](http://www.passportjs.org/) - Authentication middleware for Node.js
- [Passport-local](http://www.passportjs.org/packages/passport-local/) - Passport strategy for authenticating with a username and password
- [Passport-facebook](http://www.passportjs.org/packages/passport-facebook/) - Passport strategy for authenticating with Facebook using the OAuth 2.0 API
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - Library for hashing passwords
- [Font Awesome](https://fontawesome.com/) - Icon toolkit

## Authors

- **Donald Wong**

## Acknowledgments

- [ALPHA Camp](https://tw.alphacamp.co/)
