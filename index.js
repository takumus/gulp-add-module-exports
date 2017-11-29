var through = require('through2');
var PluginError = require('gulp-util').PluginError;
var PLUGIN_NAME = 'add-module-exports';
var path = require('path');
module.exports = function(exportName) {
    var transform = function(file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        }
        if (file.isBuffer()) {
            var contents = String(file.contents);
            var exportsDefault = `exports.default = ${exportName};`;
            if (contents.indexOf(exportsDefault) >= 0) {
                console.log(`module.exports added`);
            }
            contents = contents.replace(exportsDefault, `${exportsDefault}\nmodule.exports = ${exportName};\nmodule.exports.default = ${exportName}\n`);
            file.contents = new Buffer(contents);
            return callback(null, file);
        }
        this.push(file);
        callback();
    };
    return through.obj(transform);
};