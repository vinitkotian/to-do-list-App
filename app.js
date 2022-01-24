//internal dependencies.
const process = require("process");

//external dependency imports.
const express = require("express");
const app = express();
require("dotenv").config();

const taskRouter = require("./routes/tasks");
const establishClusterConnection = require("./db/connect");

//Middlewares hooked to the app.
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/V1-0-1/tasks/", taskRouter);

const main = async () => {
  try {
    //Initiate mongo cluster connection.
    await establishClusterConnection(process.env.CLUSTER_URI);

    app.listen(process.env.PORT, () => {
      console.log(
        `The Server is up and listening on port ${process.env.PORT}.`
      );
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ "Error Encountered": e });
  }
};

main();
