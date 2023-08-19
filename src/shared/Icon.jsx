// @flow
import { useState, memo } from 'react';
import stylex from '@serpa-cloud/stylex';

import type { LayoutSize } from './Flexbox';

export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;
export type IconGrade = -25 | 0 | 200;
export type OpticalSize = 20 | 24 | 40 | 48;

type Props = {|
  fill?: boolean,
  icon: string,
  size?: LayoutSize,
  className?: string,
  weight?: IconWeight,
  grade?: IconGrade,
  opticalSize?: OpticalSize,
  color?: string,
  hoverColor?: string,
|};

const styles = stylex.create({
  icon: {
    transitionProperty: 'color',
    transitionDuration: 'var(--fds-duration-short-in)',
    transitionTimingFunction: 'var(--fds-animation-fade-in)',
  },
});

function Icon({
  icon,
  fill,
  size = 24,
  weight = 200,
  grade = 200,
  opticalSize = 24,
  className = '',
  color = '--primary-color-1',
  hoverColor,
}: Props): React$Node {
  const [hover, setHover] = useState(false);
  const style = {
    fontSize: size,
    color: `var(${hover ? hoverColor || color : color})`,
    fontVariationSettings: `"FILL" ${
      fill ? 1 : 0
    }, "wght" ${weight}, "GRAD" ${grade}, "opsz" ${opticalSize}`,
  };

  return (
    <div
      style={{ width: size, height: size }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <i className={`material-symbols-outlined ${className} ${stylex(styles.icon)}`} style={style}>
        {icon}
      </i>
    </div>
  );
}

Icon.defaultProps = {
  fill: false,
  size: 24,
  weight: 200,
  grade: 200,
  opticalSize: 24,
  className: '',
  color: '--primary-color-1',
  hoverColor: '',
};

export default (memo<Props>(Icon): React$AbstractComponent<Props, mixed>);
