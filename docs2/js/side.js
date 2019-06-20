
var targetStrBefore = "side_top";
var targetName = {
	"side_top": "top",
	"side_works": "works",
	"side_about": "about"
};

function OnLinkClick(targetStr) {
	// デバッグ用
	console.log(targetStrBefore, ">>", targetStr, "メニューのボタンが押されました。");
	console.log(targetName[targetStrBefore], ">>", targetName[targetStr], "mainのコンテンツを切り替えます。");

	// 各idごとの処理
	switch (targetStr) {
		case "side_works":  // worksのページを0に戻す
			loadPage(0);
			break;
	}

	// #mainの表示を切り替える
	document.getElementById(targetStrBefore).classList.remove("now");
	document.getElementById(targetName[targetStrBefore]).style.display = "none";
	document.getElementById(targetStr).classList.add("now");
	document.getElementById(targetName[targetStr]).style.display = "block";
	scrollTo(0, 0);
	document.getElementById("main").style.height = "100%";
	targetStrBefore = targetStr;

	// URLの変更
	if (targetName[targetStr] == "top") {
		window.history.pushState(null, null, `${location.pathname}`);
	} else {
		window.history.pushState(null, null, `${location.pathname}?id=${targetName[targetStr]}`);
	}
}
