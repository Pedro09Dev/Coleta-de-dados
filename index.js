const bodyParser = require("body-parser")
const express = require("express")
const session = require("express-session")

const PORT = 3000
const app = express()
const path = require("path")

var login = "admin"
var senha = "12345"

app.use(session({ secret: "qualquercoisa" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")
app.use("/public", express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, "/views"))

app.post("/", (req, res) => {
  if (req.body.login == login && req.body.password == senha) {
    req.session.login = login
    res.render("logado")
  } else {
    res.render("index")
  }
})

app.get("/", (req, res) => {
  if (req.session.login) {
    res.render("logado")
  } else {
    res.render("index")
  }
})

app.listen(PORT, () => {
  console.log("O servidor está funcionando!")
})
