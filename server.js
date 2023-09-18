const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


const iconsDirectory = path.join(__dirname, 'icons-library', 'icons');
const iconsJSONPath = path.join(__dirname, 'icons-library', 'icons.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'icons-library')));


// Endpoint to get all icons as JSON
app.get('/icons', (req, res) => {
  const iconsJSON = JSON.parse(fs.readFileSync(iconsJSONPath, 'utf-8'));
  res.json(iconsJSON);
});



// Endpoint to get a single icon by name
app.get('/icons/:iconName', (req, res) => {
  const { iconName } = req.params;
  const iconsJSON = JSON.parse(fs.readFileSync(iconsJSONPath, 'utf-8'));

  if (iconsJSON[iconName]) {
    const iconPath = path.join(iconsDirectory, iconsJSON[iconName]);
    res.sendFile(iconPath);
  } else {
    res.status(404).send('Icon not found');
  }
});



app.get('/', (req, res) => {
  
  res.json({
    message : "Icons library"
  });
});




app.use(express.static('icons-library'));










const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
