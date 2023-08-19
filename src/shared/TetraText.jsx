// @flow
import { useIntl } from 'react-intl';
import stylex from '@serpa-cloud/stylex';

import Flexbox from './Flexbox';

export type TetraTextType =
  | 'hero'
  | 'title'
  | 'subtitle'
  | 'head'
  | 'label'
  | 'section-label'
  | 'annotation'
  | 'note'
  | 'placeholder'
  | 'paragraph'
  | 'button';

type TetraTextColor = 'primary' | 'secondary' | 'accent' | 'error' | 'yellow' | 'purple' | '';

type Props = {
  intlId?: ?string,
  type: TetraTextType,
  children?: ?React$Node,
  color?: TetraTextColor,
};

const styles = stylex.create({
  default: {
    '-webkit-font-smoothing': 'antialiased',
  },
  headsContainer: {
    fontFamily: 'var(--font-family-apple)',
    boxSizing: 'border-box',
    flexShrink: 0,
    position: 'relative',
    zIndex: 0,
    maxWidth: '100%',
  },
  headsContent: {
    marginTop: -8,
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

  headInnerContent: {
    marginTop: 8,
    marginBottom: 8,
  },
  headContent: {
    wordBreak: 'break-word',
    lineHeight: 1.1875,
    fontSize: '1.125rem',
    textAlign: 'left',
    minWidth: 0,
    fontWeight: 'bold',
    maxWidth: '100%',
    wordWrap: '100%',
    display: 'block',
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

  heroInnerContent: {
    marginTop: 8,
    marginBottom: 8,
  },
  heroContent: {
    wordBreak: 'break-word',
    lineHeight: 1.1875,
    fontSize: '2rem',
    textAlign: 'left',
    minWidth: 0,
    fontWeight: 700,
    maxWidth: '100%',
    wordWrap: '100%',
    display: 'block',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -8,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -7,
      height: 0,
    },
  },

  titleInnerContent: {
    marginTop: 8,
    marginBottom: 8,
  },
  titleContent: {
    wordBreak: 'break-word',
    lineHeight: 1.1875,
    fontSize: '1.5rem',
    textAlign: 'left',
    minWidth: 0,
    fontWeight: 'bold',
    maxWidth: '100%',
    wordWrap: '100%',
    display: 'block',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -6,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -5,
      height: 0,
    },
  },

  subtitleInnerContent: {
    marginTop: 8,
    marginBottom: 8,
  },
  subtitleContent: {
    wordBreak: 'break-word',
    lineHeight: 1.1875,
    fontSize: '1.25rem',
    textAlign: 'left',
    minWidth: 0,
    fontWeight: 'bold',
    maxWidth: '100%',
    wordWrap: '100%',
    display: 'block',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -5,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -4,
      height: 0,
    },
  },

  buttonContainer: {
    marginRight: -3,
    marginLeft: -3,
    width: 'calc(100% + 6px)',
  },
  buttonContent: {
    flexShrink: 0,
    position: 'relative',
    marginRight: 3,
    marginLeft: 3,
    minWidth: 0,
    zIndex: 0,
    maxWidth: '100%',
    boxSizing: 'border-box',
    alignItems: 'center',
  },
  buttonInnerContent: {
    fontFamily: 'var(--font-family-default)',
    wordBreak: 'break-word',
    fontWeight: 'bold',
    minWidth: 0,
    maxWidth: '100%',
    wordWrap: 'break-word',
    color: 'inherit',
    fontSize: '1rem',
    lineHeight: 1.25,
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
  buttonLabelContainer: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  },

  textContainer: {
    fontFamily: 'var(--font-family-default)',
    boxSizing: 'border-box',
    flexShrink: 0,
    position: 'relative',
    zIndex: 0,
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

  labelInnerContent: {
    wordBreak: 'break-word',
    color: 'inherit',
    minWidth: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
    maxWidth: '100%',
    wordWrap: 'break-word',
    display: 'block',
    lineHeight: '1.3333',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -4,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -5,
      height: 0,
    },
  },

  sectionLabelInnerContent: {
    wordBreak: 'break-word',
    color: 'inherit',
    minWidth: 0,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    maxWidth: '100%',
    wordWrap: 'break-word',
    display: 'block',
    lineHeight: '1.3333',
    ':before': {
      display: 'block',
      content: '""',
      marginTop: -2,
      height: 0,
    },
    ':after': {
      display: 'block',
      content: '""',
      marginBottom: -4,
      height: 0,
    },
  },

  annotationInnerContent: {
    wordBreak: 'break-word',
    color: 'inherit',
    minWidth: 0,
    fontSize: '0.875rem',
    maxWidth: '100%',
    wordWrap: 'break-word',
    display: 'block',
    lineHeight: '1.3333',
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

  noteInnerContent: {
    wordBreak: 'break-word',
    color: 'inherit',
    minWidth: 0,
    fontSize: '0.875rem',
    maxWidth: '100%',
    wordWrap: 'break-word',
    display: 'block',
    lineHeight: '1.3333',
    fontStyle: 'italic',
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

  placeholderInnerContent: {
    wordBreak: 'break-word',
    color: 'inherit',
    minWidth: 0,
    fontSize: '0.875rem',
    maxWidth: '100%',
    wordWrap: 'break-word',
    display: 'block',
    lineHeight: '1.3333',
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
  paragraph: {
    marginTop: -5,
    marginBottom: -5,
  },
  paragraphContent: {
    marginTop: 5,
    marginBottom: 5,
  },
  innerParagraphContent: {
    fontFamily: 'var(--font-family-apple)',
    wordBreak: 'break-word',
    '-webkit-font-smoothing': 'antialiased',
    textAlign: 'left',
    minWidth: 0,
    fontSize: '1rem',
    maxWidth: '100%',
    wordWrap: 'break-word',
    fontWeight: 400,
    display: 'block',
    lineHeight: 1.33333,
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
  paragraphElement: {
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },

  primaryColor: {
    color: 'var(--primary-font-color)',
  },

  secondaryColor: {
    color: 'var(--secondary-font-color)',
  },

  defaultColor: {
    color: 'var(--default-font-color)',
  },

  placeholderColor: {
    color: 'var(--placeholder-font-color)',
  },

  accentColor: {
    color: 'var(--accent)',
  },

  errorColor: {
    color: 'var(--error)',
  },

  yellowColor: {
    color: 'var(--yellow)',
  },

  purpleColor: {
    color: 'var(--purple)',
  },
});

export default function TetraText({ type, intlId, children, color }: Props): React$Node {
  const intl = useIntl();
  let customColor = null;

  if (color === 'primary') customColor = styles.primaryColor;
  if (color === 'secondary') customColor = styles.secondaryColor;
  if (color === 'accent') customColor = styles.accentColor;
  if (color === 'error') customColor = styles.errorColor;
  if (color === 'yellow') customColor = styles.yellowColor;
  if (color === 'purple') customColor = styles.purpleColor;

  const content = intlId ? intl.formatMessage({ id: intlId }) : children;

  if (type === 'hero')
    return (
      <Flexbox
        alignItems="flex-start"
        flexDirection="column"
        className={stylex(
          styles.default,
          styles.headsContainer,
          customColor || styles.primaryColor,
        )}
      >
        <Flexbox className={stylex(styles.headsContent)} flexDirection="column">
          <div className={stylex(styles.heroInnerContent)}>
            <span dir="auto" className={stylex(styles.heroContent)}>
              <div>
                <h1 className={stylex(styles.headElement)}>{content}</h1>
              </div>
            </span>
          </div>
        </Flexbox>
      </Flexbox>
    );

  if (type === 'title')
    return (
      <Flexbox
        alignItems="flex-start"
        flexDirection="column"
        className={stylex(
          styles.default,
          styles.headsContainer,
          customColor || styles.primaryColor,
        )}
      >
        <Flexbox className={stylex(styles.headsContent)} flexDirection="column">
          <div className={stylex(styles.titleInnerContent)}>
            <span dir="auto" className={stylex(styles.titleContent)}>
              <div>
                <h2 className={stylex(styles.headElement)}>{content}</h2>
              </div>
            </span>
          </div>
        </Flexbox>
      </Flexbox>
    );

  if (type === 'head')
    return (
      <Flexbox
        alignItems="flex-start"
        flexDirection="column"
        className={stylex(
          styles.default,
          styles.headsContainer,
          customColor || styles.primaryColor,
        )}
      >
        <Flexbox className={stylex(styles.headsContent)} flexDirection="column">
          <div className={stylex(styles.headInnerContent)}>
            <span dir="auto" className={stylex(styles.headContent)}>
              <div>
                <h4 className={stylex(styles.headElement)}>{content}</h4>
              </div>
            </span>
          </div>
        </Flexbox>
      </Flexbox>
    );

  if (type === 'subtitle')
    return (
      <Flexbox
        alignItems="flex-start"
        flexDirection="column"
        className={stylex(
          styles.default,
          styles.headsContainer,
          customColor || styles.primaryColor,
        )}
      >
        <Flexbox className={stylex(styles.headsContent)} flexDirection="column">
          <div className={stylex(styles.subtitleInnerContent)}>
            <span dir="auto" className={stylex(styles.subtitleContent)}>
              <div>
                <h3 className={stylex(styles.headElement)}>{content}</h3>
              </div>
            </span>
          </div>
        </Flexbox>
      </Flexbox>
    );

  if (type === 'label')
    return (
      <Flexbox
        flexWrap="nowrap"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className={stylex(styles.default, styles.textContainer, customColor || styles.primaryColor)}
      >
        <Flexbox className={stylex(styles.textContent)} flexDirection="column">
          <span dir="auto" className={stylex(styles.labelInnerContent)}>
            {content}
          </span>
        </Flexbox>
      </Flexbox>
    );

  if (type === 'section-label')
    return (
      <Flexbox
        flexWrap="nowrap"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className={stylex(styles.default, styles.textContainer, customColor || styles.primaryColor)}
      >
        <Flexbox className={stylex(styles.textContent)} flexDirection="column">
          <span dir="auto" className={stylex(styles.sectionLabelInnerContent)}>
            {content}
          </span>
        </Flexbox>
      </Flexbox>
    );

  if (type === 'annotation')
    return (
      <Flexbox
        flexWrap="nowrap"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className={stylex(styles.default, styles.textContainer, customColor || styles.defaultColor)}
      >
        <Flexbox className={stylex(styles.textContent)} flexDirection="column">
          <span dir="auto" className={stylex(styles.annotationInnerContent)}>
            {content}
          </span>
        </Flexbox>
      </Flexbox>
    );

  if (type === 'note')
    return (
      <Flexbox
        flexWrap="nowrap"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className={stylex(styles.default, styles.textContainer, customColor || styles.defaultColor)}
      >
        <Flexbox className={stylex(styles.textContent)} flexDirection="column">
          <span dir="auto" className={stylex(styles.noteInnerContent)}>
            {content}
          </span>
        </Flexbox>
      </Flexbox>
    );

  if (type === 'placeholder')
    return (
      <Flexbox
        flexWrap="nowrap"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className={stylex(
          styles.default,
          styles.textContainer,
          customColor || styles.placeholderColor,
        )}
      >
        <Flexbox className={stylex(styles.textContent)} flexDirection="column">
          <span dir="auto" className={stylex(styles.placeholderInnerContent)}>
            {content}
          </span>
        </Flexbox>
      </Flexbox>
    );

  if (type === 'button')
    return (
      <Flexbox justifyContent="center" className={stylex(styles.default, styles.buttonContainer)}>
        <Flexbox className={stylex(styles.buttonContent)}>
          <span dir="auto" className={stylex(styles.buttonInnerContent)}>
            <span className={stylex(styles.buttonLabelContainer)}>{content}</span>
          </span>
        </Flexbox>
      </Flexbox>
    );

  if (type === 'paragraph')
    return (
      <Flexbox
        flexDirection="column"
        className={stylex(styles.paragraph, customColor || styles.defaultColor)}
      >
        <div className={stylex(styles.paragraphContent)}>
          <span className={stylex(styles.innerParagraphContent)}>
            <div className={stylex(styles.paragraphElement)}>
              <div dir="auto">{content}</div>
            </div>
          </span>
        </div>
      </Flexbox>
    );

  return null;
}

TetraText.defaultProps = {
  intlId: undefined,
  color: '',
  children: null,
};
