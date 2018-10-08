(function(){
    if (!('indexedDB' in window)) {
        console.log(`This browser doesn't support IndexedDB`);
        return;
    }

    var db;
    var empls = [];

    var dbRequest = window.indexedDB.open('empldb', 1);

    dbRequest.onerror = function(event) {
        console.log('onerror: db failure');
    }

    dbRequest.onupgradeneeded = function(event) {
        var db = event.target.result;

        if(!db.objectStoreNames.contains('employees')) {
            var emplStore = db.createObjectStore('employees', { keyPath: 'id' });
            emplStore.createIndex('firstName', 'firstName', {unique: false});
        }
    }

    dbRequest.onsuccess = function(event) {
        db = event.target.result;

        console.log(event.target);

        if(db.objectStoreNames.contains('employees')) {

            aj.get('/', function(result) {
                console.log(result);
                for(var i = 0; i < result.length; i++) {
                    empls.push(result[i])
                }

                var emplTr = db.transaction('employees', 'readwrite').objectStore('employees');
                console.log(empls);
                for(var i = 0; i < empls.length; i++) {
                    emplTr.add(empls[i]);
                    console.log(empls[i]);
                }
            });


        }

        // emplStore.transaction.oncomplete = function(ev) {
        //
        //     var emplTr = db.transaction('employees', 'readwrite').objectStore('employees');
        //     /*.add({
        //         id: 1,
        //         firstName: 'John',
        //         lastName: 'Paso'
        //     });*/
        //
        //     for(var i = 0; i < empls.length; i++) {
        //         emplTr.add(empls[i]);
        //     }
        // };
    }




    function smthWithDB() {
        var dbRequest = window.indexedDB.open('empldb', 1);

        dbRequest.onsuccess = function(event) {
            console.log('onsuccess: db opened');
            var db = event.target.result;
            var tx = db.transaction('employees', 'readonly')
                .objectStore('employees')
                .openCursor()
                .onsuccess = function(e) {
                var cursor = e.target.result;
                if(cursor) {
                    console.log(cursor.value);
                    cursor.continue();
                }
            };
        }

        dbRequest.onupgradeneeded = function(event) {
            console.log('onupgradeneeded: db created');
            var db = event.target.result;

            if(!db.objectStoreNames.contains('employees')) {
                var emplStore = db.createObjectStore('employees', { keyPath: 'id' });
                emplStore.createIndex('firstName', 'firstName', {unique: false});
                emplStore.transaction.oncomplete = function(ev) {

                    var emplTr = db.transaction('employees', 'readwrite').objectStore('employees');
                    /*.add({
                        id: 1,
                        firstName: 'John',
                        lastName: 'Paso'
                    });*/

                    for(var i = 0; i < empls.length; i++) {
                        emplTr.add(empls[i]);
                    }
                };
            } else {
                // event.target.transaction('employees').objectStore('employees').createIndex('firstName', 'firstName', {unique: false});
            }
        }

    }

    function findEmpls(e) {
        aj.get('/', function(result) {
            console.log(result);
            for(var i = 0; i < result.length; i++) {
                empls.push(result[i])
            }

            // smthWithDB();
        });
    }
}());