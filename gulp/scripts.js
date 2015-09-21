var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

gulp.task('js',function(){
	gulp.src('js/modalWidget.js')
	.pipe(gulp.dest('dist'))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(sourcemaps.init())
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('dist'));
});

gulp.task('watch:js',['js'],function(){
	gulp.watch('js/modalWidget*.js',['js']);
});