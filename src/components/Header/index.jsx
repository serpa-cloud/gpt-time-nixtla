// @flow
import { Link } from 'react-router-dom';
import stylex from '@serpa-cloud/stylex';

import { Icon, Divider, Flexbox, Padding } from '../../shared';

import { ReactComponent as Logo } from './logo-vatage.svg';
import { ReactComponent as LogoNixtla } from './logo-nixtla.svg';

const styles = stylex.create({
  header: {
    backgroundColor: 'var(--neutral-color-100)',
  },
  container: {
    height: 'var(--header-height)',
  },
  logoVantage: {
    height: 28,
  },
  logoNixtla: {
    width: 96,
    height: 14,
  },
});

export default function Header(): React$Node {
  return (
    <header className={stylex(styles.header)}>
      <Padding horizontal={24}>
        <Flexbox className={stylex(styles.container)} alignItems="center">
          <Link to="/">
            <Flexbox alignItems="center">
              <LogoNixtla className={stylex(styles.logoNixtla)} />

              <Icon icon="add" />

              <Logo className={stylex(styles.logoVantage)} />
            </Flexbox>
          </Link>
        </Flexbox>
      </Padding>
      <Divider />
    </header>
  );
}
