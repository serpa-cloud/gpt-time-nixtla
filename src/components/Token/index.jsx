// @flow
import stylex from '@serpa-cloud/stylex';
import { useState, useCallback } from 'react';

import {
  Card,
  Text,
  Input,
  Margin,
  Button,
  Spinner,
  Padding,
  Flexbox,
  useInput,
  validateData,
} from '../../shared';

const styles = stylex.create({
  body: {
    maxWidth: 960,
    margin: 'auto',
  },
  titleContainer: {
    height: 88,
  },
});

type Props = {|
  onReportsChange: (any, string) => void,
|};

export default function Token({ onReportsChange }: Props): React$Node {
  const [pending, setPending] = useState(false);

  const token = useInput({
    name: 'token',
    label: 'Token',
    autoFocus: true,
    value: '',
    errors: {
      requiredError: 'This field is required',
    },
  });

  const handleOnSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { data, errors } = validateData<{ token: string }>([token]);

      if (!errors) {
        setPending(true);

        fetch('/v1/reports', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${data.token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setPending(false);

            if (res.errors) token.setData((o) => ({ ...o, error: res.errors[0] }));
            else {
              onReportsChange(res.reports, data.token);
            }
          });
      }
    },
    [token, onReportsChange],
  );

  return (
    <div className={stylex(styles.body)}>
      <Flexbox flexDirection="column" rowGap={24} className={stylex(styles.titleContainer)}>
        <Text type="h4">Forecasting Cloud Costs with Vantage and Nixtla</Text>
        <Text type="bd">
          {`👋 Welcome to Vantage and Nixtla's forecasting app, your one-stop 🎯 solution for predicting ☁️ cloud costs with precision.`}
        </Text>
      </Flexbox>
      <Margin top={40}>
        <Card>
          <Padding horizontal={24} vertical={24}>
            <Flexbox flexDirection="column" rowGap={16}>
              <Text type="s1b" color="--primary-color-1">
                1. Vantage Token
              </Text>
              <Text type="bd">
                Please provide your Vantage Token, we are going to use it to fetch your report data.
              </Text>
            </Flexbox>
            <Margin top={32}>
              <form onSubmit={handleOnSubmit}>
                <input type="submit" style={{ display: 'none' }} />
                <Input input={token.input} />
                <Margin top={24}>
                  <Flexbox alignItems="center" columnGap={24}>
                    <Button onClick={handleOnSubmit} disabled={!token.input.value || pending}>
                      Continue
                    </Button>
                    {pending && <Spinner />}
                  </Flexbox>
                </Margin>
              </form>
            </Margin>
          </Padding>
        </Card>
      </Margin>
    </div>
  );
}
