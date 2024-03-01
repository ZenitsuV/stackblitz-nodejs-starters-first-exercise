const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Home Page</title><head>');
    res.write(
      '<body><h1>Welcome to Home Page!</h1><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  } else if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>USers Page</title><head>');
    res.write(
      '<body><div><ul><li>User1</li><li>User2</li><li>User3</li></ul></div></body>'
    );
    res.write('</html>');
    return res.end();
  } else if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      fs.writeFile('usernames.txt', username, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
};

exports.handler = requestHandler;
