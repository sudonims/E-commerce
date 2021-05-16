const server =
  process.env.NODE_ENV === "production"
    ? "/server/"
    : "http://localhost:5000/server/";

export default server;
