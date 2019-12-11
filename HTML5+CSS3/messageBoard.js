function saveStorage(id) {
	// body...
	var target = document.getElementById(id);
	var data = target.value;
	var time = new Date().getTime();
	localStorage.setItem(time,data);
	loadStorage('msg');
	alert('数据已经被保存！');
}

function loadStorage(id) {
	// body...
	var reselt = '<table border="1" cellspacing="0" cellpadding="10">';
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var date = new Date();
		date.setTime(key);
		var dateStr = date.toGMTString();
		reselt += '<tr><td>' + i + '</td><td>'+ value + '</td></tr>';
	}
	reselt += '</table>';
	var target = document.getElementById(id);
	target.innerHTML = reselt;
}

function clearStorage(id) {
	// body...
	localStorage.clear();
	loadStorage(id);
	alert('数据已经被清除！');
}