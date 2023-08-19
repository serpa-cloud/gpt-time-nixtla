// @flow
import stylex from '@serpa-cloud/stylex';

import Icon from './Icon';
import Flexbox from './Flexbox';

const styles = stylex.create({
  content: {
    flex: 1,
  },
});

type Props = {
  children: React$Node,
};

export default function TooltipLegend({ children }: Props): React$Node {
  return (
    <Flexbox columnGap={12} alignItems="center">
      <Icon size={20} icon="info" color="--neutral-color-500" />
      <div className={stylex(styles.content)}>{children}</div>
    </Flexbox>
  );
}
