let lastClickedElement = null;
document.addEventListener('click', (event) => {
  lastClickedElement = event.target;
  // console.log(' 🍌 Last clicked element updated:', lastClickedElement);
  findComponentNameOfLastClickedElement();
});

function findFunctionalComponentName(domNode) {
  const reactPropRegex = /^__reactFiber\$/;

  function getFiberNodeFromDOMNode(node) {
    const keys = Object.keys(node).filter(key => reactPropRegex.test(key));
    return node[keys[0]];
  }

  function getReadableComponentName(fiber) {
    const { type } = fiber;
    if (typeof type === 'function') {
      return type.name || 'Anonymous';
    }
    if (typeof type === 'string') {
      return type;
    }
    return 'Unknown';
  }

  let fiberNode = getFiberNodeFromDOMNode(domNode);

  while (fiberNode) {
    if (fiberNode.tag === 0) {
      const componentName = getReadableComponentName(fiberNode);
      console.log('Found functional component:', componentName);
      return componentName;
    }
    fiberNode = fiberNode.return;
  }

  console.log('No functional component found in the fiber tree');
  return null;
}

function findComponentNameOfLastClickedElement() {
  if (lastClickedElement) {
    const componentName = findFunctionalComponentName(lastClickedElement);
    if (componentName) {
      console.log(`The last clicked element is within the functional component: ${componentName}`);
    }
  } else {
    console.log('No element has been clicked yet.');
  }
}
