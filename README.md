<p align="center">
  <a href="#">
    <img width="150" height="150" src="https://github.com/serpa-cloud/gpt-time-nixtla/assets/4086186/8b1b5ba8-1627-4c2f-8ba8-e9bac78718f1" alt="FinOps" width="200" />
  </a>
</p>
<p align="center">
  <h1 align="center">FinOps GPT</h1>
  <p align="center">
    A FinOps application, powered by TimeGPT, GPT-4, and Vantage. 100% open source.
    <br />
    ⛅️💸🤖
    <br />
  </p>
</p>

## Demo

[Watch the video](https://github.com/serpa-cloud/gpt-time-nixtla/assets/4086186/e88e8c42-1e61-441e-9c7f-2a56fdb3e9fe)

## Interactive Demo

Live Demo: [TimeGPT + Vantage by Serpa Cloud](https://nixtla--nixtla-vantage-webapp--nixtla-web-app.cdn.sierranegra.cloud/)

## About

This project fetches historical cloud costs from Vantage's API. Using TimeGPT, a general pre-trained model for time series, it analyzes past behaviors, identifying trends and patterns to accurately predict future usage and detect anomalies. Finally, it uses GPT-4 to provide a possible explanation for the cause of the atypical spend.

The project includes a server component to manage the services and a web app based on [React](https://react.dev/).

## Before Start

Before running this application, you'll need:

- Token/API key from [Vantage](https://www.vantage.sh/)
- Token/API key from [Nixtla](https://nixtla.io/)
- Token/API key from [OpenAI](https://openai.com/)
- [NodeJS](https://nodejs.org/) v16+ installed

## Getting Started

After cloning, install dependencies by running

```
yarn
```

### Running in Development Mode (localhost)

To run the project, you need to execute both components in parallel:

#### Server

```
export NIXTLA_TOKEN="MY_NIXTLA_TOKEN" && export OPENAI_API_KEY="MY_OPENAI_API_KEY" && yarn serve
```

This runs the backend server at [http://localhost:7001](http://localhost:7001).

#### Client

```
yarn start
```

This runs the web app in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser. The page will reload when you make changes.

### Running in Live Mode

#### Compile the Web App

```
yarn build
```

#### Server

```
export NIXTLA_TOKEN="MY_NIXTLA_TOKEN" && export OPENAI_API_KEY="MY_OPENAI_API_KEY" && yarn serve
```

This runs the backend server at [http://localhost:7001](http://localhost:7001) and exposes static files at the root.

### Build Docker from Source

#### Create the Docker Image

```
docker build --pull --rm -f "Dockerfile" -t gpt-time-nixtla-vantage:latest "."
```

#### Run the Docker Image

```
docker run --env OPENAI_API_KEY="MY_OPENAI_API_KEY" --env NIXTLA_TOKEN="MY_NIXTLA_TOKEN" -p 127.0.0.1:80:80/tcp gpt-time-nixtla-vantage:latest
```

This runs the backend server at [http://localhost](http://localhost) and exposes static files at the root.

### Running using Docker from Dockerhub

#### Run the container

```
docker run --env OPENAI_API_KEY="MY_OPENAI_API_KEY" --env NIXTLA_TOKEN="MY_NIXTLA_TOKEN" -p 127.0.0.1:80:80/tcp serpacloud/gpt-time-nixtla-vantage:latest
```

This runs the backend server at [http://localhost](http://localhost) and exposes static files at the root.

## Serpa Cloud Deploy

You can make modifications to this application and easily deploy it using [Serpa Cloud](https://serpa.cloud). Just fork it on GitHub or upload the application to a new repository.

![Serpa](https://github.com/serpa-cloud/gpt-time-nixtla/assets/4086186/20aeee9d-1d06-43b2-9ddc-6a19a24aed74)

When configuring the deployment, remember to add the environment variables with your API keys, **OPENAI_API_KEY**, and **NIXTLA_TOKEN**.

## Contributing

This is a demo of the capabilities of using Nixtla, Vantange, and OpenAI to forecast and analyze cloud costs. It also intends to showcase how easy deployments are with Serpa. However, if the community shows interest, we are happy to include more features.

Top of mind, some next steps could be:

- Add support for [Pump](https://pump.co/)
- Add support for [Cloudthread](https://www.cloudthread.io/)
- Update the front-end to show progress.

If you're a developer who'd like to help with any of these, please open an issue to discuss the best way to tackle the challenge.

## License

[![License](https://img.shields.io/github/license/getumbrel/llama-gpt?color=%235351FB)]()

Made with love in 🇲🇽 by 🏳️‍⚧️.
