import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	ElementType,
	Key,
	Props,
	ReactElement,
	Ref,
	Type
} from 'shared/ReactTypes';

// ReactElement
const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'zhao'
	};

	return element;
};

export const jsx = (
	type: ElementType,
	config: Record<string, any>,
	...maybeChildren: any[]
) => {
	const { key = null, ref = null, ...props } = config;

	const childrenLength = maybeChildren.length;
	if (childrenLength === 1) {
		props['children'] = maybeChildren[0];
	} else if (childrenLength > 1) {
		props['children'] = maybeChildren;
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: Record<string, any>) => {
	const { key = null, ref = null, ...props } = config;

	return ReactElement(type, key, ref, props);
};
