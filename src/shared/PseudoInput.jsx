/* eslint-disable no-nested-ternary */
// @flow
import stylex from '@serpa-cloud/stylex';

import Icon from './Icon';
import TetraText from './TetraText';
import InteractiveElement from './InteractiveElement';

import type { InteractiveElementEvent } from './InteractiveElement';

const styles = stylex.create({
  label: {
    zIndex: 0,
    height: 56,
    display: 'flex',
    outline: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: 'var(--surface-background)',
  },
  labelFocus: {
    border: '1px solid var(--input-focus-border)',
  },
  labelBlur: {
    border: '1px solid var(--input-blur-border)',
  },
  labelError: {
    border: '1px solid var(--input-error-border)',
  },
  file: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    cursor: 'pointer',
    zIndex: 2,
  },
  text: {
    left: 16,
    cursor: 'inherit',
    position: 'absolute',
    transitionDuration: 'var(--fds-fast)',
    pointerEvents: 'none',
    transitionProperty: 'transform',
    top: 21,
    transformOrigin: 'top left',
    maxWidth: '100%',
    transitionTimingFunction: 'var(--fds-soft)',
    right: 8,
    display: 'block',
  },
  textOpen: {
    transform: 'scale(.75) translateY(-17px)',
  },
  input: {
    fontSize: '1rem',
    paddingTop: 26,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    color: 'var(--input-color)',
    '-webkit-tap-highlight-color': 'transparent',
    fontWeight: 'normal',
    width: '100%',
    backgroundColor: 'transparent',
    lineHeight: 1.25,
    touchAction: 'manipulation',
    border: 'none',
    outline: 'none',
    fontFamily: 'var(--font-family-default)',
  },
  icon: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 24,
    height: 24,
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.4,
  },
});

type Props = {|
  +icon?: ?string,
  +value?: ?string,
  +error?: ?string,
  +placeholder: string,
  +disabled?: ?boolean,
  +onClick?: ?InteractiveElementEvent,
|};

export default function InputFile({
  onClick,
  icon,
  value,
  error,
  disabled,
  placeholder,
}: Props): React$Node {
  const isOpen = !!value;

  return (
    <InteractiveElement onClick={onClick} className={stylex(disabled ? styles.disabled : null)}>
      <div
        className={stylex(
          styles.label,
          error ? styles.labelError : isOpen ? styles.labelFocus : styles.labelBlur,
        )}
      >
        <span className={stylex(styles.text, isOpen ? styles.textOpen : null)}>
          <TetraText type="placeholder" color={error ? 'error' : isOpen ? 'accent' : ''}>
            {placeholder}
          </TetraText>
        </span>
        {value ? <span className={stylex(styles.input)}>{value}</span> : null}
        {icon ? (
          <div className={stylex(styles.icon)}>
            <Icon icon={icon} color="lite" />
          </div>
        ) : null}
      </div>
    </InteractiveElement>
  );
}

InputFile.defaultProps = {
  icon: '',
  error: '',
  value: null,
  onClick: null,
  disabled: false,
};
