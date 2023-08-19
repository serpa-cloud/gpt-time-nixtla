// @flow
import stylex from '@serpa-cloud/stylex';
import { useState, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { Padding } from './shared';

import Token from './components/Token';
import Header from './components/Header';
import Reports from './components/Reports';

import type { Report } from './components/Reports';

const styles = stylex.create({
  body: {
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - var(--header-height))',
  },
  titleContainer: {
    height: 88,
  },
});

export default function App(): React$Node {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string>('');
  const [reports, setReports] = useState<Array<Report>>([]);

  const handleReportsChange = useCallback(
    (data, tokenData) => {
      setToken(tokenData);
      setReports(data);

      if (Array.isArray(data) && data.length) {
        navigate('/reports');
      }
    },
    [navigate],
  );

  if (location.pathname !== '/' && (!reports.length || !token)) return <Navigate to="/" />;

  return (
    <>
      <Header />
      <Padding horizontal={24} vertical={32} className={stylex(styles.body)}>
        <Routes>
          <Route path="/reports" element={<Reports reports={reports} token={token} />} />
          <Route path="/" element={<Token onReportsChange={handleReportsChange} />} />
        </Routes>
      </Padding>
    </>
  );
}
