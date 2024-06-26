const express = require('express');
const rateLimit = require('express-rate-limit');
const https = require('https');

const app = express();

const blockedIPs = new Set();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    const clientIp = req.ip;
    blockedIPs.add(clientIp);

    res.status(429).json({ message: 'Your IP is blocked due to too many requests. Please try again later.' });
  }
});

// Middleware to block requests from permanently blocked IPs
app.use((req, res, next) => {
  if (blockedIPs.has(req.ip)) {
    return res.status(403).json({ message: 'Your IP has been permanently blocked.' });
  }
  next();
});

app.use(limiter);

app.get('/', (req, res) => {
  https.get('https://www.joshuaapostol.site/', (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      res.send(data);
    });
  }).on('error', (err) => {
    console.log('Error: ' + err.message);
    res.status(500).json({ message: 'Error accessing the protected site.' });
  });
});

app.get('/~', (req, res) => {
  https.get('https://autobot0.onrender.com/', (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      res.send(data);
    });
  }).on('error', (err) => {
    console.log('Error: ' + err.message);
    res.status(500).json({ message: 'Error accessing the protected site.' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
