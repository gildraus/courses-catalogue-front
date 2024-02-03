// Use the correct protocol based on the environment
const protocol = window.location.protocol;
const server_name =
  process.env.NODE_ENV === "production"
    ? `${protocol}//courses-catalogue-back.vercel.app`
    : "http://localhost:3001";

export default server_name;
