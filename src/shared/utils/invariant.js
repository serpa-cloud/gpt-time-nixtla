// @flow
export default function invariant(cond: any, message: string): void {
  if (!cond) throw new Error(message);
}
