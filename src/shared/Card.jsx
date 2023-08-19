// @flow
import stylex from '@serpa-cloud/stylex';

export type CardProps = {
  className?: string,
  children?: React$Node,
  hideBorder?: ?boolean,
  hideShadow?: ?boolean,
};

const styles = stylex.create({
  container: {
    borderRadius: 8,
    boxShadow: 'var(--shadow-1)',
    position: 'relative',
    zIndex: 0,
    border: '1px solid var(--neutral-color-300)',
    backgroundColor: 'var(--neutral-color-100)',
  },
});

export default function Card({
  children,
  className = '',
  hideBorder,
  hideShadow,
}: CardProps): React$Node {
  return (
    <div
      className={`${stylex(styles.container)} ${className}`}
      style={{
        borderWidth: hideBorder ? 0 : 1,
        boxShadow: hideShadow ? 'none' : 'var(--shadow-1)',
      }}
    >
      {children}
    </div>
  );
}

Card.defaultProps = {
  className: '',
  children: null,
  hideBorder: false,
  hideShadow: false,
};
