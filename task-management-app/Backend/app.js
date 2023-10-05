const Express = require("express");
const dbConnect = require("./config/database");
const PORT = process.env.PORT;
const cors = require('cors')
const app = Express();
dbConnect();

app.use(cors())
app.use(Express.json())
app.use('/api/user', require('./route/user.route'))
app.use('/api/task', require('./route/task.route'))


const listenToMyPort = () => {
  console.log(`The port is Listening to ${PORT}`);
};

app.listen(PORT, listenToMyPort);
