export function textAreaAdjust(node: HTMLTextAreaElement) {
  node.style.height = "1px";
  node.style.height = 25 + node.scrollHeight + "px";
}
