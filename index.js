const express = require('express');
const app = express();

app.use(express.static(__dirname));


app.get('/tick', (req, res) => {
  res.set('Content-Type', 'text/event-stream; charset=utf-8');
  res.set('Cache-Control', 'no-cache');

  let count = 0;

  const timer = setInterval(() => {
    count++;
    if (count >= 4) {
      clearInterval(timer);
      res.write('event: bye\ndata: bye\nretry: 5000\n\n');
      res.end();
      return
    }
    res.write('data: ' + count + '\n\n');
  }, 1000)

})

app.listen(8080, () => {
  console.log('Server is runnong on 8080')
})