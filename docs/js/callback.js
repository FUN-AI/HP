// コールバックをまとめるもの
var Callback = (function () {
    var Callback = function () {
        this.resultList = [];
        this.stepCount = 0;
        this.callCount = 0;
        this.then = null;
    };
    Callback.prototype.here = function () {
        var registerArray = arguments.length == 1 &&
            arguments[0] instanceof Array &&
            arguments[0].length == 0;
        if (arguments.length != 0 && !registerArray) throw new Error(
            "Callback#here に引数が渡されました。" +
            "xx.here() と書くべき場所で xx.here としている可能性があります。");
        return (function (callback, stepCount) {
            return function () {
                var result = arguments;
                if (stepCount == 0) callback.resultList[0] = [];
                if (!registerArray && result.length == 0) {
                    callback.resultList[0][stepCount] = null;
                } else if (!registerArray && result.length == 1) {
                    callback.resultList[0][stepCount] = result[0];
                } else {
                    callback.resultList[0][stepCount] = [];
                    for (var i = 0; i < result.length; i++) {
                        callback.resultList[0][stepCount][i] = result[i];
                    }
                }
                if (++callback.callCount >= callback.stepCount) {
                    if (callback.then != null) {
                        callback.then.apply(null, callback.resultList);
                        Callback.call(this);
                    } else throw new Error("then が未登録です");
                }
            }
        })(this, this.stepCount++);
    };
    return Callback;
})();