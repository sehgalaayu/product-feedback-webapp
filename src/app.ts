import * as express from "express";
import { Request, Response } from "express";

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({});
});
