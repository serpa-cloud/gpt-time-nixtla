// @flow
import type { LayoutSize } from './Flexbox';

export type MarginProps = {
  top?: LayoutSize | 'auto',
  bottom?: LayoutSize | 'auto',
  left?: LayoutSize | 'auto',
  right?: LayoutSize | 'auto',
  vertical?: LayoutSize | 'auto',
  horizontal?: LayoutSize | 'auto',
  children: React$Node,
  className?: ?string,
};

export default function Margin({
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  vertical = 0,
  horizontal = 0,
  children,
  className,
}: MarginProps): React$Node {
  return (
    <div
      className={className ?? ''}
      style={{
        marginTop: vertical || top,
        marginBottom: vertical || bottom,
        marginRight: horizontal || right,
        marginLeft: horizontal || left,
      }}
    >
      {children}
    </div>
  );
}

Margin.defaultProps = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  vertical: 0,
  horizontal: 0,
  className: '',
};
