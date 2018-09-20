(function() {
    var els = getElements();

    els.elements.btn.addEventListener('click', findBtnClick);
    function findBtnClick() {
        if(els.elements.searchInput.value) {
            gitapi.send('GET', 'users/' + els.elements.searchInput.value, function(result) {
                els.sections.user.style.display = 'block';
                els.elements.userAvatar.src = result.avatar_url;
                els.elements.userName.innerText = result.name;
            });
        }
    }

    function getElements() {
        return {
            sections: {
                search: document.getElementById('search'),
                user: document.getElementById('user'),
            },
            elements: {
                searchInput: document.getElementById('searchtext'),
                btn: document.getElementById('findbtn'),
                userAvatar: document.getElementById('useravatar'),
                userName: document.getElementById('username')
            }
        }
    }
}())