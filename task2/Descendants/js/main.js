function getDescendants(el, allDescendantsNodes) {
    allDescendantsNodes = (typeof allDescendantsNodes === 'undefined') ? [] : allDescendantsNodes;

    for (var i = 0; i < el.childNodes.length; i++) {
        var current = el.childNodes[i];
        allDescendantsNodes.push(current);

        if (current.nodeType === Node.ELEMENT_NODE && current.childNodes.length) {
            getDescendants(current, allDescendantsNodes);
        }
    }

    return allDescendantsNodes;
}

console.log(getDescendants(document.querySelector('[data-clear-items=false]')));