module.exports = function getTraceHeaders(req, _, next) {
  req.tracingHeaders = {};

  const { headers } = req;
  const headersKeys = Object.keys(headers);

  headersKeys.forEach((el) => {
    if (
      el.includes('x-') ||
      el.includes('grpc-') ||
      el.includes('traceparent') ||
      el.includes('b3')
    )
      req.tracingHeaders[el] = headers[el];
  });

  next();
};
