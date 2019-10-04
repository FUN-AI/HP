
// 前回ターゲットとターゲット名と表示名
var targetStrBefore = "side_top";
var targetName = {
	"side_top": "top",
	"side_works": "works",
	"side_about": "about"
};

function OnLinkClick(targetStr) {
	// #mainの表示を切り替える
	document.getElementById("main").style.height = "auto";
	document.getElementById(targetStrBefore).classList.remove("now");
	document.getElementById(targetName[targetStrBefore]).style.display = "none";
	document.getElementById(targetStr).classList.add("now");
	document.getElementById(targetName[targetStr]).style.display = "block";
	scrollTo(0, 0);
	targetStrBefore = targetStr;

	// URLの変更
	var addID = "";
	if (targetName[targetStr] != "top") addID = `?id=${targetName[targetStr]}`;
	window.history.replaceState(null, null, `${location.pathname}${addID}`);
}
