// @flow
import { useCallback } from 'react';
import stylex from '@serpa-cloud/stylex';
import { Link as CustomLink } from 'react-router-dom';

import type { LocationShape } from 'react-router-dom';

import Text from './Text';
import type { TextType } from './Text';

type Props = {
  +type?: ?TextType,
  +children: React$Node,
  +className?: string,
  +to?: ?string | LocationShape,
  +replace?: boolean,
  +onClick?: ?Function,
  +useNative?: ?boolean,
  ...
};

const styles = stylex.create({
  link: {
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
      textDecorationColor: 'var(--primary-color-1)',
    },
  },
});

export default function Link({
  type = 's2b',
  children,
  onClick,
  useNative,
  ...props
}: Props): React$Node {
  const handleOnClick = useCallback(() => {
    if (onClick) onClick();
  }, [onClick]);

  if (useNative) {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, react/jsx-props-no-spreading
      <a {...props} className={stylex(styles.link)} onClick={handleOnClick}>
        <Text type={type || 's2b'} color="--primary-color-1">
          {children}
        </Text>
      </a>
    );
  }

  return (
    <CustomLink
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      to={props.to || ''}
      className={stylex(styles.link)}
      onClick={handleOnClick}
    >
      <Text type={type || 's2b'} color="--primary-color-1">
        {children}
      </Text>
    </CustomLink>
  );
}

Link.defaultProps = {
  to: '',
  type: 's2b',
  replace: false,
  useNative: false,
  className: undefined,
  onClick: undefined,
};
