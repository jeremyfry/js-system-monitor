import gulp from 'gulp';
import babel from 'gulp-babel';
import jshint from 'gulp-jshint';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import mainBowerFiles from 'main-bower-files';
import gulpFilter from 'gulp-filter';
import connect from 'gulp-connect';
import proxy from 'http-proxy-middleware';

const distDir = './dist/';

gulp.task('js', () =>{
	gulp.src('./app/**/*.babel.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('compiled.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(distDir));
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
	gulp.src('./app/**/*.css')
		.pipe(concat('compiled.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(distDir));

	gulp.src('./app/**/*.html')
		.pipe(gulp.dest(distDir));
});

gulp.task('watch', ()=>{
	gulp.watch(['app/**/*.css', 'app/**/*.html'], ['static']);
	gulp.watch('app/**/*.js', ['js']);
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

gulp.task('default', ['js', 'static', 'vendor', 'connect', 'watch']);