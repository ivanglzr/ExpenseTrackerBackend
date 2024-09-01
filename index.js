import app from "./app.js";
import { connect } from "mongoose";

const port = process.env.PORT ?? 1234;

app.listen(port, () => console.log("\n[*] Server listening on port", port));

try {
  const { connection } = await connect(process.env.MONGODB_URI);

  if (connection.readyState === connection.states.connected)
    console.log("[*] Connection to MongoDB successful");
} catch (error) {
  console.error("[!] Connection to MongoDB failed");
}
