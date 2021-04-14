const server =
  process.env.NODE_ENV === "production" ? "/" : "http://192.168.1.112:5000/";

export default server;
