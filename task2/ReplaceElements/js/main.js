function replaceElements(targetSelector, tagName, attrs) {
    var targetEls = document.querySelectorAll(targetSelector);

    for(var el = 0; el < targetEls.length; el++) {
        var newEl = document.createElement(tagName);
        newEl.innerHTML = targetEls[el].innerHTML;

        var targetAttrs = targetEls[el].attributes;
        for(var i = 0; i < targetAttrs.length; i++ ) {
            newEl.setAttribute(targetAttrs[i].nodeName, targetAttrs[i].nodeValue)
        }

        for(var j = 0; j < attrs.length; j++ ) {
            if(attrs[j].key === 'style') {
                newEl.style.cssText += attrs[j].value;
            } else if(attrs[j].key === 'class') {
                newEl.classList.add(attrs[j].value);
            } else {
                newEl.setAttribute(attrs[j].key, attrs[j].value)
            }
        }

        targetEls[el].parentElement .replaceChild(newEl, targetEls[el]);
    }
}


replaceElements('ul.background', 'ol', [
    { key: 'type', value: 'a' },
    { key: 'style', value: 'border: 1px dashed red; padding: 15px 35px;' },
    { key: 'class', value: 'new-custom-class' }
]);

replaceElements('span', 'i', [ { key: 'style', value: 'text-align: center; display: block;' } ]);