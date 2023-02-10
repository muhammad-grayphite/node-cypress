const http = require("http");

const express = require("express");
const app = express();
const cypress = require('cypress');
const { send } = require("process");
const server = http.createServer(app);
app.use(express.json());




app.post('/cypress',(req,res)=>{
    cypress
  .run({ 
    spec: './cypress/e2e/Site-load-test/site-load-issue.cy.js',
    config: {
      video: false,
      screenshot: false,
    },
  })
  .then((results) => {
    res.send(results)
  })
  .catch((err) => {
    res.send("Error meassage will")
  })
 
})

server.listen(8000, (req, res) => {
  console.log(`Server active on http://localhost:8000!`);
});
module.exports=server;
