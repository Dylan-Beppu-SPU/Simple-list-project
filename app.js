// Get 3rd Party modules
const express = require("express");
// Get Custom built modules
const fm = require("./filemgr");

// Create the express http server
const app = express();

// Define some built-in middleware
app.use(express.static("./Client"));
app.use(express.json());

// Define HTTP routes listenting for requests
app.get("/api", async (req,res) => {
  // console.log(req)
  let data = await fm.ReadData();
  if (data === -1) {
    res.status(400).send();
    return;
  }
  res.status(200).send(data);
})

//Post
app.post("/api", async (req,res) => {
  // console.log(req)
  console.log("---------------------------------")
  // console.log(res.body)
  let jsonString = JSON.stringify(req.body);
  // console.log(req.body);
  // console.log(res)
  let responce = await fm.WriteData(req.body);
  if(responce === true) {
    res.status(200).send();
    return;
  }
  res.status(400).send();
})


//Delete (not needed?)
app.delete("/api", async(req,res) => {

})





// page not found route
app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});

// Create a server
const appName = "Simple List";
const port = 5000;
app.listen(port, () => {
  console.log(`App ${appName} is running on port ${port}`);
})