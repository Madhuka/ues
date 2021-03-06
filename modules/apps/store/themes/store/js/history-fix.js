(function () {
    //Fix for history.js not triggering statechange when last url is pushed again
    var old = History.pushState;

    var identicalRequest = function (url) {
        var u = History.getLastSavedState().url,
            index = u.lastIndexOf(url);
        return (index != -1 && u.substring(index) === url);
    };

    History.pushState = function (state, title, url) {
        if (identicalRequest(url)) {
            History.Adapter.trigger(window, 'statechange');
            return History.getLastSavedState();
        }
        return old.call(this, state, title, url);
    };
})();