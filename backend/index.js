require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");
const { Server } = require("socket.io");
const corsOptions = {
  optionsSuccessStatus: 200, // For legacy browser support
  credentials: true, // This is important.
  origin: "http://localhost:3000",
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

var userRouter = require("./routes/user.routes");
app.use("/user", userRouter);
var adminRouter = require("./routes/admin.routes");
app.use("/admin", adminRouter);
var orderRouter = require("./routes/order.routes");
app.use("/order", orderRouter);
var transactionRouter = require("./routes/transaction.routes");
app.use("/transaction", transactionRouter);
var productRouter = require("./routes/product.routes");
app.use("/product", productRouter);
var wishlistRouter = require("./routes/wishlist.routes");
app.use("/wishlist", wishlistRouter);
var catalogRouter = require("./routes/catalog.routes");
app.use("/catalog", catalogRouter);
var sizeRouter = require("./routes/size.routes");
app.use("/size", sizeRouter);
var advertisementRouter = require("./routes/advertisement.routes");
app.use("/advertisement", advertisementRouter);
var messengerRouter = require("./routes/messenger.routes");
app.use("/messenger", messengerRouter);

// socket
//connect
io.on("connection", (socket) => {
  axios.get(`http://localhost:1505/messenger`).then((res) => {
    io.emit("userMessenger", res.data);
  });

  io.emit("id", socket.id);
  socket.on("disconnect", () => {
    axios.delete(`http://localhost:1505/messenger/${socket.id}`);
  });
});

// get all userMs
io.on("connection", (socket) => {
  socket.on("getNewMess", (data) => {
    axios.get(`http://localhost:1505/messenger`).then((res) => {
      io.emit("userMessenger", res.data);
    });
  });
});
// get userMs by user_id
io.on("connection", (socket) => {
  socket.on("user", (data) => {
    axios.get(`http://localhost:1505/messenger/${data}`).then((res) => {
      io.emit("messenger", res.data);
    });
  });
});
// load ms

// update message
io.on("connection", (socket) => {
  socket.on("newMessage", (data) => {
    axios.post(`http://localhost:1505/messenger`, data).then((res) => {
      axios
        .get(`http://localhost:1505/messenger/${data.user_id}`)
        .then((res) => {
          io.emit("messenger", res.data);
        });
    });
  });
});

// delete message
io.on("connection", (socket) => {
  socket.on("deleteMessage", (data) => {
    axios.delete(`http://localhost:1505/messenger/${data}`).then((res) => {
      axios.get(`http://localhost:1505/messenger`).then((res) => {
        io.emit("userMessenger", res.data);
        io.emit("messenger", []);
      });
    });
  });
});

app.get("/", (req, res) => {
  res.send("Home page. Server running okay.");
});
