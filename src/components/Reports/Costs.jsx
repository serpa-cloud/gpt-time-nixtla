// @flow
import { useState, useEffect, useMemo } from 'react';
import stylex from '@serpa-cloud/stylex';

import {
  Line,
  Area,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Scatter,
  ComposedChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import { Text, Margin, Flexbox, Spinner, Padding } from '../../shared';

type DataElement = {|
  +amount: number,
  +accrued_at: string,
  +provider: string,
  +service: string,
  +service: string,
  +provider_account_id: string,
|};

type Props = {|
  +pending: boolean,
  +data: Array<DataElement>,
|};

const styles = stylex.create({
  chartContainer: {
    height: 280,
  },
  explanationContainer: {
    borderRadius: 8,
    backgroundColor: 'var(--neutral-color-200)',
  },
});

export default function Costs({ pending, data }: Props): React$Node {
  const [forecastPending, setForecastPending] = useState(true);
  const [forecastData, setForecastData] = useState([]);
  const [forecastAreaData, setForecastAreaData] = useState([]);

  const [anomalyPending, setAnomalyPending] = useState(true);
  const [anomalyData, setAnomalyData] = useState([]);
  const [anomalyAreaData, setAnomalyAreaData] = useState([]);
  const [anomalyPoints, setAnomalyPoints] = useState([]);

  const [aiPending, setAIPending] = useState(false);
  const [aiContent, setAIContent] = useState('');

  const [seriesObject, seriesData, xObject] = useMemo(() => {
    const dict = data.reduce((acc, value) => {
      acc[value.accrued_at] = (acc[value.accrued_at] || 0) + parseFloat(value.amount);
      return acc;
    }, {});

    const series = Object.keys(dict).map((e) => ({
      timestamp: e,
      value: Number(dict[e].toFixed(2)),
    }));

    const xSeries = series.reduce((acc, value) => {
      return {
        ...acc,
        [value.timestamp]: [value?.timestamp?.split('-')?.[2] === '01' ? 1 : 0],
      };
    }, {});

    return [dict, series, xSeries];
  }, [data]);

  useEffect(() => {
    setForecastPending(true);
    setAnomalyPending(true);
    setAIContent('');

    if (Object.keys(seriesObject).length)
      fetch('/large_time_model', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          fh: 7,
          x: xObject,
          level: [90],
          y: seriesObject,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setForecastData(
            res.timestamp.map((t, index) => {
              return { timestamp: t.split(' ')[0], value: Number(res.value[index].toFixed(2)) };
            }),
          );

          if (res.timestamp && res['lo-90'] && res['hi-90']) {
            setForecastAreaData(
              res.timestamp.map((t, index) => {
                return {
                  timestamp: t.split(' ')[0],
                  range: [
                    Number(res['lo-90'][index].toFixed(2)),
                    Number(res['hi-90'][index].toFixed(2)),
                  ],
                };
              }),
            );
          } else {
            setForecastAreaData([]);
          }

          setForecastPending(false);
        });

    if (Object.keys(seriesObject).length)
      fetch('/large_time_model_insample', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          fh: 7,
          x: xObject,
          level: [90],
          y: seriesObject,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.timestamp && res.value) {
            setAnomalyData(
              res.timestamp.map((t, index) => {
                return { timestamp: t.split('T')[0], value: Number(res.value[index].toFixed(2)) };
              }),
            );
          } else {
            setAnomalyData([]);
          }

          if (res.timestamp && res['lo-90'] && res['hi-90']) {
            setAnomalyAreaData(
              res.timestamp.map((t, index) => {
                return {
                  timestamp: t.split('T')[0],
                  range: [
                    Number(res['lo-90'][index].toFixed(2)),
                    Number(res['hi-90'][index].toFixed(2)),
                  ],
                };
              }),
            );

            const anomalyTimeStamps = res.timestamp
              .map((t) => {
                const timestamp = t.split('T')[0];

                return {
                  timestamp,
                  y: seriesObject[timestamp],
                };
              })
              .filter((t, index) => {
                return t.y > res['hi-90'][index];
              });

            setAnomalyPoints(anomalyTimeStamps);

            setAnomalyPending(false);

            return anomalyTimeStamps;
          }

          setAnomalyAreaData([]);

          setAnomalyPoints([]);

          setAnomalyPending(false);

          return [];
        })
        .then((anomalyTimeStamps) => {
          if (anomalyTimeStamps.length) {
            setAIPending(true);

            fetch('/ai', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ dates: anomalyTimeStamps.map((e) => e.timestamp) }),
            })
              .then((r) => r.json())
              .then((r) => {
                setAIContent(r?.data?.content ?? '');
                setAIPending(false);
              });
          } else {
            setAIContent('');
            setAIPending(false);
          }
        });
  }, [seriesObject, xObject]);

  const showSpinner = pending || forecastPending;
  const showAnomalySpinner = pending || anomalyPending;

  return (
    <Flexbox flexDirection="column" rowGap={48}>
      <div>
        <Text type="s2b" color="--neutral-color-800">
          Current and Forecasted Cloud Costs
        </Text>
        <Margin top={40}>
          {showSpinner && (
            <Flexbox
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              rowGap={24}
              className={stylex(styles.chartContainer)}
            >
              <Spinner size={40} />
              <Text type="s0b">⌛️ Forecasting, please wait</Text>
            </Flexbox>
          )}
          {!showSpinner && (
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" type="category" allowDuplicatedCategory={false} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  dot={false}
                  strokeWidth={2}
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  data={seriesData}
                  name="Current costs"
                />
                <Area
                  name="Confidence interval"
                  dataKey="range"
                  stroke="#211f54"
                  strokeWidth={0}
                  fill="#dbdbdb"
                  data={forecastAreaData}
                />
                <Line
                  dot={false}
                  strokeWidth={2}
                  type="monotone"
                  dataKey="value"
                  stroke="#008bff"
                  data={forecastData}
                  name="Forecasted costs"
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </Margin>
      </div>
      <div>
        <Margin bottom={24}>
          <Text type="s2b" color="--neutral-color-800">
            Anomaly detection with Vantage and Nixtla
          </Text>
        </Margin>
        <Flexbox flexDirection="column" rowGap={32}>
          <Text type="bd">
            {`This app leverages the power of Vantage's robust data analytics platform 💼 and Nixtla's cutting-edge forecasting techniques 📈 to identify outliers in your data in real-time.`}
          </Text>
          <Text type="bd">
            🔍 You can view available reports 📋, input specific report IDs 🔢 for more detailed
            insights, and even fetch cost details 💰 on demand.
          </Text>
          <Text type="bd">
            {`So go ahead, explore your data 🔎, and let's unveil the hidden anomalies together! 😎`}
          </Text>
        </Flexbox>

        <Margin top={40}>
          {showAnomalySpinner && (
            <Flexbox
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              rowGap={24}
              className={stylex(styles.chartContainer)}
            >
              <Spinner size={40} />
              <Text type="s0b">⌛️ Forecasting anomaly, please wait</Text>
            </Flexbox>
          )}
          {!showAnomalySpinner && (
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" type="category" allowDuplicatedCategory={false} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  dot={false}
                  strokeWidth={2}
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  data={seriesData}
                  name="Current costs"
                />

                <Line
                  dot={false}
                  strokeWidth={2}
                  type="monotone"
                  dataKey="value"
                  stroke="#008bff"
                  data={anomalyData}
                  name="Forecasted costs"
                />
                <Area
                  opacity={0.6}
                  name="Confidence interval"
                  dataKey="range"
                  stroke="#211f54"
                  strokeWidth={0}
                  fill="#dbdbdb"
                  data={anomalyAreaData}
                />
                <Scatter dataKey="y" name="Anomaly" data={anomalyPoints} fill="#ff0000" />
              </ComposedChart>
            </ResponsiveContainer>
          )}
          {aiPending && (
            <Margin top={24}>
              <Flexbox alignItems="center" justifyContent="center" columnGap={16}>
                <Spinner size={20} />
                <Text type="s1r">Loading GPT explanation..</Text>
              </Flexbox>
            </Margin>
          )}
          {aiContent && (
            <Margin top={24}>
              <Padding
                horizontal={16}
                vertical={16}
                className={stylex(styles.explanationContainer)}
              >
                <Flexbox flexDirection="column" rowGap={24}>
                  <Text type="s1b" color="--neutral-color-800">
                    💡 GPT Explanation
                  </Text>
                  <Text type="bd">{aiContent}</Text>
                </Flexbox>
              </Padding>
            </Margin>
          )}
        </Margin>
      </div>
    </Flexbox>
  );
}
