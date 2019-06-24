# HP
サークルホームページ

## 作る方へ
JavaScriptの関係上サーバー上でないと動きません。  
確認の際はpythonのサーバーが入っているのでそれを実行して確認してください。  
終了はCtrl+C長押しです（強制終了）。  
※index.htmlそのまま開いてもうまく表示できません。  
masterのファイルがgithub pagesに反映されます。
  
## docs内のフォルダ構成の説明
css...cssが入ってます。  
data...今の所コンテンツを管理する「content.json」だけが入ってます。  
html...コンテンツのhtmlファイル（コンテンツの表示部分のみ）が入っています。  
img...使用する画像が入っています。  
js...描画に必要なJavaScriptが入っています。  
  
## cssの説明
base.css...基本的なことと色の定義をしています。  
index_animation.css...indexのアニメーション部分を定義しています。  
index.css...index内でのみ使用するものを定義しています。  
oldBrowser.css...古いブラウザ向けの表示用です。  
window.css...コンテンツウィンドウの表示用です。  

## jsの説明
callback.js...コールバック関数をまとめるやつです。（現在は使っていないはずです。）  
function.js...基本関数をまとめてあるやつです。  
loadFile.js...ファイルのロード用。  
onload.js...ページ読み込み時に読み込む関数です。  
side.js...メニュー関連です。  
xmlhttp.js...よくわかんないけどないと動かないです。  
  
## その他のファイル
index.html...最初のページ。  
testServer.py...pythonで作ったローカル用httpサーバ。localhost:7999で確認できます。  
