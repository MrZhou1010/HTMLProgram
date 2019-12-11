function saveStorage(id) {
	// body...
	var target = document.getElementById(id);
	var str = target.value;
	sessionStorage.setItem('mess',str);
}

function loadStorage(id) {
	// body...
	var target = document.getElementById(id);
	var msg = sessionStorage.getItem('mess');
	target.innerHTML = msg;
}