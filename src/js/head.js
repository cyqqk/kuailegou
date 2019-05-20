//地址
var address = '';

//判断是否已登录
var getcookie = getCookie('name');

function init() {
	$('#getcaptcha').val(randomCode()).css('color', randomColor(16));
	getcookie = getCookie('name');
	var $user = getcookie;
	if(getcookie) {
		$('.login_1').css('display', 'none');
		$('.login_2').css('display', 'block');
		$('#username').html($user)
		$('.login_on').css('display', 'block');
		$('.c').css('display', 'none');
		$('.login_on').html('你好' + $user)
	} else {
		$('.login_1').css('display', 'block');
		$('.login_2').css('display', 'none');
		$('.login_on').css('display', 'none');
		$('.c').css('display', 'block');
	}
}
init();
//二级导航
$('.li_all_type').hover(function() {
	$('.index_type').css('display', 'block').hover(function() {
		$(this).css('display', 'block');
	}, function() {
		$(this).css('display', 'none');
	});
}, function() {
	$('.index_type').css('display', 'none');
});

$('.li_has_down').hover(function() {
	$(this).find('.type_color').css('color', 'red');
	$(this).find('.nav_type_list').css('display', 'block').hover(function() {
		$(this).prev().css('color', 'red')
	});
}, function() {
	$(this).find('.type_color').css('color', 'white');
	$(this).find('.nav_type_list').css('display', 'none');
});

//侧栏登录
$('#getcaptcha').click(function() {
	$(this).val(randomCode()).css('color', randomColor(16));
});
$('.ml5').click(function() {
	$('#getcaptcha').val(randomCode()).css('color', randomColor(16));
});

$('.itxt').on('focus', function() {
	$(this).parent().find('.err_msg1').css('display', 'block')
}).on('blur', function() {
	$(this).parent().find('.err_msg1').css('display', 'none')
});

$('#loginsubmit').click(function() {
	if($('#right_column_captcha').val().toLowerCase() == $('#getcaptcha').val().toLowerCase()) {
		$.ajax({
			type: "post",
			url:  address+"/1.kuailegou/src/api/login.php",
			async: true,
			data: {
				tel: $('#right_column_user_name').val(),
				psw: $('#right_column_password').val()
			},
			success: function(str) {
				if(str == 'yes') {
					document.cookie="name="+$('#right_column_user_name').val() +  ";Path=" + escape('/');
					alert('登录成功!');
					init()
				} else {
					alert('账号或密码错误！')
				}
			}
		});
	} else {
		$('.item3_yzm').find('.err_msg2').css('display', 'block')
	}
});

//退出清空cookie
$('.signOut').click(function() {
	setCookie('name', ' ', -1);
	init()
})

//点击关闭账号信息
$('#user').hover(function(){
	$('.user_center').css('display','block')
},function(){
	$('.user_center').css('display','none')
})
$('.uc_close').click(function(){
	$('.user_center').css('display','none');
});


//返回顶部
$('#toTop').click(function(){
	var scrollTop = window.scrollY
	var timer = setInterval(function() {
			scrollTop -= 180;
			if(window.scrollY <= 0) {
				clearInterval(timer);
				window.scrollTo(0, 0);
			} else {
				window.scrollTo(0, scrollTop);
			}
		}, 30);
});

$('.li_has_down a').on('click',function(){
	var str = $(this).html();
	window.location.href = address +'/1.kuailegou/src/html/list.html?'+ str;
});

//购物车
$('#shop_car').click(function(){
	if(getcookie){
		window.location.href = address+'/1.kuailegou/src/html/cart.html';
	}else{
		alert('你还未登录')
	}
});
$('.center_car').click(function(){
	if(getcookie){
		window.location.href = address+'/1.kuailegou/src/html/cart.html';
	}else{
		alert('你还未登录')
	}
});

$('.btn_search').click(function(){
	window.location.href = address +'/1.kuailegou/src/html/list.html?thekeyword='+ $('#keyword').val();
});

$('.f_btn_search').click(function(){
	window.location.href = address + '/1.kuailegou/src/html/list.html?thekeyword='+ $('#keyword_fix').val();
});



//用户订单商品个数
if(getcookie){	
	$.ajax({
		type: "post",
		url: address + "/1.kuailegou/src/api/carts.php",
		async: true,
		data: {
			user: getcookie
		},
		success: function(str) {
			var arr = JSON.parse(str)
			$('.car_num').html(arr.length)
		}
	});
}
