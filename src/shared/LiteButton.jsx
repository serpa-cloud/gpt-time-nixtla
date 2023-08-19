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
    color: 'var(--lite-color-button)',
    fill: 'var(--lite-color-button)',
    backgroundColor: 'var(--neutral-color-100)',
    border: '1px solid var(--neutral-color-300)',
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
  heroTextContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  enable: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.4,
    pointerEvents: 'none',
  },
  overlay: {
    backgroundColor: 'var(--neutral-color-200)',
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
  unhover: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
  iconColor: {
    transitionTimingFunction: 'var(--fds-animation-expand-collapse-in)',
    transitionDuration: 'var(--fds-duration-medium-in)',
    transitionProperty: 'color',
  },
});

export type ButtonSize = 'default' | 'hero';

type Props = {|
  +size?: ?ButtonSize,
  +children?: ?string,
  +icon?: ?string,
  +iconRight?: ?string,
  +textColor?: ?string,
  +iconFill?: ?boolean,
  +disabled?: boolean,
  +iconColor?: ?string,
  +showBorder?: ?boolean,
  +showShadow?: ?boolean,
  +onClick: InteractiveElementEvent,
|};

function LiteButton({
  icon,
  size,
  onClick,
  iconRight,
  textColor,
  iconFill,
  disabled,
  children,
  iconColor,
  showShadow,
  showBorder,
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
        disabled ? styles.disabled : styles.enable,
        isHero ? styles.heroContainer : null,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        borderWidth: showBorder ? 1 : 0,
        boxShadow: showShadow ? 'var(--shadow-1)' : 'none',
      }}
    >
      <InteractiveElement
        label={children ?? ''}
        onClick={handleOnClick}
        onKeyPress={handleOnClick}
        disabled={disabled}
        className={stylex(styles.content)}
      >
        <Flexbox
          className={stylex(styles.textContainer, isHero ? styles.heroTextContainer : null)}
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          columnGap={8}
        >
          {icon && (
            <Icon
              icon={icon}
              color={iconColor ?? ''}
              weight={300}
              grade={200}
              opticalSize={20}
              size={20}
              className={stylex(styles.iconColor)}
              fill={iconFill ?? false}
            />
          )}
          <Text type={isHero ? 's2m' : 's0m'} color={textColor || '--neutral-color-800'}>
            {children}
          </Text>
          {iconRight && (
            <Icon
              icon={iconRight}
              color={iconColor ?? ''}
              weight={300}
              grade={200}
              opticalSize={20}
              className={stylex(styles.iconColor)}
              fill={iconFill ?? false}
            />
          )}
        </Flexbox>
      </InteractiveElement>
      <div className={stylex(styles.overlay, hover ? styles.hover : styles.unhover)} />
    </div>
  );
}

LiteButton.defaultProps = {
  icon: null,
  iconFill: false,
  iconColor: '--primary-color-1',

  children: '',
  disabled: false,
  showBorder: false,
  showShadow: false,
  iconRight: '',
  textColor: '',
  size: 'default',
};

export default (React.memo<Props>(LiteButton): React$AbstractComponent<Props, mixed>);
