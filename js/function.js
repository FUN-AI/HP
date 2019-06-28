// デバッグ関連
var debug = true;

// パラメータ取得用関数
function getParam(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// ランダムな整数を返す
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
