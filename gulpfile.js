'use strict'

const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const fs = require('fs');
const gulpPug = require('gulp-pug');
const spawn = require('child_process').spawn;
const browserSync = require('browser-sync').create();
const exec = require('child_process').exec;
const reload = browserSync.reload;
// Save a reference to the `reload` method

const src_front = './';
const src_images = './images/**/*.*';
const src_fonts = './fonts/**/*.*';
const src_views = './views/**/*.pug';
const src_styles = './styles/**/*.less';
const src_js = './scripts/**/*.js';
const src_json = "./scripts/**/*.json"

gulp.task('copy-images', function() {
	gulp.src(['./images/**/*.*'])
	.pipe(gulp.dest('./build/images/'))
});

gulp.task('copy-fonts', function() {
	gulp.src(['./fonts/**/*.*'])
	.pipe(gulp.dest('./build/fonts/'))
});

gulp.task('pug', function() {
	gulp.src('./views/**/*.pug')
	.pipe(gulpPug())
	.pipe(gulp.dest('./build/views/'))
});

gulp.task('less', function() {
	gulp.src(['./styles/main.less'])
	.pipe(less())
	.pipe(gulp.dest('./build/css/'))
});

gulp.task('js', function() {
	gulp.src(['./scripts/**/*.js'])
	.pipe(concat('build.js'))
	.pipe(gulp.dest('./build/js/'))
});


gulp.task('default', function() {
	gulp.start('server');
	gulp.start('js');
	gulp.start('json');
	gulp.start('pug');
	gulp.start('less');
	gulp.start('copy-images');
	gulp.start('copy-fonts');
	gulp.start('sync');
});

gulp.task('sync', function () {
	// Serve files from the root of this project
	browserSync.init({
		proxy: "http://127.0.0.1:3333"
	});
});

gulp.task('server', function () {
	exec('node server.js');
})

gulp.task('watch', function () {
	gulp.start('default');
	gulp.watch([src_js], {cwd: src_front}, ['js']).on("change", reload);
	gulp.watch([src_styles], {cwd: src_front}, ['less']).on("change", reload);
	gulp.watch([src_views], {cwd: src_front}, ['pug']).on("change", reload);
});

gulp.task("json",function(){
	gulp.src(['./scripts/**/*.json'])
	.pipe(gulp.dest('./build/js/'))
});