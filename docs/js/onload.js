// 文字数抑えるためにところどころ不思議な書き方してます

// コンテンツカード用のデータが入る（window.onloadで一括ロード）
var contentData = "";

// パラメータ（コンテンツ以外の処理）
window.addEventListener("DOMContentLoaded", function () {
	// URLにパラーメタ指定ページが有る場合の処理
	var IDName = getParam("id");
	if (null != IDName) OnLinkClick(`side_${IDName}`);
});

// コンテンツ関連
window.addEventListener("DOMContentLoaded", function () {
	// コンテンツのデータをすべてロード
	loadTextFile("./data/content.json", function (result) {
		// コンテンツデータをjsonに
		contentData = JSON.parse(result);

		// jsonのロードより先にworksを押すとcontentDataがない状態で表示されてしまうのでその対策
		loadPage(0);

		// URLにパラーメタ指定コンテンツが有る場合の処理
		var contentName = getParam("content");
		if (null != contentName) {
			var contentLine = contentData.filter(function (item) {
				if (item["title"] == contentName) return true;
			});

			// ページの移動と表示
			OnLinkClick("side_works");
			loadhtml(contentLine[0]["path"], contentLine[0]["title"]);
		}
	});
});

// 操作関連
window.addEventListener("DOMContentLoaded", function () {
	// コンテンツ表示中にコンテンツ以外をクリックしたらdelhtmlを実行
	document.getElementById("content_base").onclick = function (event) {
		if (event.target.id == "content_base") delWindow();
	};
});

// コンテンツを閉じる
function delWindow() {
	// URL書き換え
	window.history.pushState(null, null, `${location.pathname}?id=works`);

	// コンテンツを非表示、スクロールの開放
	document.getElementById("content_base").style = "none";
	document.body.style.overflow = "auto";
}

// ページを指定してコンテンツのカードを配置する関数
function loadPage(page) {
	// ページの設定
	var Page_contentNum = 24;

	// コンテンツボックス
	var doc_content_box = document.getElementById("content_box");

	// コンテンツ、空コンテンツを削除（削除すると番地が前にシフトするので0を削除し続ける）
	while (doc_content_box.childNodes.length > 0) doc_content_box.childNodes[0].remove();

	// コンテンツを配置（jsonデータをhtmlに）
	for (var i in contentData) {
		var content = document.createElement("a");
		var tagString = "";
		for (var j in contentData[i]["tag"]) tagString += (`#${contentData[i]["tag"][j]} `);
		content.setAttribute("class", "content whiteLink");
		content.setAttribute("href", "javascript:void(0);");
		content.setAttribute("onclick", `loadhtml("${contentData[i]["path"]}", "${contentData[i]["title"]}");`);
		content.insertAdjacentHTML("beforeend", `<img src="${contentData[i]["image"]}" onerror="this.src='./img/default.jpg';" alt="${contentData[i]["title"]}">`);
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

}

// コンテンツを前面に表示する関数
function loadhtml(path, title) {
	// ウィンドウを表示
	contentWindow("Now Loading...", false);

	// URL書き換え
	window.history.pushState(null, null, `${location.pathname}?content=${title}`);

	// コンテンツの読み込み（無名配列？的な？わかりにくい...）
	var xhr = new XMLHttpRequest();
	xhr.open('GET', `./${path}`, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function () {
		loadTextFile(([`./html/error.html`, `./${path}`])[Number(xhr.status === 200)], function (result) {
			document.getElementById("window_main").innerHTML = result;
			contentWindow(([`Error - 404 - File not found`, `./html/${title}.html`])[Number(xhr.status === 200)], true);
		});
	}
	xhr.send();
}

// ウィンドウ表示をまとめて管理（windowタイトル, ロード済みか？：falseでロード中を表示）
function contentWindow(title, hasLoad) {
	// 表示の切り替え
	document.body.style.overflow = "hidden";
	document.getElementById("window_title").getElementsByTagName("p")[0].innerHTML = title;
	document.getElementById("window_main").style.display = hasLoad ? "block" : "none";
	document.getElementById("window_loading").style.display = hasLoad ? "none" : "block";	// if文を使うと文字数が多くなるので三項演算で...
	document.getElementById("content_base").style.display = "block";

	// 閉じるやつ
	document.getElementById("window_button").onclick = function () {
		delWindow();
	};
}
