// @flow
import React, { useState } from 'react';
import stylex from '@serpa-cloud/stylex';

import Icon from './Icon';
import Text from './Text';
import Grid from './Grid';
import Padding from './Padding';
import Flexbox from './Flexbox';
import Divider from './Divider';
import Checkbox from './Checkbox';
import ContextualMenu from './ContextualMenu';
import FastSearchInput from './FastSearchInput';
import InteractiveElement from './InteractiveElement';

import invariant from './utils/invariant';

const styles = stylex.create({
  container: {
    position: 'relative',
  },
  content: {
    minWidth: 240,
  },
  row: {
    width: '100%',
    minHeight: 40,
    display: 'flex',
    cursor: 'pointer',
    borderRadius: 8,
    alignItems: 'center',
    transitionProperty: 'all',
    transitionDuration: 'var(--fds-duration-short-in)',
    transitionTimingFunction: 'var(--fds-animation-fade-in)',
    ':hover': {
      backgroundColor: 'var(--neutral-color-300)',
      transitionDuration: 'var(--fds-duration-short-out)',
      transitionTimingFunction: 'var(--fds-animation-fade-out)',
    },
  },
  rowSelected: {
    backgroundColor: 'var(--neutral-color-300)',
    transitionDuration: 'var(--fds-duration-short-out)',
    transitionTimingFunction: 'var(--fds-animation-fade-out)',
  },
  rowContent: {
    width: '100%',
  },
  resultsContainer: {
    overflow: 'auto',
    maxHeight: 216,
  },
});

type CascaderOptionProps = {|
  +value: string,
  +label: React$Node,
  +selectable?: ?boolean,
  +children?: ?React$Node,
  +searchableValue?: ?string,
  +placeholderLabel?: ?React$Node,
|};

// eslint-disable-next-line no-unused-vars
export function CascaderOption(_: CascaderOptionProps): React$Node {
  invariant(
    false,
    `A <CascaderOption> is only ever to be used as the child of <Cascader> element, ` +
      `never rendered directly. Please wrap your <CascaderOption> in a <Cascader>.`,
  );
}

type OptionObject = {|
  +value: string,
  +label: React$Node,
  +selectable?: ?boolean,
  +searchableValue?: ?string,
  +placeholderLabel?: ?React$Node,
  +children?: ?Array<OptionObject>,
|};

export function createNodesFromChildren(children: React$Node): OptionObject[] {
  const nodes: OptionObject[] = [];

  React.Children.forEach(children, (element) => {
    if (React.isValidElement(element)) {
      if (element.type === React.Fragment) {
        nodes.push(...createNodesFromChildren(element.props.children));
      } else {
        invariant(
          element.type === CascaderOption,
          `[${
            typeof element.type === 'string' ? element.type : element.type.name
          }] is not a <CascaderOption> component. All component children of <Cascader> must be a <CascaderOption> or <React.Fragment>`,
        );

        const { props } = element;
        const node: OptionObject = {
          ...props,
          selectable: props.selectable ?? true,
          children: createNodesFromChildren(props.children),
        };
        nodes.push(node);
      }
    }
  });

  return nodes;
}

export function createNodesFromChildrenFlatten(children: React$Node): OptionObject[] {
  const nodes: OptionObject[] = [];

  React.Children.forEach(children, (element) => {
    if (React.isValidElement(element)) {
      if (element.type === React.Fragment) {
        nodes.push(...createNodesFromChildrenFlatten(element.props.children));
      } else {
        invariant(
          element.type === CascaderOption,
          `[${
            typeof element.type === 'string' ? element.type : element.type.name
          }] is not a <CascaderOption> component. All component children of <Cascader> must be a <CascaderOption> or <React.Fragment>`,
        );

        const { props } = element;
        const node: OptionObject = {
          ...props,
          selectable: props.selectable ?? true,
        };

        nodes.push(node);
        nodes.push(...createNodesFromChildrenFlatten(props.children));
      }
    }
  });

  return nodes;
}

type CascaderColumnProps = {|
  +selected?: ?string,
  +value: Array<string>,
  +nodes: Array<OptionObject>,
  +onChange: (Array<string>) => void,
  +showNextlevel: ({ nodes?: ?Array<OptionObject>, selectedId: string }) => void,
|};

