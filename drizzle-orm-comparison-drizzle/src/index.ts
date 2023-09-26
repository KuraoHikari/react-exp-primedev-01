import express from "express";
import router from "./routes";
import cors from "cors";
import { errorHandler } from "./middlewares/error/handler.error";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // Configure multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // app.use(upload.single("file")); //

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
