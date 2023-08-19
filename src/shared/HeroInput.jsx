/* eslint-disable react/no-danger */
// @flow

// Libs
import stylex from '@serpa-cloud/stylex';
import { useRef, useState, useEffect } from 'react';

// Components
import Flexbox from './Flexbox';

// Misc
import generateRandomString from './utils/generateRandomString';

// Flow
import type { inputRef as useInputReference } from './Input';

type Props = {
  input: useInputReference,
};

type TemplateProps = {|
  line: string,
  editor: string,
|};

const styles = stylex.create({
  container: {
    paddingBottom: 8,
    boxSizing: 'border-box',
    color: 'var(--inputext-color)',
    fontWeight: '400',
    width: '100%',
    lineHeight: '1.1667',
    paddingTop: 4,
    cursor: 'text',
    pointerEvents: 'all',
    '-webkit-font-smoothing': 'antialiased',
    fontFamily: 'var(--font-family-apple)',
  },
  smallFont: {
    fontSize: '0.9375rem',
  },
  largeFont: {
    fontSize: '1.5rem',
  },
  containerReference: {
    position: 'relative',
    zIndex: 0,
  },
  placeholderContainer: {
    color: 'var(--neutral-color-500)',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    transitionProperty: 'color',
    transitionDuration: 'var(--fds-duration-short-in)',
    transitionTimingFunction: 'var(--fds-animation-fade-in)',
  },
  unfocused: {
    color: 'var(--neutral-color-500)',
  },
  focused: {
    color: 'var(--neutral-color-600)',
  },
  placeholderElement: {
    whiteSpace: 'pre-wrap',
    width: '100%',
  },
  canvas: {
    backgroundColor: 'transparent',
    position: 'relative',
    zIndex: 1,
  },
  label: {
    '-webkit-user-modify': 'read-write-plaintext-only',
    outline: 'none',
    userSelect: 'text',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
  },
  line: {
    direction: 'ltr',
    textAlign: 'left',
  },
});

function getTemplate({ editor, line }: TemplateProps): string {
  const lineContent = line ? `<span data-text="true">${line}</span>` : '<br data-text="true" />';

  return `<div data-contents="true"><div data-block="true" data-editor="${editor}"><div class="${stylex(
    styles.line,
  )}"><span class="${stylex(styles.line)}">${lineContent}</span></div></div></div>`;
}

export default function HeroInput({
  input: { value = '', placeholder = '', onChange },
}: Props): React$Node {
  const [focused, setFocused] = useState<boolean>(false);
  const [html, setHTML] = useState<string>('');
  const idRef = useRef<string>(generateRandomString(5));
  const inputRef = useRef();
  const id = idRef.current;
  const isEmpty = !value;
  const placeholderId = `placeholder-${id}`;
  const showSmallFont = value.length > 85;

  const linesRef = useRef<string>(
    getTemplate({
      editor: id,
      line: value,
    }),
  );

  useEffect(() => {
    const htmlTemplate = linesRef.current;
    const container = inputRef.current;

    if (htmlTemplate && container) {
      setHTML(htmlTemplate);
    }
  }, []);

  function onInput(e: SyntheticInputEvent<HTMLDivElement>) {
    const root = e.target;

    if (root) {
      const newValue = root.innerText;

      if (onChange) {
        // $FlowFixMe
        onChange({
          target: { value: newValue },
          currentTarget: { value: newValue },
        });
      }
    }
  }

  function onFocus() {
    setFocused(true);
  }

  function onBlur() {
    setFocused(false);
  }

  return (
    <div className={stylex(styles.root)}>
      <Flexbox justifyContent="center">
        <div
          className={stylex(styles.container, showSmallFont ? styles.smallFont : styles.largeFont)}
        >
          <div className={stylex(styles.containerReference)}>
            {isEmpty && (
              <div
                className={stylex(
                  styles.placeholderContainer,
                  focused ? styles.focused : styles.unfocused,
                )}
              >
                <div className={stylex(styles.placeholderElement)} id={placeholderId}>
                  {placeholder}
                </div>
              </div>
            )}

            <div className={stylex(styles.canvas)}>
              <div
                spellCheck
                contentEditable
                suppressContentEditableWarning
                tabIndex="0"
                role="textbox"
                ref={inputRef}
                onBlur={onBlur}
                onInput={onInput}
                onFocus={onFocus}
                aria-label={placeholder}
                className={stylex(styles.label)}
                aria-describedby={isEmpty ? placeholderId : ''}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
      </Flexbox>
    </div>
  );
}
