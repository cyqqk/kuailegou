//轮播图
var s1 = new Swiper('.swiper-container', {
	autoplay: { //自动轮播+延时两秒
		delay: 2000,
		disableOnInteraction: false
	},
	loop: true, //无缝回路轮播
	speed: 500, //切换速度
	navigation: { //上下按钮
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	pagination: { //焦点跟随
		el: '.swiper-pagination',
		clickable: true, //点击焦点跳到指定图片
		renderBullet: function(index, className) {
			return '<span class="' + className + '"></span>'; //生成焦点数字
		}
	},
	mousewheel: true //滚动滑轮可以切图

});

var oBox = document.getElementById('swiper-container');

oBox.onmouseover = function() { //鼠标经过停止
	s1.autoplay.stop();
}

oBox.onmouseout = function() { //鼠标经过离开
	s1.autoplay.start();
}

$('.groDiv ').hover(function() {
	theNum()
}, function() {
	$('.tv_btn').css('display', 'none')
})
var num = 0;
var ul_left = 0;
$('.tv_btn').on('click', function() {
	if($(this).attr('name') == 'next') {
		num++;
		theNum()
		ul_left = num * 1100;
		$('#tv_zhiobo_ul').css('left', -ul_left)
	}
	if($(this).attr('name') == 'prev') {
		num--;
		theNum()
		ul_left = num * 1100;
		$('#tv_zhiobo_ul').css('left', -ul_left)
	}
});

function theNum() {
	if(num >= 3) {
		num = 3;
		$('.next').css('display', 'none')
		$('.prev').css('display', 'block')
	} else if(num <= 0) {
		num = 0
		$('.prev').css('display', 'none')
		$('.next').css('display', 'block')
	} else {
		$('.tv_btn').css('display', 'block')
	}
}
//吸顶菜单
$(window).scroll(function() {
	if(window.scrollY >= 550) {
		$('.search_fixed').css('height', '54px').css('display', 'flex');
	} else {
		$('.search_fixed').css('height', '0');
	}
});

//首页渲染
var pages = 0;
var ipage = 1

function init() {
	$.ajax({
		type: "post",
		url: "api/list.php",
		async: true,
		data: {
			page: ipage,
		},
		success: function(str) {
			var arr = JSON.parse(str);
			pages = Math.ceil(arr.total / arr.num);
			var $res = arr.goodslist.map(function(item) {
				return `
				<li data-id="${item.id}">
					<a class="div_a" href="###">
						<div class="a_con4_list">
							<p class="p_img">
								<img class="lazy" src="${item.img}">
							</p>
						</div>
						<div class="huodong_text">
							<p class="p_title">${item.title}</p>
						</div>
							<p class="p_p">
								<span class="price1">￥<span>${item.price}</span></span>
								<span class="price2"><del>￥${item.costprice}</del></span>
								</p>
					</a>
				</li>`
			}).join('');
			$('#create_list').html($('#create_list').html() + $res);
		}
	});
}
init();
//懒加载
var list = document.getElementById('con_list');
var isok = true;
document.onscroll = function() {
	var scrollTop = window.scrollY; //离顶部的滚动距离
	var iH = list.offsetHeight - window.innerHeight + list.offsetTop;
	if(scrollTop >= iH) {
		//第一次到达临界点
		if(ipage == pages) {
			$('#load_img').css('display', 'none');
			$('.end').css('display', 'block')
			return;
		} else {
			$('.end').css('display', 'none')
			$('#load_img').css('display', 'block');
			if(isok) {
				isok = false;
				ipage++;
				setTimeout(function() {
					$('#load_img').css('display', 'none');
//					ajax
					$.ajax({
						type: "post",
						url: "api/list.php",
						async: false,
						data: {
							page: ipage,
						},
						success: function(str) {
							var arr = JSON.parse(str);
							pages = Math.ceil(arr.total / arr.num);
							var $res = arr.goodslist.map(function(item) {
								return `
				<li data-id="${item.id}"> 
					<a class="div_a" href="###">
						<div class="a_con4_list">
							<p class="p_img">
								<img class="lazy" src="${item.img}">
							</p>
						</div>
						<div class="huodong_text">
							<p class="p_title">${item.title}</p>
						</div>
							<p class="p_p">
								<span class="price1">￥<span>${item.price}</span></span>
								<span class="price2"><del>￥${item.costprice}</del></span>
								</p>
					</a>
				</li>`
							}).join('');
							$('#create_list').html($('#create_list').html() + $res);
						}
					});
//					ajax
					//开关的功能：阻止临界点的多次触发，造成一次加载多页的bug
					isok = true;
				}, 1000);

			}
		}

	}
}

//点击跳转详情页
$('#create_list').on('click','li',function(){
	window.open("html/details.html?"+$(this).attr('data-id'));
})
