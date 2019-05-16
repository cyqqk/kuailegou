var data = decodeURI(location.search); //获取参数 ,包含？
var thekeyword = data.slice(1).slice(11);



;(function($) {
	//默认参数 (放在插件外面，避免每次调用插件都调用一次，节省内存)
	var defaults = {
		//id : '#paging',//id
		leng: 6, //总页数
		activeClass: 'page-active', //active类
		firstPage: '首页', //
		lastPage: '末页',
		prv: '«',
		next: '»',
		clickBack: function() {
			console.log(l)
		}
	};
	var opts, myOptions;
	//扩展
	$.fn.extend({
		//插件名称
		page: function(options) {
			//覆盖默认参数
			myOptions = options
			opts = $.extend(defaults, options);
			//			console.log(opts, 998, this)
			//主函数
			return this.each(function() {
				//激活事件
				var obj = $(this);
				var str1 = '';
				var str = '';
				var l = opts.leng;
				if(l > 1 && l < 10) {
					str1 = '<li><a href="javascript:" class="' + opts.activeClass + '">1</a></li>';
					for(i = 2; i < l + 1; i++) {
						str += '<li><a href="javascript:">' + i + '</a></li>';
					}
				} else if(l > 9) {
					str1 = '<li><a href="javascript:" class="' + opts.activeClass + '">1</a></li>';
					for(i = 2; i < 10; i++) {
						str += '<li><a href="javascript:">' + i + '</a></li>';
					}
					//str += '<li><a href="javascript:">...</a></li>'
				} else {
					str1 = '<li><a href="javascript:" class="' + opts.activeClass + '">1</a></li>';
				}
				obj.html('<div class="next" style="float:right">' + opts.next + '</div><div class="last" style="float:right">' + opts.lastPage + '</div><ul class="pagingUl">' + str1 + str + '</ul><div class="first" style="float:right">' + opts.firstPage + '</div><div class="prv" style="float:right">' + opts.prv + '</div>');

				obj.on('click', '.next', function() {
					var pageshow = parseInt($('.' + opts.activeClass).html());
					if(pageshow == l) {
						return false;
					}
					if(pageshow == l) {} else if(pageshow > l - 5 && pageshow < l) {
						$('.' + opts.activeClass).removeClass(opts.activeClass).parent().next().find('a').addClass(opts.activeClass);
					} else if(pageshow > 0 && pageshow < 6) {
						$('.' + opts.activeClass).removeClass(opts.activeClass).parent().next().find('a').addClass(opts.activeClass);
					} else {
						$('.' + opts.activeClass).removeClass(opts.activeClass).parent().next().find('a').addClass(opts.activeClass);
						fpageShow();
					}
					opts.clickBack(pageshow + 1)
				});
				obj.on('click', '.prv', function() {
					var pageshow = parseInt($('.' + opts.activeClass).html());

					if(pageshow == 1) {
						return false;
					} else if(pageshow > l - 5 && pageshow < l + 1) {
						$('.' + opts.activeClass).removeClass(opts.activeClass).parent().prev().find('a').addClass(opts.activeClass);
						//this.fpageBranch(pageshow-1);
					} else if(pageshow > 1 && pageshow < 6) {
						$('.' + opts.activeClass).removeClass(opts.activeClass).parent().prev().find('a').addClass(opts.activeClass);
						//this.fpageBranch(pageshow-1);
					} else {
						$('.' + opts.activeClass).removeClass(opts.activeClass).parent().prev().find('a').addClass(opts.activeClass);
						//this.fpageBranch(pageshow-1);
						fpageShow();
					}
					opts.clickBack(pageshow - 1)
				});

				obj.on('click', '.first', function() {
					var pageshow = 1;
					var nowshow = parseInt($('.' + opts.activeClass).html());
					if(nowshow == 1) {
						return false;
					}
					$('.' + opts.activeClass).removeClass(opts.activeClass).parent().prev().find('a').addClass(opts.activeClass);
					fpagePrv(0);
					opts.clickBack(pageshow)
				})
				obj.on('click', '.last', function() {
					var pageshow = l;
					var nowshow = parseInt($('.' + opts.activeClass).html());
					if(nowshow == l) {
						return false;
					}
					if(l > 9) {
						$('.' + opts.activeClass).removeClass(opts.activeClass).parent().prev().find('a').addClass(opts.activeClass);
						fpageNext(8);
					} else {
						$('.' + opts.activeClass).removeClass(opts.activeClass).parent().prev().find('a').addClass(opts.activeClass);
						fpageNext(l - 1);
					}
					opts.clickBack(pageshow)
				})

				obj.on('click', 'li', function() {
					var $this = $(this);
					var pageshow = parseInt($this.find('a').html());
					var nowshow = parseInt($('.' + opts.activeClass).html());
					if(pageshow == nowshow) {
						return false;
					}
					if(l > 9) {
						if(pageshow > l - 5 && pageshow < l + 1) {
							$('.' + opts.activeClass).removeClass(opts.activeClass);
							$this.find('a').addClass(opts.activeClass);
							fpageNext(8 - (l - pageshow));
						} else if(pageshow > 0 && pageshow < 5) {
							$('.' + opts.activeClass).removeClass(opts.activeClass);
							$this.find('a').addClass(opts.activeClass);
							fpagePrv(pageshow - 1);
						} else {
							$('.' + opts.activeClass).removeClass(opts.activeClass);
							$this.find('a').addClass(opts.activeClass);
							fpageShow();
						}
					} else {
						$('.' + opts.activeClass).removeClass(opts.activeClass);
						$this.find('a').addClass(opts.activeClass);
					}
					opts.clickBack(pageshow)
				})

				function fpageShow() {
					var pageshow = parseInt($('.' + opts.activeClass).html());
					var pageStart = pageshow - 4;
					var pageEnd = pageshow + 5;
					var str1 = '';
					for(i = 0; i < 9; i++) {
						str1 += '<li><a href="javascript:" class="">' + (pageStart + i) + '</a></li>'
					}
					obj.find('ul').html(str1);
					obj.find('ul li').eq(4).find('a').addClass(opts.activeClass);

				}

				function fpagePrv(prv) {
					var str1 = '';
					if(l > 8) {
						for(i = 0; i < 9; i++) {
							str1 += '<li><a href="javascript:" class="">' + (i + 1) + '</a></li>'
						}
					} else {
						for(i = 0; i < l; i++) {
							str1 += '<li><a href="javascript:" class="">' + (i + 1) + '</a></li>'
						}
					}
					obj.find('ul').html(str1);
					obj.find('ul li').eq(prv).find('a').addClass(opts.activeClass);
				}

				function fpageNext(next) {
					var str1 = '';
					if(l > 8) {
						for(i = l - 8; i < l + 1; i++) {
							str1 += '<li><a href="javascript:" class="">' + i + '</a></li>'
						}
						obj.find('ul').html(str1);
						obj.find('ul li').eq(next).find('a').addClass(opts.activeClass);
					} else {
						for(i = 0; i < l; i++) {
							str1 += '<li><a href="javascript:" class="">' + (i + 1) + '</a></li>'
						}
						obj.find('ul').html(str1);
						obj.find('ul li').eq(next).find('a').addClass(opts.activeClass);
					}
				}
			});
		},
		setLength: function(newLength) {
			myOptions.leng = newLength
			$(this).html('')
			$(this).unbind()
			$(this).page(myOptions)
		}
	})
})(jQuery);

