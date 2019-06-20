
var contentData = "";

window.addEventListener("load", function () {
	// コンテンツのデータをすべてロード
	loadTextFile("./data/content.json", function (result) {
		// コンテンツデータをjsonに
		contentData = JSON.parse(result);
		console.log("コンテンツの数：", contentData.length);
		console.log(contentData);

		// jsonのロードより先にworksを押すとcontentDataがない状態で表示されてしまうのでその対策
		loadPage(0);

		// URLにパラーメタ指定コンテンツが有る場合の処理
		contentName = getParam("content");
		if (null != contentName) {
			var contentLine = contentData.filter(function (item, index) {
				if (item["title"] == contentName) return true;
			});

			// ページの移動と表示
			OnLinkClick("side_works");
			contentLine = contentLine[0];
			loadhtml(contentLine["path"], contentLine["title"]);
		}

		// URLにパラーメタ指定ページが有る場合の処理
		IDName = getParam("id");
		if (null != IDName) OnLinkClick(`side_${IDName}`);
	});

	// コンテンツ表示中にコンテンツ以外をクリックしたらdelhtmlを実行
	document.getElementById("content_base").onclick = function (event) {
		if (event.target.id == "content_base") delframe();
	};
});

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

// コンテンツを閉じる
function delframe() {
	// URL書き換え
	window.history.pushState(null, null, `${location.pathname}?id=works`);

	// コンテンツを非表示
	document.getElementById("content_base").style = "none";
	document.body.style.overflow = "auto";
}

// ページを指定してコンテンツのカードを配置する関数
function loadPage(page) {
	// ページの設定
	var Page_contentNum = 24;

	// コンテンツボックス
	var doc_content_box = document.getElementById("content_box");

	// コンテンツを削除（削除すると番地が前にシフトするので0を削除し続ける）
	var doc_content = doc_content_box.getElementsByClassName("content");
	var n = doc_content.length;
	for (var i = 0; i < n; i++) doc_content[0].remove();

	// からコンテンツを削除（上とまとめたい）
	var doc_content = doc_content_box.getElementsByTagName("div");
	var n = doc_content.length;
	for (var i = 0; i < n; i++) doc_content[0].remove();

	// コンテンツを配置（jsonデータをhtmlに）
	for (var i in contentData) {
		var content = document.createElement("a");
		var tagString = "";
		for(var j in contentData[i]["tag"]) tagString += (`#${contentData[i]["tag"][j]} `);
		content.setAttribute("class", "content");
		content.setAttribute("href", "javascript:void(0);");
		content.setAttribute("onclick", `loadhtml("${contentData[i]["path"]}", "${contentData[i]["title"]}");`);
		content.insertAdjacentHTML("beforeend", `<img src="${contentData[i]["image"]}" onerror="this.src='./img/noimage_1.gif';" alt="${contentData[i]["title"]}">`);
		content.insertAdjacentHTML("beforeend", `<div class="contentCard"><h1>${contentData[i]["title"]}</h1><h4>${contentData[i]["date"]}</h4><p>${tagString}</p></div>`);
		doc_content_box.appendChild(content);
	}

	// 一番下が伸びすぎないように空コンテンツを入れる
	for (var i = 0; i < 4; i++) {
		var content = document.createElement("div");
		content.setAttribute("style", "min-width: 256px; height: 0px;");
		doc_content_box.appendChild(content);
	}

	// コントロールバーを配置（コンテンツ数が増えたら制作）
	if (contentData.length == 0) {

	} else {

	}
}

// コンテンツを前面に表示する関数
function loadhtml(path, title) {
	// ウィンドウを表示
	document.getElementById("window_loading").style.display = "block";
	document.getElementById("window_main").style.display = "none";
	document.getElementById("window_title").getElementsByTagName("p")[0].innerHTML = "Now Loading...";
	document.body.style.overflow = "hidden";
	document.getElementById("content_base").style.display = "block";

	// URL書き換え
	window.history.pushState(null, null, `${location.pathname}?content=${title}`);

	// コンテンツの読み込み
	var xhr = new XMLHttpRequest();
	xhr.open('GET', `./${path}`, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function () {
		if (xhr.status === 200) {
			document.getElementById("window_main").src = `./${path}`;
			document.getElementById("window_main").onload = function () {
				framesetting(`./html/${title}.html`);
			}
		} else {
			document.getElementById("window_main").src = "./html/error.html";
			document.getElementById("window_main").onload = function () {
				framesetting(`Error - 404 - File not found / title=${title}`);
			}
		}
	}
	xhr.send();
}

// フレームにセットするもの（フレーム表示時に実行）
function framesetting(s) {
	// 表示切り替え
	document.getElementById("window_title").getElementsByTagName("p")[0].innerHTML = s;
	document.getElementById("window_main").style.display = "block";
	document.getElementById("window_loading").style.display = "none";

	// 閉じるやつ
	document.getElementById("window_button").onclick = function () {
		delframe();
	};
}

