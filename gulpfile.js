const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const compass = require('gulp-compass');
const runSequence = require('run-sequence');
const cleanCSS = require('gulp-clean-css');
const include = require('gulp-include');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
gulp.task('default', function() {
    return runSequence(['clean'],['build'],['server','watch']);
})
gulp.task('clean', function() {
    return del(['./dist/*','./test/*'],function() {
        console.log('task clean completed');
    })
})
gulp.task('build', function () {
    return runSequence(['uglifyHlayerjs', 'hlayerCss','testCss','img','testjs', 'html'], function() {
        console.log('task build is completed!');
    });
});

gulp.task('img', function() {
    return gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest('./test/img/'))
});
gulp.task('server', function() {
    browserSync.init({
        server:'./test',
        port: 8001
    });
});

gulp.task('reload', function() {
    return browserSync.reload();
});
gulp.task('uglifyHlayerjs', function(){
    return gulp.src('./src/hlayer/*.js')
        .pipe(uglify({mangle: {except: ['this' ,'that','dom']}}))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest('./test/js/'))
});

gulp.task('hlayerCss', function() {
    return gulp.src('./src/sass/hlayer/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './src/css',
            sass: './src/sass/hlayer'
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(cleanCSS())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(rename({basename:'hlayer'}))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest('./test/css/'));
});
gulp.task('testCss', function() {
    return gulp.src('./src/sass/doc/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './src/css',
            sass: './src/sass/doc'
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(cleanCSS())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(rename({basename:'main'}))
        .pipe(gulp.dest('./test/css/'));
});
gulp.task('html', function() {
    return gulp.src('./src/html/*.html')
        .pipe(include())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./test/'));
});
gulp.task('testjs', function(){
    return gulp.src('./src/js/*.js')
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('./test/js/'))
});

gulp.task('watch', function() {
    return gulp.watch([
        './src/**/*.*'
    ], function() {
        return runSequence(['build'],['reload']);
    });
})
