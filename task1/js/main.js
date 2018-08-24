(function(){
  var count = 0;
  var ul = document.getElementById('id1');

  if (ul) {
    var ulChilds = ul.childNodes;

    for ( var i = 0; i < ulChilds.length; i++ ) {
      if (ulChilds[i].nodeType === Node.COMMENT_NODE && ulChilds[i].data.trim() === 'red') {
        count++;
      }
    }
  }

  console.log('Count of comments with data of "red" = ' + count);
  return count;

}());

(function(){
  function applyStyles(className) {
    var liList = document.querySelectorAll('.' + className + ' li');

    for ( var i = 0; i < liList.length; i++ ) {
      var prevNode = liList[i].previousSibling;
        while (prevNode && prevNode.nodeType != Node.COMMENT_NODE) {
            prevNode = prevNode.previousSibling;
        }

        if(prevNode) {
            liList[i].style[className === 'foreground' ? "color" : "backgroundColor"] = prevNode.data.trim();
        }

    }
  }

  applyStyles('foreground');
  applyStyles('background');
}());