//接受参数
var data = decodeURI(location.search)
var str = data.slice(1);
var ipage = 1;
var order = '';
var type = '';
var istrue1 = false;
var istrue2 = false;
var keywork = '';
if(thekeyword){
	keywork = thekeyword;
	$('#list_search').val(thekeyword)
}
var min = '';
var max = '';
var num = 8;
var pagetotal = '';

function requestData(ipage, num, type, order, keywork, min, max) {
	$.ajax({
		type: "post",
		url: "../api/list.php",
		async: false,
		data: {
			page: ipage,
			num: num,
			type: type,
			istrue: order,
			keywork: keywork,
			min: min,
			max: max
		},
		success: function(str) {
			var arr = JSON.parse(str);
			var $res = arr.goodslist.map(function(item) {
				return `<li data-id="${item.id}">
						<div>
							<div class="list_img">
								<a class="sl_goods_img" href="###" title="${item.title}">
									<img src="${item.img}" title="${item.title}"> </a>
							</div>
							<div class="list_text">
								<div class="sl_price">
										<span style="color:#DF0010">${item.price}</span>
										<del>${item.costprice}</del>
								<div>
									<a class="sl_title" href="###" title="${item.title}">${item.title}</a>
								</div>
							</div>
								<div class="sl_sales">
										<span>销量:${item.sales}</span>
								<div>			
						</div>
					</li>`;
			}).join('');
			//			console.log($res)
			$('.list_ul').html($res);
			$('.listtotal').html(arr.total);
			$('.nowpage').html(ipage);
			$('.pagetotal').html(Math.ceil(arr.total / num));
			pagetotal = Math.ceil(arr.total / num);
			
		}
	});
}

function resendRequest() {
	requestData(ipage, num, type, order, keywork, min, max);
	
	$('.pageTest').page({
		leng: pagetotal, //分页总数
		activeClass: 'activP', //active 类样式定义
		clickBack: function(page) {
//			console.log(page)

			requestData(page, num, type, order, keywork, min, max);
		}
	});
	$('.pageTest').setLength(pagetotal)
}
resendRequest()
//价格排序
$('#priceBtn').click(function() {
	istrue1 = !istrue1;
	order = istrue1;
	console.log(istrue1)
	if(istrue1) {
		$('#priceBtn').val('价格降序');
	} else {
		$('#priceBtn').val('价格升序')
	}
	type = 'price';
	ipage = 1;
	resendRequest()
});

//销量排序
$('#salesBtn').click(function() {
	istrue2 = !istrue2;
	order = istrue2;
	console.log(istrue1)
	if(istrue1) {
		$('#salesBtn').val('销量降序');
	} else {
		$('#salesBtn').val('销量升序')
	}
	type = 'sales';
	ipage = 1;
	resendRequest();
});

//默认排序
$('#defaultBtn').click(function() {
	console.log(1)
	ipage = 1;
	type = 'price';
	order = '';
	min = $('#priceL').val();
	max = $('#priceR').val();
	resendRequest();
});

//搜索关键字
$('#searchBtn').click(function() {
	if($('#list_search').val().trim()) {
		ipage = 1;
		type = 'price';
		order = '';
		min = $('#priceL').val();
		max = $('#priceR').val();
		keywork = $('#list_search').val()
		resendRequest();
	}
});
//价格区间
$('#confirmBtn').click(function(){
		if($('#priceL').val() != '' && $('#priceR').val() != '') {
			keywork = $('#list_search').val();
			min = $('#priceL').val();
			max = $('#priceR').val();
			type = 'price';
			ipage = 1;
			resendRequest();
		} else {
			alert('请输入完整的价格区间')
		}
	}
);
//列表页跳转列表页详情页
$('.list_ul').on('click','li',function(){
	window.location.href = "details.html?"+$(this).attr('data-id');	
});
