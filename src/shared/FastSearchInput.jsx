// @flow
import { useState, useCallback } from 'react';
import stylex from '@serpa-cloud/stylex';

import Icon from './Icon';
import InteractiveElement from './InteractiveElement';

const styles = stylex.create({
  container: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    top: 13,
    left: 12,
    width: 16,
    height: 16,
  },
  closeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 16,
    height: 16,
  },
  input: {
    height: 40,
    minWidth: 264,
    width: '100%',
    paddingTop: 9,
    textIndent: 32,
    paddingLeft: 8,
    borderRadius: 8,
    paddingRight: 8,
    outline: 'none',
    paddingBottom: 8,
    fontSize: '0.875rem',
    boxSizing: 'border-box',
    color: 'var(--neutral-color-800)',
    fontFamily: 'var(--font-family-default)',
    backgroundColor: 'var(--neutral-color-100)',
    border: '1px solid var(--neutral-color-400)',
    '::placeholder': {
      color: 'var(--neutral-color-500)',
    },
  },
});

type Props = {|
  +placeholder: string,
  +onChange: (value: string) => void,
|};

export default function FastSearchInput({ onChange, placeholder }: Props): React$Node {
  const [value, setValue] = useState<string>('');

  const handleOnChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      const { value: newValue } = e.currentTarget;

      setValue(newValue);
      onChange(newValue);
    },
    [onChange],
  );

  const onClose = useCallback(() => {
    setValue('');
    onChange('');
  }, [onChange]);

  return (
    <div className={stylex(styles.container)}>
      <div className={stylex(styles.iconContainer)}>
        <Icon icon="search" size={16} weight={400} color="--neutral-color-500" />
      </div>
      <input
        value={value}
        onChange={handleOnChange}
        className={stylex(styles.input)}
        placeholder={placeholder}
      />
      {value ? (
        <InteractiveElement className={stylex(styles.closeContainer)} onClick={onClose}>
          <Icon icon="close" size={16} weight={400} color="--neutral-color-600" />
        </InteractiveElement>
      ) : null}
    </div>
  );
}
