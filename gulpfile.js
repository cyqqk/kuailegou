//引入gulp
const {
	task,
	src,
	dest,
	watch,
	series,
	parallel
} = require('gulp');

//引入gulp插件
const htmlMin = require('gulp-htmlmin'); //压缩html插件
const babel = require('gulp-babel'); //es6转es5插件
const uglify = require('gulp-uglify'); //压缩JS插件
const cleancss = require('gulp-clean-css'); //压缩CSS插件
const indexMin = require('gulp-htmlmin'); //压缩html插件
const imageMin = require('gulp-imagemin'); //压缩图片插件
//创建任务名为htmlMin的,并添加执行任务的函数
//1.压缩html
task('htmlMin', function() {
	return src('src/html/*.html')
		.pipe(htmlMin({
			collapseWhitespace: true,//清除空格，压缩html，这一条比较重要，作用比较大，引起的改变压缩量也特别大；
			collapseBooleanAttributes: true,//:省略布尔属性的值，比如：<input checked="checked"/>,那么设置这个属性后，就会变成 <input checked/>;
			removeComments: true,//清除html中注释的部分，我们应该减少html页面中的注释。
			removeEmptyAttributes: true,//清除所有的空属性，
			removeScriptTypeAttributes: true,//:清除所有的空属性，//清除所有script标签中的type="text/javascript"属性。
			removeStyleLinkTypeAttributes: true,//:清除所有Link标签上的type属性。
			minifyJS: true,//压缩html中的javascript代码。
			minifyCSS: true//压缩html中的css代码。
		}))
		.pipe(dest('dist/html'))
})
//2.压缩js
task('uglify', function() {
	return src('src/js/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))//ES6不能直接压缩，需要先转成es5	
		.pipe(uglify())
		.pipe(dest('dist/js'))
})

task('libMin', function() {
	return src('src/lib/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))//ES6不能直接压缩，需要先转成es5	
		.pipe(uglify())
		.pipe(dest('dist/lib'))
})

//3.压缩css
task('cleancss', function() {
	return src('src/css/*.css')
		.pipe(cleancss())
		.pipe(dest('dist/css'))
})
//压缩首页
task('indexMin', function() {
	return src('src/*.html')
		.pipe(indexMin({
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			removeComments: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			minifyJS: true,
			minifyCSS: true
		}))
		.pipe(dest('dist/'))
})

//压缩图片
task('imageMin', function() {
	return src('src/img/*.{png, jpg, gif}')
		.pipe(imageMin({
			 optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
		}))
		.pipe(dest('dist/img'))
})

task('default', parallel('htmlMin', 'uglify', 'cleancss', 'indexMin','libMin','imageMin'))
watch('src', series('default'))