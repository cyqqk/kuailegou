var mode = true;
var telok = false;
//切换登录方式
checked()
function checked(){
	
	if($('#radio1').is(':checked')){
		$('.login1').css('display', 'block');
		$('.login2').css('display', 'none');
	}else{
		$('.login2').css('display', 'block');
		$('.login1').css('display', 'none');
	}
}

$('#radio1').click(function() {
	mode = true;
	checked()
});
$('#radio2').click(function() {
	mode = false;
	checked()
});

//随机验证码
$('#getCaptcha').val(randomCode());
$('#replace').click(function() {
	$('#getCaptcha').val(randomCode());
	$('#getCaptcha').css('color', randomColor(16));
});

//验证表单
$('.itxt').on('focus', function() {
	if($(this).attr('id') == 'tel1' || $(this).attr('id') == 'tel2') {
		$(this).parent().find('span').html('请输入11位手机号码').css('color', '#8c8c8c');
		telok = false
	}
	if($(this).attr('id') == 'password') {
		$(this).parent().find('span').html('您的密码可能为字母、数字或符号的组合').css('color', '#8c8c8c');
	}
	$(this).parent().find('span').css('display', 'block');
}).blur(function() {
	$(this).parent().find('span').css('display', 'none');
	if($(this).attr('id') == 'tel1' || $(this).attr('id') == 'tel2') {
		if(!(/^1[3-9]\d{9}$/).test($(this).val())) {
			$(this).parent().find('span').css('display', 'block');
			$(this).parent().find('span').html('请输入正确的11位电话号码').css('color', 'red');
			telok = false
		} else {
			telok = true;
		}
	}
});


//点击获取短信验证码
var code = '';
$('#code').click(function() {
	code = randomNum(10000, 999999)
	console.log(code)
	$.ajax({
		type: "post",
		url: "../api/message.php",
		async: true,
		data: {
			tel: $('#tel1').val(),
			code: code
		},
		success: function(str) {
		}
	});
	$('#code').attr('disabled', true).css('color', '#8C8C8C');
	var timer = setInterval(show, 1000)
	$times = 10;
	function show() {
		$times--;
		$('#code').val('重新获取验证码' + $times + '秒');
		if($times < 0) {
			clearInterval(timer)
			$('#code').val('获取短信验证码').attr('disabled', false).css('color', 'black');
		}
	}
})

//点击登录,判断为哪种登录方式
$('#registerBtn').click(function() {
	var getcookie = getCookie('name');
	if(getcookie){
		alert('你已登录!');
		window.location.href="../index.html";
	}else{
	if(mode && telok) {
		//短信登录
		if($('#getCode').val().trim()) {
			if($('#getCode').val() == code) {
				alert('登录成功!');
				window.location.href="../index.html";
				document.cookie="name="+$('#tel1').val() + ";Path=" + escape('/');
			} else {
				alert('验证码错误,验证失败')
			}
		}else{
			alert('请输入你的短信验证码！')
		}
	} else if(!mode && telok) {
		//		账号密码登录
		if($('#password').val().trim()) {
			if($('#captcha').val().toLowerCase() == $('#getCaptcha').val().toLowerCase()) {
				$.ajax({
					type: "post",
					url: "../api/login.php",
					async: true,
					data: {
						tel: $('#tel2').val(),
						psw: $('#password').val()
					},
					success: function(str) {
						if(str == 'yes') {
							alert('登录成功!');
							window.location.href="../index.html";
							document.cookie="name="+$('#tel2').val() +  ";Path=" + escape('/');
						} else {
							alert('账号或密码错误!')
						}
					}
				});
			} else {
				alert('验证码错误！');
				$('#getCaptcha').val(randomCode());
				$('#captcha').val('').focus();
			}
		} else {
			$('#password').next().html('密码不能为空').css('color', 'red').css('display', 'block');
		}
	}else{
		alert('请输入正确的完整信息！')
	}
		
	}
	
})

