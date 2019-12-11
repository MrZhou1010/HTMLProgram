function saveStorage(id) {
	// body...
	var target = document.getElementById(id);
	var str = target.value;
	if (typeof(localStorage) !== "undefined") {
        localStorage.setItem('mess',str);
    }
}

function loadStorage(id) {
	// body...
	var target = document.getElementById(id);
    if (typeof(localStorage) !== "undefined") {
        var msg = localStorage.getItem('mess');
        target.innerHTML = msg;
    }
}

function clearStorage() {
	// body...
	localStorage.clear();
}