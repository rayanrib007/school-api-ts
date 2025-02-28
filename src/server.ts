import app from "./app";

app.listen(process.env.API_PORT, () => {
  console.log();
  console.log(`Server running on port ${process.env.API_PORT}`);
});
