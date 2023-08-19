// @flow
import React from 'react';
import stylex from '@serpa-cloud/stylex';

import Text from './Text';
import Flexbox from './Flexbox';

import Icon from './Icon';
import InteractiveElement from './InteractiveElement';

import type { InteractiveElementEvent } from './InteractiveElement';

const styles = stylex.create({
  container: {
    height: 40,
    position: 'relative',
    borderRadius: 8,
    '-webkit-tap-highlight-color': 'transparent',
    '-webkit-user-select': 'none',
    transitionTimingFunction: 'var(--fds-animation-fade-out)',
    transitionDuration: 'var(--fds-duration-extra-extra-short-out)',
    transitionProperty: 'opacity',
  },
  heroContainer: {
    height: 56,
  },
  content: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    display: 'flex',
    outline: 'none',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    touchAction: 'manipulation',
  },
  textContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    boxSizing: 'border-box',
    flexShrink: 0,
    flexWrap: 'nowrap',
  },
  primary: {
    color: 'var(--neutral-color-100)',
    fill: 'var(--neutral-color-100)',
    backgroundColor: 'var(--primary-color-1)',
  },
  secondary: {
    color: 'var(--primary-color-1)',
    fill: 'var(--primary-color-1)',
    backgroundColor: 'var(--neutral-color-100)',
  },
  danger: {
    color: 'var(--neutral-color-100)',
    fill: 'var(--neutral-color-100)',
    backgroundColor: 'var(--red-300)',
  },
  enable: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.4,
    pointerEvents: 'none',
  },
  overlay: {
    backgroundColor: 'var(--secondary-color-1)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    borderRadius: 8,
    width: '100%',
    height: '100%',
    transitionTimingFunction: 'var(--fds-animation-fade-out)',
    transitionDuration: 'var(--fds-duration-extra-extra-short-out)',
    transitionProperty: 'opacity',
  },
  secondaryOverlay: {
    backgroundColor: 'var(--neutral-color-500)',
  },
  dangerOverlay: {
    backgroundColor: 'var(--red-400)',
  },
  unhover: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
  tertiary: {
    backgroundColor: 'var(--neutral-color-100)',
    boxShadow: 'var(--shadow-2)',
    border: '1px solid var(--neutral-color-200)',
  },
});

export type ButtonType = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'default' | 'hero';

type Props = {|
  +children?: ?string,
  +icon?: ?string,
  +iconRight?: ?string,
  +disabled?: boolean,
  +buttonType?: ButtonType,
  +onClick: InteractiveElementEvent,
  +size?: ?ButtonSize,
|};

function Button({
  icon,
  iconRight,
  disabled,
  children,
  onClick,
  buttonType,
  size,
}: Props): React$Node {
  const [hover, setHover] = React.useState<boolean>(false);
  const isHero = size === 'hero';

  const handleOnClick = React.useCallback(
    (e) => {
      if (onClick) onClick(e);
    },
    [onClick],
  );

  return (
    <div
      className={stylex(
        styles.container,
        styles[buttonType],
        disabled ? styles.disabled : styles.enable,
        isHero ? styles.heroContainer : null,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <InteractiveElement
        label={children ?? ''}
        onClick={onClick}
        onKeyPress={handleOnClick}
        disabled={disabled}
        className={stylex(styles.content)}
      >
        <Flexbox
          className={stylex(styles.textContainer)}
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          columnGap={8}
        >
          {icon && (
            <Icon
              icon={icon}
              color={buttonType === 'secondary' ? '--primary-color-1' : '--neutral-color-100'}
            />
          )}

          <Text
            type={isHero ? 's2m' : 's0b'}
            color={buttonType === 'secondary' ? '--primary-color-1' : '--neutral-color-100'}
          >
            {children}
          </Text>

          {iconRight && (
            <Icon
              icon={iconRight}
              color={buttonType === 'secondary' ? '--primary-color-1' : '--neutral-color-100'}
            />
          )}
        </Flexbox>
      </InteractiveElement>
      <div
        className={stylex(
          styles.overlay,
          buttonType === 'secondary' ? styles.secondaryOverlay : null,
          buttonType === 'danger' ? styles.dangerOverlay : null,
          hover ? styles.hover : styles.unhover,
        )}
      />
    </div>
  );
}

Button.defaultProps = {
  icon: null,
  iconRight: null,
  disabled: false,
  buttonType: 'primary',
  children: null,
  size: 'default',
};

export default (React.memo<Props>(Button): React$AbstractComponent<Props, mixed>);
