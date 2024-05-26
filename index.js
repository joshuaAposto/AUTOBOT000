const express = require('express');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const https = require('https');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    
   blockedIPs[clientIp] = true;
    setTimeout(() => {
      delete blockedIPs[clientIp];
    }, 20000); // Unblock after 20 seconds

    res.status(429).json({ message: 'Your IP is blocked due to too many requests. Please try again later.' });
  }
});
  
const speedLimiter = slowDown({
  windowMs: 30 * 1000,
  delayAfter: 10,
  delayMs: 500,
  onLimitReached: (req, res) => {
    res.status(429).json({ message: 'Too many requests, please try again later.' });
  }
});

app.use(limiter);
app.use(speedLimiter);

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
