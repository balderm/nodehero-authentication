const app = require('./app')
const port = process.env.PORT || 3000

// start server
app.listen(port, function (err) {
  if (err) {
    throw err
  }

  console.log(`server is listening on ${port}...`)
})
