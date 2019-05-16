//短信验证未加
var len = $('#register_form').find('.itxt').length;
var arr = [];
//给每个input框绑定鼠标聚焦事件以及失去焦点事件
//input判断成功后往arr存1,反之存0,通过遍历arr判断是否所有框都成功,成功则可以进行注册,存入数据库
$('#register_form').on('focus', '.item', function() {
	index = $(this).index();
	$(this).find('span').css('display', 'block');
}).find('input').blur(function() {
	if($(this).val().trim()) {
		if($(this).attr('id') == 'tel') {
			//			电话号码正则判断
			if((/^1[3-9]\d{9}$/).test($(this).val())) {
				//				电话号码正则判断成功后发送请求,判断数据库是否存在此号码
				$.ajax({
					type: "post",
				url: "../api/reg.php",
					async: false,
					data: {
						tel: $(this).val()
					},
					success: str => {
						if(str == 'yes') {
							arr[0] = 1;
							$(this).parent().find('span').html('号码可用').css('color', 'green');
						} else {
							arr[0] = 0;
							$(this).parent().find('span').html('此号码已被注册').css('color', 'red');
						}
					}
				});
			} else {
				$(this).parent().find('span').html('请输入正确的号码').css('color', 'red');
				arr[0] = 0;
			}
		} else if($(this).attr('id') == 'getCode') {
			if($(this).val() == code) {
				arr[1] = 1;
			}else{
				arr[1] = 0;
			}
		} else if($(this).attr('id') == 'password') {
			//			修改第一次密码时同时判断第二次密码两者是否相等
			if($(this).val() == $('#checkPassWord').val()) {
				arr[3] = 1;
				$('#checkPassWord').parent().find('span').html('密码确认成功').css('color', 'green');
			} else if($(this).val() != $('#checkPassWord').val()) {
				arr[3] = 0;
				$('#checkPassWord').parent().find('span').html('两次密码不一致').css('color', 'red');
			}
			//			密码正则判断
			if((/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/).test($(this).val())) {
				$(this).parent().find('span').html('密码可用').css('color', 'green');
				arr[2] = 1;
			} else {
				$(this).parent().find('span').html('请输入正确的六位数密码,数字加大小写字母').css('color', 'red');
				arr[2] = 0;
			}
		} else if($(this).attr('id') == 'checkPassWord') {
			if($(this).val() == $('#password').val()) {
				$(this).parent().find('span').html('密码确认成功').css('color', 'green');
				arr[3] = 1;
			} else {
				$(this).parent().find('span').html('两次密码不一致').css('color', 'red');
				arr[3] = 0;
			}
		} else if($(this).attr('id') == 'captcha') {
			if($(this).val().toLowerCase() == $('#getCaptcha').val().toLowerCase()) {
				$(this).parent().find('span').css('display', 'none');
				arr[4] = 1;
			} else {
				$(this).parent().find('span').html('请输入正确的验证码').css('color', 'red');
				arr[4] = 0;
			}

		}
	} else {
		arr[index] = 0;
		$(this).parent().find('span').html('输入的信息不能为空').css('color', 'red');
	}
	//	console.log(arr)
})

//初始生成随机验证码
$('#getCaptcha').val(randomCode());
//点击更换换随机码
$('#replace').click(function() {
	$('#getCaptcha').val(randomCode());
	$('#getCaptcha').css('color', randomColor(16));
})
//点击注册
$('#registerBtn').click(function() {
//	console.log(arr)
	let a = 0;
	for(let b = 0; b < len; b++) {
		a += arr[b]
	}
	if(a == len) {
		$.ajax({
			type: "post",
			url: "../api/reg.php",
			async: true,
			data: {
				tel: $('#tel').val(),
				psw: $('#checkPassWord').val()
			},
			success: function(str) {
				if(str == 'yes') {
					alert('注册成功');
					$('.itxt').val('')
					window.location.href = 'login.html';
				}
			}
		});
	} else {
		alert('请填写正确的信息！')
	}
});

//点击获取短信验证码
var code = '';
$('#code').click(function() {
	if(arr[0] == 1) {
		code = randomNum(10000,999999)
//		console.log(code)
		$.ajax({
			type: "post",
			url: "../api/message.php",
			async: true,
			data: {
				tel:$('#tel').val() ,
				code: code
			},
			success: function(str) {
				var arr = JSON.parse(str);
//				console.log(arr)
			}
		});
		$('#code').attr('disabled', true).css('color', '#8C8C8C');
		var timer = setInterval(show, 1000)
		$times = 10;

		function show() {
			$times--;
			$('#code').val('重新获取验证码' + $times + '秒');
//			console.log($times)
			if($times < 0) {
				clearInterval(timer)
				$('#code').val('获取短信验证码').attr('disabled', false).css('color', 'black');
			}
		}
	}

})