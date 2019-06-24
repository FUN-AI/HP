// テキストファイルのロード
function loadTextFile(fName, Callback) {
    var httpObj = createXMLHttpRequest();
    httpObj.onreadystatechange = function () {
        if (httpObj.readyState === 4 && httpObj.status === 200) {
            Callback(httpObj.responseText);
        }
    }
    httpObj.open("GET", fName, true);
    httpObj.send(null);
}
