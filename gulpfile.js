var gulp = require("gulp"),
    connect = require("gulp-connect"),
    pugJS = require("gulp-pug"),
    scss = require("gulp-sass")(require('sass')),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

function createServer(){
    return connect.server({
        root: "docs",
        livereload: true
    });
}
function compilePugJS(){
    return gulp.src("src/pages/*.pug")
            .pipe(sourcemaps.init())
                .pipe(pugJS())
                .pipe(connect.reload())
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest("docs"));
}
function compileScss(){
    return gulp.src(["src/style/main.scss", "src/style/normalize.css", "src/style/style.css"])
            .pipe(sourcemaps.init())
                .pipe(concat("all.scss"))
                .pipe(scss({outputStyle: 'compressed'}))
                .pipe(prefix("last 2 versions"))
                .pipe(connect.reload())
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest("docs"))
}
function fonts(){
    return gulp.src("src/fonts/*")
            .pipe(gulp.dest("dist/fonts"));
}
function js(){
    return gulp.src("src/main.js")
            .pipe(sourcemaps.init())
                .pipe(concat("all.js"))
                .pipe(connect.reload())
                .pipe(uglify())
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest("docs"));
}
function watch(){
    gulp.watch("src/pages/*.pug", compilePugJS);
    gulp.watch("src/style/main.scss", compileScss);
    gulp.watch("src/main.js", js);
};
exports.default = gulp.parallel(createServer, watch);