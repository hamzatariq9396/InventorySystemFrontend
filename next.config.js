module.exports = {
  reactStrictMode: true,
  env: {
    BACKEND_URL:process.env.BACKEND_URL,
BACKEND_URL_SOCKET:process.env.BACKEND_URL_SOCKET
  },
  serverRuntimeConfig: {
    // Your server-side runtime configuration here.
    // Add CORS options
    cors: {
      origin: 'https://inventory-system-eot88kwx9-hamzatariqs-projects.vercel.app/', // Replace with your allowed origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Enable credentials (cookies, Authorization headers, etc.)
      optionsSuccessStatus: 204, // Return a 204 status for preflight requests
    },
  },
};
