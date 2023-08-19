// @flow
import React from 'react';
import stylex from '@serpa-cloud/stylex';

import Icon from './Icon';
import InteractiveElement from './InteractiveElement';

const styles = stylex.create({
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    transitionProperty: 'all',
    transitionTimingFunction: 'var(--fds-soft)',
    transitionDuration: 'var(--fds-fast)',
    cursor: 'pointer',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unchecked: {
    border: '1px solid var(--neutral-color-400)',
    backgroundColor: 'transparent',
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

type Props = {
  checked: boolean,
  disabled?: boolean,
  onChange: (boolean) => void,
};
export default function RadioButton({ checked, onChange, disabled = false }: Props): React$Node {
  const handleOnChange = React.useCallback<(any) => void>(() => {
    if (onChange) onChange(!checked);
  }, [onChange, checked]);

  return (
    <InteractiveElement
      disabled={disabled}
      onClick={handleOnChange}
      className={stylex(
        styles.checkContainer,
        checked ? styles.checked : styles.unchecked,
        disabled ? styles.disabled : styles.enabled,
      )}
    >
      {checked ? <Icon icon="check" size={20} color="--neutral-color-100" /> : null}
    </InteractiveElement>
  );
}

RadioButton.defaultProps = {
  disabled: false,
};
