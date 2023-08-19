// @flow
import React from 'react';
import stylex from '@serpa-cloud/stylex';

import Flexbox from './Flexbox';

export type Component = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span' | 'p';

export type TextType =
  | 'd2'
  | 'd3'
  | 'd4'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'bl'
  | 'bd'
  | 'bs'
  | 's3b'
  | 's3m'
  | 's3r'
  | 's2b'
  | 's2m'
  | 's2r'
  | 's1b'
  | 's1m'
  | 's1r'
  | 's0b'
  | 's0m'
  | 's0r';

type Props = {|
  +type: TextType,
  +color?: ?string,
  +children?: ?React$Node,
  +component?: ?Component,
  +textAlign?: ?'left' | 'center' | 'right',
|};

const styles = stylex.create({
  default: {
    '-webkit-font-smoothing': 'antialiased',
  },
  headsContainer: {
    fontFamily: 'var(--font-family-default)',
    boxSizing: 'border-box',
    flexShrink: 0,
    position: 'relative',
    zIndex: 0,
    maxWidth: '100%',
    color: 'var(--neutral-color-800)',
  },
  headsContent: {
    marginTop: -7,
    marginBottom: -8,
  },
  headElement: {
    fontWeight: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
    outline: 'none',
    margin: 0,
    padding: 0,
  },
  titleInnerContent: {
    marginTop: 8,
    marginBottom: 8,
  },
  titleContent: {
    wordWrap: '100%',
  },
  paragraph: {
    marginTop: -5,
    marginBottom: -5,
    color: 'var(--neutral-color-600)',
  },
  paragraphContent: {
    marginTop: 5,
    marginBottom: 5,
  },
  innerParagraphContent: {
    fontFamily: 'var(--font-family-default)',
    wordBreak: 'break-word',
    '-webkit-font-smoothing': 'antialiased',
    textAlign: 'left',
    minWidth: 0,

    maxWidth: '100%',
    wordWrap: 'break-word',

    display: 'block',
  },

  paragraphElement: {
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  textContainer: {
    fontFamily: 'var(--font-family-default)',
    boxSizing: 'border-box',
    flexShrink: 0,
    position: 'relative',
    zIndex: 0,
    color: 'var(--neutral-color-600)',
  },
  textContent: {
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    flexBasis: 0,
    position: 'relative',
    minWidth: 0,
    flexShrink: 1,
    zIndex: 0,
    maxWidth: '100%',
    flexGrow: 1,
  },
  innerContent: {
    wordBreak: 'break-word',
    color: 'inherit',
    minWidth: 0,

    maxWidth: '100%',
    wordWrap: 'break-word',
    display: 'block',
  },
  d2: {
    lineHeight: 1.1665,
    fontSize: '4.5rem',
    fontWeight: 700,
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -15,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -17,
      height: 0,
    },
  },
  d3: {
    lineHeight: 1.25,
    fontSize: '3rem',
    fontWeight: 700,
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -12,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -13,
      height: 0,
    },
  },
  d4: {
    lineHeight: 1.4285,
    fontSize: '1.75rem',
    fontWeight: 700,
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -9,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -10,
      height: 0,
    },
  },
  h2: {
    lineHeight: 1.3157,
    fontSize: '2.375rem',
    fontWeight: 700,
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -10,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -12,
      height: 0,
    },
  },
  h3: {
    lineHeight: 1.416,
    fontSize: '1.5rem',
    fontWeight: 700,
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -7,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -9,
      height: 0,
    },
  },
  h4: {
    lineHeight: 1.2727,
    fontSize: '1.375rem',
    fontWeight: 700,
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -5,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -5,
      height: 0,
    },
  },
  h5: {
    lineHeight: 1.333,
    fontSize: '1.125rem',
    fontWeight: 700,
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -3,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -4,
      height: 0,
    },
  },
  h6: {
    lineHeight: 1.375,
    fontSize: '1rem',
    fontWeight: 700,
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -3,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -4,
      height: 0,
    },
  },
  s3b: {
    fontSize: '1.25rem',
    lineHeight: '1.1',
    fontWeight: '700',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -3,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -3,
      height: 0,
    },
  },
  s3m: {
    fontSize: '1.25rem',
    lineHeight: '1.1',
    fontWeight: '500',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -3,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -3,
      height: 0,
    },
  },
  s3r: {
    fontSize: '1.25rem',
    lineHeight: '1.1',
    fontWeight: '400',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -3,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -3,
      height: 0,
    },
  },
  s2b: {
    fontSize: '18px',
    lineHeight: '1.111',
    fontWeight: '700',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -2,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -3,
      height: 0,
    },
  },
  s2m: {
    fontSize: '18px',
    lineHeight: '1.111',
    fontWeight: '500',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -2,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -3,
      height: 0,
    },
  },
  s2r: {
    fontSize: '18px',
    lineHeight: '1.111',
    fontWeight: '400',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -2,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -3,
      height: 0,
    },
  },
  s1b: {
    fontSize: '16px',
    lineHeight: '1.125',
    fontWeight: '700',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -2,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -3,
      height: 0,
    },
  },
  s1m: {
    fontSize: '16px',
    lineHeight: '1.125',
    fontWeight: '500',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -3,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -3,
      height: 0,
    },
  },
  s1r: {
    fontSize: '16px',
    lineHeight: '1.125',
    fontWeight: '400',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -3,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -3,
      height: 0,
    },
  },
  s0b: {
    fontSize: '14px',
    lineHeight: '1.1428',
    fontWeight: '700',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -2,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -3,
      height: 0,
    },
  },
  s0m: {
    fontSize: '14px',
    lineHeight: '1.1428',
    fontWeight: '500',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -3,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -3,
      height: 0,
    },
  },
  s0r: {
    fontSize: '14px',
    lineHeight: '1.1428',
    fontWeight: '400',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -2,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -3,
      height: 0,
    },
  },
  bl: {
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '1.583',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -4,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -4,
      height: 0,
    },
  },
  bd: {
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '1.655',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -8,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -8,
      height: 0,
    },
  },
  bs: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '1.7',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -6,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -7,
      height: 0,
    },
  },
});

