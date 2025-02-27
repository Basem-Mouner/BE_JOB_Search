"use strict";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve("./src/config/.env.prod") });
import startCronJobs  from "./src/utils/cronSchedule.js"; // ✅ Ensures CRON jobs start when the server runs
//_______________________ES6_____________________________________________
import bootstrap from "./src/app.controller.js";
//____________________________________________________________________
import express from "express";
const app = express();
import { runIo } from "./src/modules/socket/chat/chat.socket.controller.js";
//____________________________________________________________________

bootstrap(app, express);
//____________________________________________________________________
const serverHttp = app.listen(process.env.PORT, "127.0.0.1", 511, () => {
  console.log(`Server is running on localhost ${process.env.PORT}`);
  startCronJobs(); // ✅ Explicitly start CRON jobs remove expired OTPs
});

runIo(serverHttp);


serverHttp.on("error", (err) => {
  if (err.code == "EADDRINUSE") {
    //  PORT=3001
    console.error("server error..invalid port...port token");
    // setTimeout(() => {
    //   server.listen(port)
    // }, 1000);
    //or
    setTimeout(() => {
      server.close();
      server.listen(process.env.PORT);
    }, 1000);
  }
});
//_______________________________________________________________________

