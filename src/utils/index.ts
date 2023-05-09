import { PropsWithChildren } from "react";

export type ComponentWithChildren<P extends {} = {}> = React.FC<
  PropsWithChildren<P>
>;
