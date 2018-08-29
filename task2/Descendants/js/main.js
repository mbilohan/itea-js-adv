function getAllDescendants(el) {
    var allDescendantsNodes = [];

    function getDescendants(el) {
        for (var i = 0; i < el.childNodes.length; i++) {
            var current = el.childNodes[i];
            allDescendantsNodes.push(current);

            if (current.nodeType === Node.ELEMENT_NODE && current.childNodes.length) {
                getDescendants(current);
            }
        }
    }

    getDescendants(el);

    return allDescendantsNodes;
}

console.log(getAllDescendants(document.querySelector('[data-clear-items=false]')));