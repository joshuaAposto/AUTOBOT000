const express = require('express');
const app = express();


const videos = [
  'https://i.imgur.com/NYxtiKB.mp4',
  'https://i.imgur.com/24jqqmT.mp4',
];

app.get('/random-video', (req, res) => {
  
  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];
  res.json({ video: randomVideo });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
