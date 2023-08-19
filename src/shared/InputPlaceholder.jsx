// @flow
import stylex from '@serpa-cloud/stylex';

const styles = stylex.create({
  element: {
    height: 56,
    borderRadius: 4,
    backgroundColor: 'var(--placeholder-background)',
  },
});

export default function InputPlaceholder(): React$Node {
  return <div className={stylex(styles.element)} />;
}
