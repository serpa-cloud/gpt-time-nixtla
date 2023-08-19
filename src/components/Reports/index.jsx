// @flow
import stylex from '@serpa-cloud/stylex';
import { useMemo, useState, useEffect } from 'react';

import {
  Text,
  Card,
  Input,
  Divider,
  Padding,
  Flexbox,
  useInput,
  CascaderOption,
} from '../../shared';

import Costs from './Costs';

export type Report = {|
  +id: string,
  +title: string,
  +workspace: string,
|};

type Props = {|
  +token: string,
  +reports: Array<Report>,
|};

type ReportsByWorkspace = {| children: Array<Report>, id: string |};

const styles = stylex.create({
  body: {
    maxWidth: 960,
    margin: 'auto',
    minHeight: 'calc(100vh - var(--header-height) - 64px)',
  },
  reportSelector: {
    width: 240,
  },
});

export default function Reports({ token, reports }: Props): React$Node {
  const [costsData, setCostsData] = useState([]);
  const [costsPending, setCostsPending] = useState(false);

  const filter = useInput({
    name: 'filter',
    label: 'Filter',
    autoCloseSelect: true,
    value: '',
  });

  const report = useInput({
    name: 'report',
    label: 'Report',
    autoCloseSelect: true,
    value: reports[0]?.id.toString(),
    errors: {
      requiredError: 'This field is required',
    },
    onChange() {
      filter.setData((o) => ({ ...o, value: '' }));
    },
  });

  const grouping = useInput({
    name: 'grouping',
    label: 'Group by',
    autoCloseSelect: true,
    value: 'account_id',
    errors: {
      requiredError: 'This field is required',
    },
    onChange() {
      filter.setData((o) => ({ ...o, value: '' }));
    },
  });

  const reportValue = report.input.value;
  const filterValue = filter.input.value;
  const groupingValue = grouping.input.value ?? 'account_id';

  const reportOrgs = useMemo<Array<ReportsByWorkspace>>(() => {
    const reportsObj = reports.reduce((acc, value) => {
      const newObj = { ...acc };

      newObj[value.workspace] = newObj[value.workspace] || [];
      newObj[value.workspace].push(value);

      return newObj;
    }, {});

    return Object.keys(reportsObj).map((el) => ({ id: el, children: reportsObj[el] }));
  }, [reports]);

  useEffect(() => {
    if (reportValue) {
      setCostsData([]);

      setCostsPending(true);

      // eslint-disable-next-line no-inner-declarations
      function iterateCosts({ res, accCosts }) {
        res.then(({ costs, links }) => {
          const nextPage = links.next;
          const pageParams = new URL(nextPage).searchParams;
          const page = pageParams.get('page') || '1';

          if (Array.isArray(costs) && costs.length) {
            iterateCosts({
              res: fetch(
                `/v1/reports/${reportValue}/costs?grouping=${groupingValue}&page=${page}`,
                {
                  headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                },
              ).then((r) => r.json()),
              accCosts: [...accCosts, ...costs],
            });
          } else {
            setCostsData(accCosts);
            setCostsPending(false);
          }
        });
      }

      fetch(`/v1/reports/${reportValue}/costs?grouping=${groupingValue}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        iterateCosts({ res: res.json(), accCosts: [] });
      });
    }
  }, [reportValue, groupingValue, token]);

  const filterOptions = useMemo(() => {
    const rawOptions = costsData
      .map((e) => {
        if (groupingValue === 'account_id') return e.provider_account_id;
        return e[groupingValue];
      })
      .filter(Boolean);

    return [...new Set(rawOptions)];
  }, [costsData, groupingValue]);

  const costDataFiltered = useMemo(() => {
    if (!filterValue || !costsData.length) return costsData;

    return costsData.filter((e) => {
      if (groupingValue === 'account_id') return e.provider_account_id === filterValue;
      return e[groupingValue] === filterValue;
    });
  }, [costsData, filterValue, groupingValue]);

  return (
    <Card className={stylex(styles.body)}>
      <Padding vertical={16} horizontal={16}>
        <Flexbox columnGap={16}>
          <div className={stylex(styles.reportSelector)}>
            <Input input={report.input}>
              {reportOrgs
                .sort((a, b) => {
                  if (a.id > b.id) return 1;
                  if (a.id < b.id) return -1;
                  return 0;
                })
                .map((r) => (
                  <CascaderOption
                    selectable={false}
                    key={r.id.toString()}
                    value={r.id.toString()}
                    searchableValue={r.id.toString()}
                    label={
                      <Flexbox alignItems="center" columnGap={8}>
                        <Text type="s0m" color="--neutral-color-800">
                          {r.id}
                        </Text>
                      </Flexbox>
                    }
                  >
                    {r.children
                      .sort((a, b) => {
                        if (a.title > b.title) return 1;
                        if (a.title < b.title) return -1;
                        return 0;
                      })
                      .map((c) => (
                        <CascaderOption
                          key={c.id.toString()}
                          value={c.id.toString()}
                          searchableValue={c.title.toString()}
                          label={
                            <Flexbox alignItems="center" columnGap={8}>
                              <Text type="s0m" color="--neutral-color-800">
                                {c.title}
                              </Text>
                            </Flexbox>
                          }
                        />
                      ))}
                  </CascaderOption>
                ))}
            </Input>
          </div>
          <div className={stylex(styles.reportSelector)}>
            <Input input={grouping.input}>
              <CascaderOption
                value="account_id"
                searchableValue="Account"
                label={
                  <Flexbox alignItems="center" columnGap={8}>
                    <Text type="s0m" color="--neutral-color-800">
                      Account
                    </Text>
                  </Flexbox>
                }
              />
              <CascaderOption
                value="provider"
                searchableValue="Provider"
                label={
                  <Flexbox alignItems="center" columnGap={8}>
                    <Text type="s0m" color="--neutral-color-800">
                      Provider
                    </Text>
                  </Flexbox>
                }
              />
              <CascaderOption
                value="service"
                searchableValue="Service"
                label={
                  <Flexbox alignItems="center" columnGap={8}>
                    <Text type="s0m" color="--neutral-color-800">
                      Service
                    </Text>
                  </Flexbox>
                }
              />
            </Input>
          </div>
          {!!filterOptions.length && (
            <div className={stylex(styles.reportSelector)}>
              <Input input={filter.input} key={groupingValue}>
                <CascaderOption
                  value=""
                  searchableValue="All options"
                  label={
                    <Flexbox alignItems="center" columnGap={8}>
                      <Text type="s0m" color="--neutral-color-800">
                        All options
                      </Text>
                    </Flexbox>
                  }
                />
                {filterOptions.sort().map((e) => (
                  <CascaderOption
                    key={e}
                    value={e}
                    searchableValue={e.toString()}
                    label={
                      <Flexbox alignItems="center" columnGap={8}>
                        <Text type="s0m" color="--neutral-color-800">
                          {e}
                        </Text>
                      </Flexbox>
                    }
                  />
                ))}
              </Input>
            </div>
          )}
        </Flexbox>
      </Padding>
      <Divider />
      <Padding horizontal={16} vertical={24}>
        <Costs pending={costsPending} data={costDataFiltered} />
      </Padding>
    </Card>
  );
}
