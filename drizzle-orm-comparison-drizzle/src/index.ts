import express from "express";
import { db } from "./db";
import cors from "cors";
import multer from "multer";
import { users as userSchema } from "./db/schema";
import { eq } from "drizzle-orm";
import router from "./routes";
import { errorHandler } from "./middlewares/error/handler.error";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.memoryStorage(); // You can customize storage options as needed
const upload = multer({ storage: storage });

// app.use(upload.single("file")); //

app.use(router);

app.get("/", async (req, res) => {
 res.json({
  message: "aman",
 });
});

app.get("/users", async (req, res) => {
 const users = await db.select().from(userSchema);
 res.json(users);
});

app.get("/users/:id", async (req, res) => {
 const { id } = req.params;
 const user = await db
  .select()
  .from(userSchema)
  .where(eq(userSchema.id, Number(id)));
 res.json(user);
});

// app.post("/users", async (req, res) => {
//  const { name, email } = req.body;
//  const user = await db
//   .insert(userSchema)
//   .values([{ name, email }]);
//  res.json(user);
// });

app.put("/users/:id", async (req, res) => {
 const { id } = req.params;
 const { name, email } = req.body;
 const user = await db
  .update(userSchema)
  .set({ name, email })
  .where(eq(userSchema.id, Number(id)));
 res.json(user);
});

app.delete("/users/:id", async (req, res) => {
 const { id } = req.params;
 const user = await db.delete(userSchema).where(eq(userSchema.id, Number(id)));
 res.json(user);
});

app.use(errorHandler);

app.listen(port, () => {
 console.log(`Server is listening on port ${port}.`);
});
