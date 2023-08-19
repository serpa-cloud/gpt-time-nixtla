// @flow
import { useRef, useEffect } from 'react';
import stylex from '@serpa-cloud/stylex';
import { useSpring, animated } from 'react-spring';

import InteractiveElement from './InteractiveElement';

const styles = stylex.create({
  animated: {
    overflow: 'hidden',
  },
});

type Props = {
  show: boolean,
  header?: ?React$Node,
  children: React$Node,
  onChange?: ?() => void,
  onAnimate?: ?() => void,
};

export default function Accordeon({
  show = false,
  header,
  children,
  onChange,
  onAnimate,
}: Props): React$Node {
  const ref = useRef(null);

  const [style, animate] = useSpring(
    () => ({
      height: `${show ? ref?.current?.offsetHeight ?? '0' : 0}px`,
      opacity: show ? 1 : 0,
      onChange: onAnimate,
    }),
    [],
  );

  useEffect(() => {
    animate.start({
      height: `${show ? ref?.current?.offsetHeight ?? '0' : 0}px`,
      opacity: show ? 1 : 0,
    });
  }, [animate, ref, show]);

  return (
    <div>
      {header ? (
        <InteractiveElement avoidAnimation onClick={onChange}>
          {header}
        </InteractiveElement>
      ) : null}
      <animated.div style={style} className={stylex(styles.animated)}>
        <div ref={ref}>{children}</div>
      </animated.div>
    </div>
  );
}

Accordeon.defaultProps = {
  header: null,
  onChange: null,
  onAnimate: null,
};
