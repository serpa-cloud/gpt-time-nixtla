/* eslint-disable no-nested-ternary */
// @flow
import { useCallback } from 'react';
import stylex from '@serpa-cloud/stylex';

import Icon from './Icon';
import Text from './Text';

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
    border: '1px solid var(--primary-color-1)',
  },
  labelBlur: {
    border: '1px solid var(--neutral-color-300)',
  },
  labelError: {
    border: '1px solid var(--red-300)',
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
    color: 'var(--neutral-color-700)',
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
  uploadIcon: {
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
  +file?: ?File,
  +error?: ?string,
  +placeholder: string,
  +disabled?: ?boolean,
  +onChange?: ?(File) => void,
|};

export default function InputFile({
  file,
  error,
  disabled,
  onChange,
  placeholder,
}: Props): React$Node {
  const isOpen = !!file;

  const handleOnChange = useCallback(
    (e) => {
      if (onChange) onChange(e.target.files[0]);
    },
    [onChange],
  );

  return (
    <div
      className={stylex(
        styles.label,
        error ? styles.labelError : isOpen ? styles.labelFocus : styles.labelBlur,
        disabled ? styles.disabled : null,
      )}
    >
      <input type="file" className={stylex(styles.file)} onChange={handleOnChange} />
      <span className={stylex(styles.text, isOpen ? styles.textOpen : null)}>
        <Text type="s1m" color={error ? '--red-400' : isOpen ? '--blue-300' : ''}>
          {placeholder}
        </Text>
      </span>
      {file && <span className={stylex(styles.input)}>{file.name}</span>}
      <div className={stylex(styles.uploadIcon)}>
        <Icon icon="file_upload" color="--primary-color-1" fill />
      </div>
    </div>
  );
}

InputFile.defaultProps = {
  error: '',
  file: null,
  onChange: null,
  disabled: false,
};
