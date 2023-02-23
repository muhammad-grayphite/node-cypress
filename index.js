const http = require("http");

const express = require("express");
const app = express();
const cypress = require('cypress');
const { send } = require("process");
const server = http.createServer(app);
app.use(express.json());
var CronJob = require('cron').CronJob;

const execSync = require('child_process').execSync;

function runTests() {
  const output = execSync('npx browserstack-cypress run', { encoding: 'utf-8' });
  console.log(new Date())
  console.log('Output was:\n', output);
}

var job = new CronJob(
	'0 */30 * * * *',
	function() {
    console.log("Staring the tests ", new Date())
		runTests()
	},
	null,
	true,
	'America/Los_Angeles'
);

console.log('UTC next 5: ', job.nextDates(5));


app.post('/cypress',(req,res)=>{
  console.log('starting test script')
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
    console.log(`err: ${err}`)
    res.send(`Error : ${err}`)
  })
 
})

app.post('/cypress/browserstack',(req,res)=>{
  console.log('starting test script browserstack')

  // browserstackRunner.run(config, function(error, report) {
  //   if (error) {
  //     console.log("Error:" + error);
  //     res.send("Error:" + error);
  //   }
  //   console.log(report);
  //   console.log("Test Finished");
  //   res.send(JSON.stringify(report, null, 2))
  // });

  const output = execSync('npx browserstack-cypress run', { encoding: 'utf-8' });
  console.log('Output was:\n', output);
  res.send({timestamp: `${new Date()}`, output: output})
  
})

app.get('/',(req,res)=>{
  res.send('Server is running')
})

server.listen(8000, (req, res) => {
  console.log(`Server active on http://localhost:8000!`);
});
server.setTimeout(1000000)
module.exports=server;
