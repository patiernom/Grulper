'use strict';

module.exports = function (gulp, plugins, helpers) {
    return function(){
        var lib = helpers.getLibrary("build").js,
            name = lib.sample.libname + '.js',
            outputName = '.min.js';

        return gulp.src(lib.sample.srcfiles, { cwd: helpers.projectSetting.projectDirectory })
            .pipe(plugins.concat(name))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.uglify())
            .pipe(plugins.rename({
                extname: outputName
            }))
            .pipe(plugins.sourcemaps.write('/maps'))
            .pipe(gulp.dest(lib.sample.destdir));
    }
};
