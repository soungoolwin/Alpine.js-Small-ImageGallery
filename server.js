const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const port = 3000; // You can use any port you prefer

app.use(cors());
app.use(bodyParser.json());

// Serve your static files (including db.json)
app.use(express.static("public"));

// Endpoint to add a new image
app.post("/addImage", (req, res) => {
  const { imageUrl } = req.body;

  // Load existing data from db.json
  fs.readFile("public/db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading db.json:", err);
      res.status(500).json({ error: "Server error" });
      return;
    }

    const imagesData = JSON.parse(data);
    imagesData.images.push(imageUrl);

    // Save the updated data back to db.json
    fs.writeFile("public/db/db.json", JSON.stringify(imagesData), (err) => {
      if (err) {
        console.error("Error writing db.json:", err);
        res.status(500).json({ error: "Server error" });
        return;
      }

      // Send a success response with the updated data
      res.json({ images: imagesData.images });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
