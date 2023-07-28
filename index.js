const express = require('express');
const http = require('http');
const cors = require('cors');
const dbConnectivity = require('./db_connectivity');
const { Server } = require('socket.io');
const { socketHelper } = require('./socket_helper');
const usersRoute = require('./routes/user_router');
const productsRoute = require('./routes/product_router');
const cartsRoute = require('./routes/cart_router');
const favoritesRoute = require('./routes/favorites_route');
const ordersRoute = require('./routes/orders_router');
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/carts', cartsRoute);
app.use('/favorites', favoritesRoute);
app.use('/order', ordersRoute);

//DB connectivity
dbConnectivity();

const server = http.createServer(app);

const socketReal = new Server(server, { cors: { origin: "*", }, })


socketReal.on("connect", (socket) => {

    socketHelper(socket)


});

//server
server.listen(3000, () => { console.log("Server is running"); });