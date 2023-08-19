// @flow
import stylex from '@serpa-cloud/stylex';
import { useTransition, animated, config } from 'react-spring';

import Card from './Card';

type Props = {|
  +open: boolean,
  +className?: ?string,
  +children: React$Node,
|};

const styles = stylex.create({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    transformOrigin: 'right top',
    backgroundColor: 'var(--modal-overlay)',
  },
  card: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 560,
    borderRadius: 0,
  },
});

export default function SideModal({ open, children, className }: Props): React$Node {
  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
  });

  return transitions(
    (animatedStyles, item) =>
      item && (
        <animated.div
          className={stylex(styles.container)}
          style={{ ...animatedStyles }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className={`${className ?? ''} ${stylex(styles.card)}`}>{children}</Card>
        </animated.div>
      ),
  );
}

SideModal.defaultProps = {
  className: '',
};
