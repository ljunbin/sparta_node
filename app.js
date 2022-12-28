const express = require('express');
const indexRouter = require('./routes/index.js')
const connect = require('./schemas');

const app = express();
const port = 3000;

connect();


// app.use = 전 영역에 미들웨어를 적용하겠다 express.json = body-parser middleware를 쓰기위한 문법
// 모든 코드에 body-parser를 등록해서 우리는 request안에 있는 body 데이터를 쓰겠다
app.use(express.json());

app.use('/', indexRouter);

// localhost:3001/api -> goodsrouter
// app.use([postsrouter,commentsRouter]);
// 다른 라우터를 app.use 미들웨어를 통과 시키고 싶을때 같은걸 여러개로 붙이는게 아니라
// [] 배열을 만들어주고 계속 이어 붙여주면 된다
// app.use("/api", [goodsrouter, usersRouter, aboutrouter]); << 이런식으로

app.get("/", (req,res) => {
  res.send('정상적으로 반환되었습니다.');
})

app.post("/", (req,res) => {
  console.log(req.body);

  res.send("기본 URI에 POST 메소드가 정상적으로 실행되었습니다.");
})

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});