import { ReactElement } from 'shared/ReactTypes.js';
import { FiberNode } from './fiber.ts';
import { Update, processUpdateQueue } from './updateQueue.js';
import { HostRoot, HostText, HostComponent } from './workTags.js';
import { mountChildFibers, reconcileChildFibers } from './childFibers.js';

export const beginWork = (wip: FiberNode) => {
	switch (wip.tag) {
		case HostRoot:
			return updateHostRoot(wip);
		case HostComponent:
			return updateHostComponent(wip);
		case HostText:
			return null;
		default:
			if (__DEV__) {
				console.warn('beginWork 为实现的类型');
			}
	}
};

function updateHostRoot(wip: FiberNode) {
	const baseState = wip.memorizedState;
	const updateQueue = wip.updateQueue;
	const pending = updateQueue?.shared.pending as Update<unknown>;
	updateQueue!.shared.pending = null;

	const { memorizedState } = processUpdateQueue(baseState, pending);
	wip.memorizedState = memorizedState;
	const nextChild = wip.memorizedState;
	reconcileChildren(wip, nextChild);

	return wip.child;
}

function updateHostComponent(wip: FiberNode) {
	const nextProps = wip.pendingProps;
	const children = nextProps.children;
	reconcileChildren(wip, children);

	return wip.child;
}

function reconcileChildren(wip: FiberNode, children?: ReactElement) {
	const current = wip.alternate;

	if (current !== null) {
		// update
		wip.child = reconcileChildFibers(wip, current?.child, children);
	} else {
		// mount
		wip.child = mountChildFibers(wip, null, children);
	}
}
