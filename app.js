var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const axios = require("axios");
var request = require("request");

// const cotohaBase = axios.create({
//   baseURL: "https://api.ce-cotoha.com/api/dev/",
//   headers: {
//     "Content-Type": "application/json",
//     "X-Requested-With": "XMLHttpRequest",
//     Authorization: "Bearer 7ajoGYGMOHZcfXQADm9PqzSrFGZS"
//   },
//   sentence: "部屋が寒くて震えるって話し",
//   responseType: "json"
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//proxyとしてこのserverからgoogleへアクセスし、ブラウザにsend
// app.use("/hoge", (req, res) => {
//   axios
//     .get("https://google.com")
//     .then(function(response) {
//       // handle success
//       console.log(response.status);
//       res.send(response.data);
//     })
//     .catch(function(error) {
//       // handle error
//       console.log(error);
//     });
// });

const token = "RleTJxwl9cPkS5po5180UYjaWLfx";

app.use("/cotoha", (req, res) => {
  var headers = {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: "Bearer RleTJxwl9cPkS5po5180UYjaWLfx"
  };
  var dataString = '{"sentence":"青春を謳歌した。"}';
  var options = {
    url: "https://api.ce-cotoha.com/api/dev/nlp/v1/sentiment",
    method: "POST",
    headers: headers,
    body: dataString
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      console.log("これ？？", body.result);
    }
  }
  request(options, callback);
  // res.send();
  next();
});

// axios(
//   {
//     method: "POST",
//     url: "https://api.ce-cotoha.com/api/dev/nlp/v1/sentiment",
//     headers: { Autorizacion: `Bearer ${token}` },
//     data: {
//       sentence: "部屋が寒くて震えるって話し"
//     }
//   },
//   console.log("あああああああああ")
// )
//   .then(function(response) {
//     console.log(response.data);
//   })
//   .catch(function(error) {
//     console.log("エラーだよ！！！", error);
//   });

// axios
//   .post("https://api.ce-cotoha.com/api/dev/nlp/v1/sentiment", data)
//   .then(response => {
//     console.log("body:", response.data);
//   });
// axios({
//   method: "CREATE",
//   // url: "",
//   headers: { autorizacion: `Bearer ${token}` },
//   data: { sentence: "部屋が寒くて震えるって話し", responseType: "json" }
// });

// axios
//   .post("https://api.ce-cotoha.com/api/dev/nlp/v1/sentiment")
//   .then(function(response) {
//     res.send(response.data);
//   })
//   .catch(function(error) {
//     console.log("エラーだよ！！！");
//   });

// axios
//   .post("https://api.ce-cotoha.com/api/dev/nlp/v1/sentiment", {
//     headers: {
//       "Content-Type": "application/json",
//       // "X-Requested-With": "XMLHttpRequest"
//       Authorization: `Bearer ${token}`
//     },
//     sentence: "部屋が寒くて震えるって話し",
//     responseType: "json"
//   })
//   .then(function(result) {
//     res.send(result);
//   })
//   .catch(function(error) {
//     // handle error
//     console.log(error);
//   });

// });

// app.use("/orita", (req, res) => {
//   res.send("JSONHardCoderって話");
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