function CascaderColumn({
  nodes,
  value,
  selected,
  onChange,
  showNextlevel,
}: CascaderColumnProps): React$Node {
  const [search, setSearch] = useState<string>('');

  return (
    <div className={stylex(styles.content)}>
      <Padding vertical={8} horizontal={8}>
        <FastSearchInput onChange={(searchValue) => setSearch(searchValue)} placeholder="" />
        <Padding vertical={8}>
          <Divider />
        </Padding>
        <Flexbox flexDirection="column" rowGap={8} className={stylex(styles.resultsContainer)}>
          {nodes.map((node) => {
            const isSelected = value.includes(node.value);

            if (
              !search ||
              node.value
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(
                  search
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, ''),
                ) ||
              (node?.searchableValue ?? '')
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(
                  search
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, ''),
                )
            )
              return (
                <InteractiveElement
                  key={node.value}
                  className={stylex(
                    styles.row,
                    selected === node.value || isSelected ? styles.rowSelected : null,
                  )}
                  onClick={() => {
                    if (node?.children?.length) {
                      showNextlevel({ nodes: node.children, selectedId: node.value });
                    } else if (node.selectable) {
                      showNextlevel({ nodes: null, selectedId: node.value });
                      if (isSelected) {
                        onChange(value.filter((x) => x !== node.value));
                      } else onChange([node.value]);
                    }
                  }}
                >
                  <Padding vertical={8} horizontal={8} className={stylex(styles.rowContent)}>
                    <Flexbox alignItems="center" justifyContent="space-between">
                      <Flexbox alignItems="center" columnGap={16}>
                        {node.selectable && (
                          <InteractiveElement
                            onClick={(e) => {
                              e.stopPropagation();
                              if (node.children && node.selectable) {
                                if (isSelected) {
                                  onChange(value.filter((x) => x !== node.value));
                                } else onChange([node.value]);
                              }
                            }}
                          >
                            <Checkbox onChange={() => {}} checked={isSelected} />
                          </InteractiveElement>
                        )}
                        <div>
                          {typeof node.label === 'string' ? (
                            <Text type="s1r">{node.label}</Text>
                          ) : (
                            node.label
                          )}
                        </div>
                      </Flexbox>
                      {node?.children?.length ? (
                        <Icon icon="chevron_right" color="--primary-color-1" />
                      ) : null}
                    </Flexbox>
                  </Padding>
                </InteractiveElement>
              );

            return null;
          })}
        </Flexbox>
      </Padding>
    </div>
  );
}

CascaderColumn.defaultProps = {
  selected: null,
};

type Props = {|
  +value: Array<string>,
  +open: boolean,
  +onClose: () => void,
  +children: React$Node,
  +containerHeight?: ?number,
  +onChange: (Array<string>) => void,
|};

export default function Cascader({
  open,
  value,
  onClose,
  children,
  onChange,
  containerHeight,
}: Props): React$Node {
  const nodes = createNodesFromChildren(children);
  const [cols, setCols] = useState([nodes]);
  const [selected, setSelected] = useState([]);

  return (
    <div className={stylex(styles.container)}>
      <ContextualMenu
        anchor="LEFT"
        open={open}
        containerHeight={containerHeight ?? 0}
        onClose={onClose}
        className={stylex(styles.modal)}
      >
        <Grid columns={`repeat(${cols.length}, 280px)`} columnGap={0}>
          {cols.map((col, colIndex) => (
            <CascaderColumn
              key={selected[colIndex] ?? 'parent:root'}
              nodes={col}
              value={value}
              selected={selected[colIndex]}
              onChange={onChange}
              showNextlevel={({ nodes: newNodes, selectedId }) => {
                setSelected((s) => {
                  const els = [...s];
                  els[colIndex] = selectedId;
                  return els.slice(0, colIndex + 1).filter(Boolean);
                });
                setCols((oldCols) => {
                  const els = [...oldCols];
                  els[colIndex + 1] = newNodes;
                  return els.slice(0, colIndex + 2).filter(Boolean);
                });
              }}
            />
          ))}
        </Grid>
      </ContextualMenu>
    </div>
  );
}

Cascader.defaultProps = {
  containerHeight: 0,
};
