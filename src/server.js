import app from './app';

app.listen(3333, 'localhost', () =>
  console.log(`Listening on ${process.env.APP_URL}`)
);