const typeComponentMapping = {
  d2: 'div',
  d3: 'div',
  d4: 'div',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

export default function Text({
  type,
  color,
  children,
  component,
  textAlign = 'left',
}: Props): React$Node {
  const content = children;

  if (
    type === 'd2' ||
    type === 'd3' ||
    type === 'd4' ||
    type === 'h2' ||
    type === 'h3' ||
    type === 'h4' ||
    type === 'h5' ||
    type === 'h6'
  ) {
    return (
      <Flexbox
        alignItems={
          // eslint-disable-next-line no-nested-ternary
          textAlign === 'left' ? 'flex-start' : textAlign === 'center' ? 'center' : 'flex-end'
        }
        flexDirection="column"
        className={stylex(styles.default, styles.headsContainer)}
      >
        <Flexbox className={stylex(styles.headsContent)} flexDirection="column">
          <div className={stylex(styles.titleInnerContent)}>
            <span
              dir="auto"
              className={stylex(styles.innerContent, styles.titleContent, styles[type])}
            >
              <div>
                {React.createElement(
                  component || typeComponentMapping[type],
                  {
                    className: stylex(styles.headElement),
                    style: { color: color ? `var(${color})` : 'inherit', textAlign },
                  },
                  content,
                )}
              </div>
            </span>
          </div>
        </Flexbox>
      </Flexbox>
    );
  }

  if (type === 'bl' || type === 'bd' || type === 'bs')
    return (
      <Flexbox flexDirection="column" className={stylex(styles.paragraph)}>
        <div className={stylex(styles.paragraphContent)}>
          <span className={stylex(styles.innerParagraphContent, styles[type])}>
            <div className={stylex(styles.paragraphElement)}>
              {React.createElement(
                component || 'div',
                {
                  dir: 'auto',
                  style: { color: color ? `var(${color})` : 'inherit', textAlign },
                },
                content,
              )}
            </div>
          </span>
        </div>
      </Flexbox>
    );

  if (
    type === 's3b' ||
    type === 's3m' ||
    type === 's3r' ||
    type === 's2b' ||
    type === 's2m' ||
    type === 's2r' ||
    type === 's1b' ||
    type === 's1m' ||
    type === 's1r' ||
    type === 's0b' ||
    type === 's0m' ||
    type === 's0r'
  )
    return (
      <Flexbox
        flexWrap="nowrap"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className={stylex(styles.default, styles.textContainer)}
      >
        <Flexbox className={stylex(styles.textContent)} flexDirection="column">
          {React.createElement(
            component || 'span',
            {
              dir: 'auto',
              className: stylex([styles.innerContent, styles[type]]),
              style: { color: color ? `var(${color})` : 'inherit', textAlign },
            },
            content,
          )}
        </Flexbox>
      </Flexbox>
    );

  return null;
}

Text.defaultProps = {
  color: null,
  children: null,
  component: null,
  textAlign: 'left',
};
