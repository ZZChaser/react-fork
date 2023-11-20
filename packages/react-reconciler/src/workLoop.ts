import { beginWork } from './beginWork.js';
import { completeWork } from './completeWork.js';
import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber.ts';
import { HostRoot } from './workTags.js';

let workInProgress: FiberNode | null = null;

function prepareFreshStack(root: FiberRootNode) {
	workInProgress = createWorkInProgress(root.current, {});
}

export function scheduleUpdateOnFiber(fiber: FiberNode) {
	// TODO: 调度功能
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
}

function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;

	while (node.return) {
		node = node.return;
	}

	if (node.tag === HostRoot) {
		return node.stateNode;
	}

	return null;
}

function renderRoot(root: FiberRootNode) {
	// 初始化
	prepareFreshStack(root);

	do {
		try {
			workLoop();
			break;
		} catch (error) {
			console.error('workLoop 发生错误：', error);
		}
	} while (true);

	// const finishedWork = root.current.alternate;
	// root.finishedWork = finishedWork;

	// commitRoot(root);
}

function workLoop() {
	while (workInProgress !== null) {
		performUnitWork(workInProgress);
	}
}

function performUnitWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	fiber.memorizedProps = fiber.pendingProps;

	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;

	do {
		completeWork(node);

		const sibling = node.sibling;
		if (sibling! == null) {
			workInProgress = sibling;
			return;
		}

		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
