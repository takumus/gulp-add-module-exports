var through = require('through2');
var PluginError = require('gulp-util').PluginError;
var PLUGIN_NAME = 'add-module-exports';
var path = require('path');
module.exports = function() {
    var transform = function(file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        }
        if (file.isBuffer()) {
            var contents = String(file.contents);
            contents = contents.replace(/exports\.([^\s]*)/g, 'module.exports.$1 = exports.$1');
            contents = contents.replace(/module.exports.default = exports.default = ([^\s;]*);/g, 'module.exports = $1; module.exports.default = $1; exports.default = $1;');
            file.contents = new Buffer(contents);
            return callback(null, file);
        }
        this.push(file);
        callback();
    };
    return through.obj(transform);
};