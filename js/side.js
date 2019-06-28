
// 前回ターゲットとターゲット名と表示名
var targetStrBefore = "side_top";
var targetName = {
	"side_top": "top",
	"side_works": "works",
	"side_about": "about"
};

function OnLinkClick(targetStr) {
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