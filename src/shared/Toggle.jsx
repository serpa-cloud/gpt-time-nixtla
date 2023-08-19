// @flow
import { useCallback } from 'react';
import stylex from '@serpa-cloud/stylex';
import { useSpring, animated } from 'react-spring';

import Flexbox from './Flexbox';
import TetraText from './TetraText';
import InteractiveElement from './InteractiveElement';

const styles = stylex.create({
  container: {
    width: 56,
    height: 24,
    borderRadius: 12,
    padding: 3,
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  track: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'var(--surface-background)',
    boxShadow: 'var(--shadow-1-composite)',
  },
});

type Props = {|
  label: string,
  active: boolean,
  onChange: (boolean) => void,
|};

export default function Toggle({ label, active, onChange }: Props): React$Node {
  const colorStyles = useSpring({ backgroundColor: active ? '#00C107' : '#E4E6EB' });
  const positionStyles = useSpring({ x: active ? 32 : 0 });

  const handleOnChange = useCallback(() => {
    if (onChange) onChange(!active);
  }, [onChange, active]);

  return (
    <InteractiveElement onClick={handleOnChange} onKeyPress={handleOnChange}>
      <Flexbox columnGap={8}>
        <animated.div style={colorStyles} className={stylex(styles.container)}>
          <animated.div style={positionStyles} className={stylex(styles.track)} />
        </animated.div>
        <TetraText type="placeholder">{label}</TetraText>
      </Flexbox>
    </InteractiveElement>
  );
}
