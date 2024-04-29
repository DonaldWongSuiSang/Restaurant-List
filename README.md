# My Restaurant List

This is a backend programming assignment from the Alpha Camp bootcamp: a restaurant list website built using Node.js + Express, which includes various restaurant information for users to browse, view details, and search.
<img width="1428" alt="螢幕截圖 2024-04-29 15 36 01" src="https://github.com/DonaldWongSuiSang/Restaurant-List/assets/99122276/a7339929-8b9f-456e-91fc-30a79eed4c13">
<img width="1423" alt="螢幕截圖 2024-04-29 15 36 14" src="https://github.com/DonaldWongSuiSang/Restaurant-List/assets/99122276/8c904715-363e-4909-a33e-341c96e3b3ed">
<img width="1424" alt="螢幕截圖 2024-04-29 15 36 24" src="https://github.com/DonaldWongSuiSang/Restaurant-List/assets/99122276/3182a883-b0fa-447a-bab5-cf3190fd26f4">


## Features:

1. Users can browse all restaurants and view basic information such as name, category, image, and rating.
2. Users can click on any restaurant to view detailed information including name, category, address, phone number, description, and images.
3. Users can create new restaurant for providing detailed information including name, category, address, phone number, description, and images.
4. Users can edit the restaurant detailed information including name, category, address, phone number, description, and images.
5. Users can delete the restaurant
6. Users can search for restaurants by Chinese name, English name, or category, with case-insensitive and space-insensitive matching.

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
cd <img width="1423" alt="螢幕截圖 2024-04-29 15 36 14" src="https://github.com/DonaldWongSuiSang/Restaurant-List/assets/99122276/eef8b306-6ea6-4f3c-ba34-0d744858569d">
restaurant-list
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
npm install mysql2@3.2.0 sequelize@6.30.0 sequelize-cli@6.6.0
```

Install method-override

```
npm install method-override@3.0.0
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

Start the server by running the app.js file:

```
npm run dev<img width="1424" alt="螢幕截圖 2024-04-29 15 36 24" src="https://github.com/DonaldWongSuiSang/Restaurant-List/assets/99122276/80afaf70-9c94-4d8c-a5b4-73c3658e3961">

```

When you see the following message in the terminal, it indicates that the server and database have started successfully:

```
express server is running on http://localhost:3000
```

Finally, open any web browser and go to http://localhost:3000 to start browsing the restaurant list.

## Built With

- [Node.js](https://nodejs.org/en) - JavaScript runtime
- [Express](https://expressjs.com/) - Web application framework for Node.js
- [Express-handlebar](https://www.npmjs.com/package/express-handlebars) - Templating engine
- [MySQL](https://www.mysql.com/) - Relational database management system
- [Sequelize](https://sequelize.org/) - Promise-based Node.js ORM for MySQL
- [Method-override](https://www.npmjs.com/package/method-override) - Middleware for HTTP method override in Express.js

## Authors

- **Donald Wong**

## Acknowledgments

- [ALPHA Camp](https://tw.alphacamp.co/)

```

```
