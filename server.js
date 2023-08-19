const { PORT = 7001 } = process.env;

const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const getTraceHeaders = require('./getTraceHeaders');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());

app.use(getTraceHeaders);

app.use(bodyParser.json({ limit: '60mb' }));

app.use(
  '/v1/reports',
  createProxyMiddleware({
    target: 'https://api.vantage.sh',
    changeOrigin: true,
    xfwd: false,
    toProxy: true,
  }),
);

app.post('/large_time_model', (req, res) => {
  fetch(`https://dashboard.nixtla.io/api/timegpt`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${process.env.NIXTLA_TOKEN}`,
    },
    body: JSON.stringify(req.body),
  })
    .then((r) => r.json())
    .then((r) => res.send(r?.data ?? {}));
});

app.post('/large_time_model_insample', (req, res) => {
  fetch(`https://dashboard.nixtla.io/api/timegpt_historic`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${process.env.NIXTLA_TOKEN}`,
    },
    body: JSON.stringify(req.body),
  })
    .then((r) => r.json())
    .then((r) => res.send(r?.data ?? {}));
});

app.post('/ai', async (req, res) => {
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert in anomaly detection for time series. In particular you help people understand pontential explanations for anomalies in cloud usage. The user gives you dates on which they saw spikes and you analyze the dates and explain what could be special about those dates. For example, if they are holidays or close to holidays, quarted ends, month ends, weekends, etc. You always answer in a short parragprah and are concise.',
      },
      {
        role: 'user',
        content: `Here is the list of dates where I detected spikes in usage in my cloud services: ${JSON.stringify(
          req.body.dates,
        )}`,
      },
    ],
  });

  res.send({ data: chatCompletion.choices[0].message, error: null });
});

app.use(express.static('build'));

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
