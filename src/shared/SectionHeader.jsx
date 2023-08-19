// @flow
import { useCallback, useState } from 'react';
import stylex from '@serpa-cloud/stylex';

import Padding from './Padding';
import Flexbox from './Flexbox';
import TetraText from './TetraText';
import LiteButton from './LiteButton';
import ContextualMenu from './ContextualMenu';

import type { InteractiveElementEvent } from './InteractiveElement';

type Props = {|
  +title: string,
  +icon?: ?string,
  +subtitle: string,
  +options?: ?React$Node,
  +callToAction?: ?string,
  +onClick?: ?InteractiveElementEvent,
|};

const styles = stylex.create({
  header: {
    borderBottom: '1px solid var(--divider)',
  },
  description: {
    maxWidth: 600,
  },
  callToActionContainer: {
    position: 'relative',
  },
  modal: {
    width: 280,
  },
});

export default function SectionHeader({
  icon,
  title,
  onClick,
  options,
  subtitle,
  callToAction,
}: Props): React$Node {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const hasOptions = !!options;

  const handleOnClick = useCallback(
    (e) => {
      if (onClick) onClick(e);
      else if (hasOptions) {
        e.stopPropagation();
        setModalIsOpen(true);
      }
    },
    [onClick, hasOptions],
  );

  const handleOnClose = useCallback(() => {
    setModalIsOpen(false);
  }, [setModalIsOpen]);

  return (
    <header className={stylex(styles.header)}>
      <Padding bottom={24}>
        <Flexbox justifyContent="space-between">
          <Flexbox flexDirection="column" rowGap={16}>
            <TetraText type="subtitle">{title}</TetraText>
            <div className={stylex(styles.description)}>
              <TetraText type="paragraph">{subtitle}</TetraText>
            </div>
          </Flexbox>
          {callToAction ? (
            <div className={stylex(styles.callToActionContainer)}>
              <LiteButton icon={icon} onClick={handleOnClick}>
                {callToAction}
              </LiteButton>
              {options ? (
                <ContextualMenu
                  anchor="RIGHT"
                  open={modalIsOpen}
                  containerHeight={32}
                  onClose={handleOnClose}
                  className={stylex(styles.modal)}
                >
                  {options}
                </ContextualMenu>
              ) : null}
            </div>
          ) : null}
        </Flexbox>
      </Padding>
    </header>
  );
}

SectionHeader.defaultProps = {
  icon: null,
  onClick: null,
  options: null,
  callToAction: null,
};
