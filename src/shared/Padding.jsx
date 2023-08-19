// @flow
import type { LayoutSize } from './Flexbox';

export type PaddingProps = {
  top?: LayoutSize | 'auto',
  bottom?: LayoutSize | 'auto',
  left?: LayoutSize | 'auto',
  right?: LayoutSize | 'auto',
  vertical?: LayoutSize,
  horizontal?: LayoutSize,
  children: React$Node,
  className?: string,
};

export default function Padding({
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  vertical = 0,
  horizontal = 0,
  className,
  children,
}: PaddingProps): React$Node {
  return (
    <div
      className={className}
      style={{
        paddingTop: vertical || top,
        paddingBottom: vertical || bottom,
        paddingRight: horizontal || right,
        paddingLeft: horizontal || left,
      }}
    >
      {children}
    </div>
  );
}

Padding.defaultProps = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  vertical: 0,
  horizontal: 0,
  className: '',
};
