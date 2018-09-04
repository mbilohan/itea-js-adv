(function() {
    var btnYes = document.getElementById('btn-yes');
    var btnNo = document.getElementById('btn-no');
    var btnNoWidth = btnNo.offsetWidth;
    var btnNoHeight = btnNo.offsetHeight;

    var left, top;

    btnNo.style.position = 'absolute';
    btnNo.setAttribute('tabindex', '-1');

    btnYes.addEventListener('click', function() {
        alert('Good decision +1');
    })
    btnNo.addEventListener('mouseover', function() {
        var newPosition = calculatePosistion();

        while(newPosition.left + btnNoWidth > document.documentElement.clientWidth || newPosition.top + btnNoHeight > document.documentElement.clientHeight) {
            newPosition = calculatePosistion();
        }

        btnNo.style.top = newPosition.top + 'px';
        btnNo.style.left = newPosition.left + 'px';
    });

    btnNo.addEventListener('click', function() {
        alert('click');
    });


    function calculatePosistion() {
        return {
            left: Math.random() * document.documentElement.clientWidth,
            top: Math.random() * document.documentElement.clientHeight
        }
    }

})();