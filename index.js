const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
