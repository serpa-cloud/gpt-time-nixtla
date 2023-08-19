// @flow
import React from 'react';
import stylex from '@serpa-cloud/stylex';

import Icon from './Icon';
import Flexbox from './Flexbox';
import Text from './Text';
import InteractiveElement from './InteractiveElement';

const styles = stylex.create({
  container: {
    userSelect: 'none',
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 4,
    transitionProperty: 'all',
    transitionTimingFunction: 'var(--fds-soft)',
    transitionDuration: 'var(--fds-fast)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unchecked: {
    border: '1px solid var(--neutral-color-400)',
    backgroundColor: 'var(--neutral-color-100)',
  },
  checked: {
    border: '1px solid var(--primary-color-1)',
    backgroundColor: 'var(--primary-color-1)',
  },
  enabled: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.6,
    pointerEvents: 'none',
  },
});

type Props = {|
  +label?: ?React$Node,
  +checked: boolean,
  +disabled?: boolean,
  +onChange: (boolean) => void,
|};
export default function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
}: Props): React$Node {
  const handleOnChange = React.useCallback<() => void>(() => {
    if (onChange) onChange(!checked);
  }, [onChange, checked]);

  return (
    <Flexbox
      columnGap={16}
      className={stylex(styles.container, disabled ? styles.disabled : styles.enabled)}
    >
      <InteractiveElement
        disabled={disabled}
        onClick={handleOnChange}
        className={stylex(styles.checkContainer, checked ? styles.checked : styles.unchecked)}
      >
        {checked ? <Icon icon="check" color="--neutral-color-100" weight={300} size={20} /> : null}
      </InteractiveElement>
      {label ? <Text type="s1r">{label}</Text> : null}
    </Flexbox>
  );
}

Checkbox.defaultProps = {
  label: null,
  disabled: false,
};
