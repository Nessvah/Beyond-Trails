require("dotenv").config(); // this code will inject our variables right at the start
const express = require("express");
const cookieParser = require("cookie-parser");
const upload = require("../backend/middleware/uploadMiddleware");

const path = require("path");

const cors = require("cors");
const { usersRoute } = require("./routes/usersRoute");
const { partnersRoute } = require("./routes/partnersRoute");
const { visitorsRoute } = require("./routes/visitorsRoute");
const { notFound, errorHandling } = require("./middleware/errorMiddleware");
const { authenticate } = require("./middleware/authMiddleware");
const { adminRoutes } = require("./routes/adminRoutes");
const { gestorRoutes } = require("./routes/gestorRoutes");

const app = express();

app.use(cookieParser());
// parses incoming requests with JSON payloads
app.use(express.json());
// parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
// this will allow other websites to use our api to get resources, enabling proper communication
// between different domains in a proper and secure manner.
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

//route file upload register partner
//->está configurada para receber arquivos enviados pelo formulário e responder com uma mensagem de sucesso.

//route para receber imagens;
app.use("/uploads", express.static("uploads"));

// Routes for global users - LOGIN/LOGOUT/VISITOR REGISTRATION/EMAIL VERIFICATION

app.use("/api/users", usersRoute);
app.use("/api/visitors", visitorsRoute);
app.use("/api/partners", partnersRoute);
//route for gestor
app.use("/api/gestor", gestorRoutes);

app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandling);

// exporting our server to another file since this is going to get bigger

module.exports = app;
