// @flow
import { useState, useCallback } from 'react';
import stylex from '@serpa-cloud/stylex';

import Icon from './Icon';
import Flexbox from './Flexbox';
import InteractiveElement from './InteractiveElement';

type Props = {|
  +icon: string,
  +label?: ?string,
  +fill?: ?boolean,
  +iconColor?: ?string,
  +onClick: (SyntheticEvent<HTMLElement>) => void,
|};

const styles = stylex.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    transitionProperty: 'all',
    boxSizing: 'border-box',
    border: '1px solid var(--neutral-color-300)',
    boxShadow: 'var(--shadow-1)',
  },
  containerInteractive: {
    width: 38,
    height: 38,
    borderRadius: 20,
    cursor: 'pointer',
  },
  containerUnhover: {
    transitionDuration: 'var(--fds-duration-medium-in)',
    transitionTimingFunction: 'var(--fds-animation-fade-in)',
    backgroundColor: 'var(--neutral-color-100)',
  },
  containerHover: {
    transitionDuration: 'var(--fds-duration-medium-out)',
    transitionTimingFunction: 'var(--fds-animation-fade-out)',
    backgroundColor: 'var(--neutral-color-200)',
  },
  content: {
    width: '100%',
    height: '100%',
  },
});

export default function TapIcon({ icon, label, fill, iconColor, onClick }: Props): React$Node {
  const [hover, setHover] = useState<boolean>(false);

  const handleOnMouseEnter = useCallback(() => {
    setHover(true);
  }, [setHover]);

  const handleOnMouseLeave = useCallback(() => {
    setHover(false);
  }, [setHover]);

  const handleOnAction = useCallback(
    (e) => {
      if (onClick) onClick(e);
    },
    [onClick],
  );

  return (
    <div
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      className={stylex(styles.container, hover ? styles.containerHover : styles.containerUnhover)}
    >
      <InteractiveElement
        label={label ?? ''}
        onClick={handleOnAction}
        onKeyPress={handleOnAction}
        className={stylex(styles.containerInteractive)}
      >
        <Flexbox justifyContent="center" alignItems="center" className={stylex(styles.content)}>
          <Icon
            weight={100}
            opticalSize={20}
            icon={icon}
            color={iconColor ?? '--neutral-color-800'}
            fill={fill ?? false}
          />
        </Flexbox>
      </InteractiveElement>
    </div>
  );
}

TapIcon.defaultProps = {
  label: '',
  fill: false,
  iconColor: '--neutral-color-800',
};
