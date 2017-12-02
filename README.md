# gulp-add-module-exports
## github
<https://github.com/takumus/gulp-add-module-exports>
## これは何
module.exportsを追加するgulp用プラグイン。  
typescriptでライブラリを書き出す時とかに使えるはず。  
`export default`は`export`の前に書いてください。  
`export`の後に`export default`すると上書きされてしまうので。  
いつか順番関係なくできるようにしたいです。
## インストール
`npm install gulp-add-module-exports --registry http://npm.takumus.com`
## 使い方
    var addModuleExports = require('gulp-add-module-exports');
    ~~
    ~~
    stream.pipe(addModuleExports())
    .pipe(gulp.dest("./js"))`