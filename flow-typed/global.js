declare module CSSModule {
  declare export default { [string]: string };
}

declare module SVGModule {
  declare export var ReactComponent: ({
    width?: number,
    height?: number,
    className?: string,
  }) => React$Node;
}

declare module Audio {
  declare export default string;
}
