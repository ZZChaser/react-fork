export const FunctionComponent = 0 as const;
export const HostRoot = 3 as const;
export const HostComponent = 5 as const;
export const HostText = 6 as const;

export type WorkTag =
	| typeof FunctionComponent
	| typeof HostText
	| typeof HostComponent
	| typeof HostRoot;
