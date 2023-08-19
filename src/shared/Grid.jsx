// @flow
import type { LayoutSize } from './Flexbox';

type PropsGrid = {
  columns?: string,
  columnGap?: LayoutSize,
  rows?: string,
  rowGap?: LayoutSize,
  className?: string,
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
};

export default function Grid({
  rows,
  columns,
  children,
  className,
  rowGap = 8,
  columnGap = 8,
  alignItems = 'normal',
  alignContent = 'normal',
  justifyContent = 'normal',
}: PropsGrid): React$Node {
  const style: { [key: string]: any } = {
    alignItems,
    alignContent,
    justifyContent,
    display: 'grid',
    rowGap: `${rowGap}px`,
    columnGap: `${columnGap}px`,
  };

  if (rows) style.gridTemplateRows = rows;
  if (columns) style.gridTemplateColumns = columns;

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}

Grid.defaultProps = {
  alignItems: 'normal',
  alignContent: 'normal',
  justifyContent: 'normal',
  columns: '',
  columnGap: 8,
  rows: '',
  rowGap: 8,
  className: '',
  children: null,
};
