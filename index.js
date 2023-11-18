require("dotenv").config();
const app = require("./app.js");
const PORT = process.env.PORT || 22000;

app.listen(PORT, () => {
  console.log(`Server is runnig at http://localhost:${PORT}`);
});
