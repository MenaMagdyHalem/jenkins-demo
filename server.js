
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Jenkins Demo App</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f1f5f9;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .card {
          background: white;
          padding: 45px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          max-width: 500px;
          margin: 20px;
        }

        h1 {
          color: #2563eb;
          margin-bottom: 15px;
        }

        p {
          color: #475569;
          font-size: 18px;
        }

        .tag {
          display: inline-block;
          margin-top: 15px;
          padding: 10px 16px;
          background: #dbeafe;
          color: #1d4ed8;
          border-radius: 6px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Hello from Jenkins</h1>
        <p>DevOps Instructor: Mena Magdy Halem</p>
        <div class="tag">Node.js Application</div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});
