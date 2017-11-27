/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author @takumus
*/
var ConcatSource = require("webpack-core/lib/ConcatSource");
function AddModuleExports() {}
AddModuleExports.prototype.apply = function(compiler) {
    compiler.plugin("compilation", function(compilation) {
        compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
            chunks.forEach(function(chunk) {
                chunk.files.forEach(function(file) {
                    // add module exports
                    compilation.assets[file] = new ConcatSource(
                        compilation.assets[file].source().replace(
                            /exports.default/g, 'module.exports = exports.default'
                        ), ''
                    );
                });
            });
            callback();
        });
    });
};
module.exports = AddModuleExports;