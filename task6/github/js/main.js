(function() {
    var els = getElements();

    var sections = els.sections;
    var elements = els.elements;

    elements.btn.addEventListener('click', findBtnClick);
    function findBtnClick() {
        if(elements.searchInput.value) {
            gitapi.send('GET', 'users/' + elements.searchInput.value, function(result) {
                sections.user.style.display = 'block';
                elements.userAvatar.src = result.avatar_url;
                elements.userName.innerText = result.name;
                elements.userRepos.dataset.userLogin = result.login;
            });

            sections.repos.style.display = 'none';
            while (sections.repos.firstChild) {
                sections.repos.removeChild(sections.repos.firstChild);
            }
        }
    }

    elements.userRepos.addEventListener('click', findRepos);
    function findRepos(e) {
        gitapi.send('GET', 'users/' + e.target.dataset.userLogin + '/repos', function(result) {
            sections.repos.style.display = 'block';
            for(var i = 0; i < result.length; i++) {
                var item = document.createElement('p');
                item.innerText = result[i].full_name
                sections.repos.appendChild(item);
            }
        });
    }

    function getElements() {
        return {
            sections: {
                search: document.getElementById('search'),
                user: document.getElementById('user'),
                repos: document.getElementById('repos'),
            },
            elements: {
                searchInput: document.getElementById('searchtext'),
                btn: document.getElementById('findbtn'),
                userAvatar: document.getElementById('useravatar'),
                userName: document.getElementById('username'),
                userRepos: document.getElementById('userrepos')
            }
        }
    }
}())