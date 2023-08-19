// @flow
import stylex from '@serpa-cloud/stylex';
import { useCallback, useState } from 'react';

import Icon from './Icon';
import Cascader from './Cascader';
import InteractiveElement from './InteractiveElement';

const styles = stylex.create({
  root: {
    position: 'relative',
  },
  container: {
    position: 'relative',
  },
  closeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 16,
    height: 16,
    userSelect: 'none',
  },
  input: {
    height: 40,
    minWidth: 200,
    width: '100%',
    textIndent: 0,
    paddingLeft: 12,
    borderRadius: 8,
    paddingRight: 8,
    outline: 'none',
    fontSize: '0.875rem',
    boxSizing: 'border-box',
    color: 'var(--neutral-color-800)',
    fontFamily: 'var(--font-family-default)',
    backgroundColor: 'var(--neutral-color-100)',
    border: '1px solid var(--neutral-color-400)',
    display: 'flex',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: '0.875rem',
    color: 'var(--neutral-color-500)',
    fontFamily: 'var(--font-family-default)',
  },
  modalContainer: {
    position: 'absolute',
    top: -16,
    left: -8,
  },
});

type Props = {|
  +value: Array<string>,
  +placeholder: string,
  +children: React$Node,
  +onChange: (Array<string>) => void,
  +label?: ?React$Node,
|};

export default function FastSelect({
  value,
  onChange,
  placeholder,
  children,
  label,
}: Props): React$Node {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOnChange = useCallback<(Array<string>) => void>(
    (newValue: Array<string>) => {
      onChange(newValue);
      onClose();
    },
    [onChange, onClose],
  );

  const handleOnToggleOrgMenu = useCallback(
    (e) => {
      e.stopPropagation();
      setOpen((v) => !v);
    },
    [setOpen],
  );

  return (
    <div className={stylex(styles.root)}>
      <div className={stylex(styles.container)}>
        <InteractiveElement className={stylex(styles.input)} onClick={handleOnToggleOrgMenu}>
          {value.length ? (
            label || value
          ) : (
            <span className={stylex(styles.placeholder)}>{placeholder}</span>
          )}
        </InteractiveElement>

        <InteractiveElement
          className={stylex(styles.closeContainer)}
          onClick={handleOnToggleOrgMenu}
        >
          <Icon icon="expand_more" size={16} weight={400} color="--neutral-color-600" />
        </InteractiveElement>
      </div>
      <div className={stylex(styles.modalContainer)}>
        <Cascader open={open} value={value} onClose={onClose} onChange={handleOnChange}>
          {children}
        </Cascader>
      </div>
    </div>
  );
}

FastSelect.defaultProps = {
  label: null,
};
