import { FiberNode } from './fiber.ts';

export function renderWithHooks(wip: FiberNode) {
	const Component = wip.type;
	const props = wip.pendingProps;
	const children = Component(props);

	return children;
}
