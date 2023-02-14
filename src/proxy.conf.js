const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "https://desvioscarnaval-2023-bhtrans-default-rtdb.firebaseio.com",
    secure: true,
    logLevel: "debug",
    pathRewrite: { "^/api": "" },
  },
];

module.exports = PROXY_CONFIG;
