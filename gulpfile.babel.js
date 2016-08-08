import gulp from 'gulp';
//import jshint from 'gulp-jshint';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import mainBowerFiles from 'main-bower-files';
import gulpFilter from 'gulp-filter';
import connect from 'gulp-connect';
import proxy from 'http-proxy-middleware';
import browserify from 'browserify';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import less from 'gulp-less';
var exec = require('child_process').execFile;

const distDir = './dist/';

gulp.task('js', () =>{
	var bundler = browserify({
		entries: 'app/app.js',
		debug: true
	});
	bundler.transform(babelify);
	bundler.bundle()
		.on('error', function (err) { console.error(err); })
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist'));
});

gulp.task('vendor', ()=>{
	let filterJS = gulpFilter('**/*.js', {restore: true});
	let filterCSS = gulpFilter('**/*.css', {restore: true});
	gulp.src(mainBowerFiles())
		.pipe(filterJS)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(distDir))
		.pipe(filterJS.restore)
		.pipe(filterCSS)
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest(distDir));
});

gulp.task('static', ()=>{
	gulp.src('./app/**/*.html')
		.pipe(gulp.dest(distDir));
});

gulp.task('css', ()=>{
	gulp.src('./app/**/*.less')
		.pipe(less())
		.pipe(concat('compiled.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(distDir));
});

gulp.task('watch', ()=>{
	gulp.watch(['app/**/*.html'], ['static']);
	gulp.watch(['app/**/*.less'], ['css'])
	gulp.watch('app/**/*.js', ['js']);
});

gulp.task('systemMonitor', ()=>{
	exec(
		'Remote Sensor Monitor.exe',
		{cwd: 'Remote.Sensor.Monitor.v.2.1.0'},
		(error, stdout, stderr) => {
			if (error) {
				throw error;
			}
			console.log(stdout);
		}
	);
});

gulp.task('connect', ()=>{
	connect.server({
		root: 'dist',
		livereload: true,
		middleware: (connect, opt)=>{
			return [proxy('/api', {
				target: 'http://localhost:55555',
				pathRewrite: {'^/api': ''}
			})];
		}
	});
});

gulp.task('default', ['js', 'static', 'css', 'vendor', 'connect', 'systemMonitor', 'watch']);