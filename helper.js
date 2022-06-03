export function getComputedStyle(element, style = 'color') { // get style by element
  return window.getComputedStyle(element, null).getPropertyValue(style);
}
