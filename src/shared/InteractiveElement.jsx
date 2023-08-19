// @flow
const ENTER = 'Enter';
const ESCAPE = 'Escape';

export type InteractiveElementEvent = (
  SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
) => void;

type Props = {
  label?: string,
  className?: string,
  disabled?: boolean,
  children: React$Node,
  +onClick?: ?InteractiveElementEvent,
  +onKeyPress?: ?InteractiveElementEvent,
};

export default function InteractiveElement({
  label,
  onClick,
  children,
  disabled,
  className,
  onKeyPress,
}: Props): React$Node {
  function handleMouseDown(e) {
    e.preventDefault();
  }

  function handleKeyPress(event) {
    event.persist();
    const { key } = event;
    if (key === ENTER && onKeyPress) onKeyPress(event);
    if (key === ESCAPE) event.currentTarget.blur();
  }

  function handleClick(event) {
    event.persist();
    if (onClick) onClick(event);
  }

  return (
    <div
      tabIndex={disabled ? '-1' : '0'}
      aria-disabled={!!disabled}
      role="button"
      aria-label={label}
      className={className || ''}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyPress}
      onClick={handleClick}
      style={{ cursor: 'pointer', touchAction: 'manipulation' }}
    >
      {children}
    </div>
  );
}

InteractiveElement.defaultProps = {
  label: '',
  className: '',
  disabled: false,
  onClick: null,
  onKeyPress: null,
};
