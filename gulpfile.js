var gulp = require('gulp'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    sass= require('gulp-sass'),
    less = require('gulp-less'),
    gutil = require('gutil'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var c={};
c.DIST_URI="dist/";
c.SRC_URI="src/";


gulp.task('build-css', function () {
    // gulp.src(c.SRC_URI+'less/*.less')
    gulp.src(c.SRC_URI+'less/*.less')     
    gulp.src(c.SRC_URI+'scss/*.scss')
    //.pipe(plugins.plumber())
        .pipe(less())
        .pipe(sass())
        .pipe(concat('_global.css'))
        //.pipe(uglify())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest(c.DIST_URI + 'css')).on('error', gutil.log)
        .pipe(livereload());

    gulp.src(c.SRC_URI+'css/*.css')
    //.pipe(plugins.plumber())
    //.pipe(uglify())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest(c.DIST_URI + 'css')).on('error', gutil.log)
        .pipe(livereload());
});

gulp.task('build-page-css', function () {
    gulp.src(c.SRC_URI+'less/page/*.less')
    //.pipe(plugins.plumber())
        .pipe(less())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest(c.DIST_URI + 'css/page')).on('error', gutil.log)
        .pipe(livereload());

});

gulp.task('build-page-css', function () {
    gulp.src(c.SRC_URI+'scss/*.scss')
    //.pipe(plugins.plumber())
        .pipe(sass())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest(c.DIST_URI + 'css/page')).on('error', gutil.log)
        .pipe(livereload());

});

/*gulp.task('sass', function() {
    return gulp.src('scss/ *.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
}); */

/*gulp.task('sass', function(){
    return gulp.src('src/scss/ *.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('snap_scroll/dist/css'))
}); */
gulp.task('sass', function() {
    return gulp.src('src/scss/page/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(gulp.dest('dist/css/page'))
})

gulp.task('build-js', function () {
    gulp.src([
        c.SRC_URI+'js/*.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest(c.DIST_URI+'js'))

});
gulp.task('build-lib-js', function () {
    gulp.src([
        c.SRC_URI+'js/lib/angular.js'//include first
        ,c.SRC_URI+'js/lib/jquery.js'//include 2nd
        ,c.SRC_URI+'js/lib/moment.js'//...
        //,c.SRC_URI+'js/lib/moment-timezone-data.js'//...
        ,c.SRC_URI+'js/lib/*.js'
    ])
        .pipe(concat('_lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest(c.DIST_URI+'js'))

});

gulp.task('watch', function () {

    livereload.listen();
    //gulp.watch('public/js/libs/**/*.js', ['squish-jquery']);
    // gulp.watch('public/js/*.js', ['build-js']);
    gulp.watch(c.SRC_URI + 'less/*.less', ['build-css']);
    gulp.watch(c.SRC_URI + 'css/*.css', ['build-css']);
    gulp.watch(c.SRC_URI + 'less/page/*.less', ['build-page-css']);
    gulp.watch(c.SRC_URI + '/scss/**/*.scss', ['sass']);
    gulp.watch('snap_scroll/src/scss/**/*.scss', ['sass']);
    gulp.watch(c.SRC_URI + 'js/*.js', ['build-js']);

    gulp.watch(c.SRC_URI + 'js/lib/*.js', ['build-lib-js']);


});


gulp.task('default', ['watch']);



