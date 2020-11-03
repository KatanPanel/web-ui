export function isChildNode(
	element: Node | null | undefined,
	node: Node | null
): boolean {
	if (!element || node === null) return false;

	if (element == node) return true;

	if (element.contains(node)) return true;

	return isChildNode(element.childNodes[0], node);
}
