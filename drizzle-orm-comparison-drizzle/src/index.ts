import express from "express";
import router from "./routes";
import cors from "cors";
import { errorHandler } from "./middlewares/error/handler.error";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // Configure multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // app.use(upload.single("file")); //

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
