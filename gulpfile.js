'use strict';

var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var htmlmin=require('gulp-htmlmin');
var browserSync=require('browser-sync').create();

gulp.task('less',function(){
	gulp.src(['src/less/*.less','!src/less/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());//浏览器同步更新
})

gulp.task('js',function(){
	gulp.src('src/js/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});

gulp.task('images',function(){
	gulp.src('src/image/*.*')
		.pipe(gulp.dest('dist/image'))
		.pipe(browserSync.stream());
})

gulp.task('html',function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeComments:true,
			collapseBooleanAttributes:true,
			removeAttributeQuotes:true,
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});

gulp.task('serve',['less','js','images','html'],function(){
	browserSync.init({
		server:{
			baseDir:'./dist'
		}
	});
	gulp.watch("src/less/*.less",['less']);
	gulp.watch("src/js/*.js",['js']);
	gulp.watch("src/image/*.*",['images']);
	gulp.watch("src/*.html",['html']);

})









