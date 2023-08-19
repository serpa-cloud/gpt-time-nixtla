// @flow
export type LayoutSize =
  | 0
  | 4
  | 8
  | 12
  | 16
  | 20
  | 24
  | 32
  | 40
  | 48
  | 56
  | 64
  | 72
  | 80
  | 88
  | 96
  | 104
  | 112
  | 120
  | 128
  | 136
  | 144
  | 152
  | 160
  | 168
  | 176
  | 184
  | 192
  | 200
  | 208
  | 216
  | 224
  | 232
  | 240
  | 248
  | 256
  | 264
  | 272
  | 280
  | 320;

type Props = {
  children?: ?React$Node,
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
    | 'normal'
    | '',
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'normal'
    | '',
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | 'normal' | '',
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | '',
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | '',
  columnGap?: LayoutSize,
  rowGap?: LayoutSize,
  className?: string,
};

export default function Flexbox({
  children,
  className,
  flexWrap = 'nowrap',
  alignItems = 'normal',
  alignContent = 'normal',
  flexDirection = 'row',
  justifyContent = 'normal',
  columnGap = 0,
  rowGap = 0,
}: Props): React$Node {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexWrap,
        alignItems,
        alignContent,
        flexDirection,
        justifyContent,
        columnGap,
        rowGap,
      }}
    >
      {children}
    </div>
  );
}

Flexbox.defaultProps = {
  alignContent: 'normal',
  justifyContent: 'normal',
  alignItems: 'normal',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  className: '',
  columnGap: 0,
  rowGap: 0,
  children: null,
};
