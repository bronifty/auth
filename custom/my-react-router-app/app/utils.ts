const buildUrl = function (
  base: string,
  options: Record<string, string>,
  hash?: string
) {
  const newUrl = new URL(base);

  Object.keys(options).forEach(function (key) {
    newUrl.searchParams.set(key, options[key]);
  });

  if (hash) {
    newUrl.hash = hash;
  }

  return newUrl.toString();
};

const encodeClientCredentials = function (
  clientId: string,
  clientSecret: string
) {
  return Buffer.from(
    querystring.escape(clientId) + ":" + querystring.escape(clientSecret)
  ).toString("base64");
};

export { buildUrl, encodeClientCredentials };
