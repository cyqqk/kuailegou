"use strict";var s1=new Swiper(".swiper-container",{autoplay:{delay:2e3,disableOnInteraction:!1},loop:!0,speed:500,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(t,n){return'<span class="'+n+'"></span>'}},mousewheel:!0}),oBox=document.getElementById("swiper-container");oBox.onmouseover=function(){s1.autoplay.stop()},oBox.onmouseout=function(){s1.autoplay.start()},$(".groDiv ").hover(function(){theNum()},function(){$(".tv_btn").css("display","none")});var num=0,ul_left=0;function theNum(){3<=num?(num=3,$(".next").css("display","none"),$(".prev").css("display","block")):num<=0?(num=0,$(".prev").css("display","none"),$(".next").css("display","block")):$(".tv_btn").css("display","block")}$(".tv_btn").on("click",function(){"next"==$(this).attr("name")&&(num++,theNum(),ul_left=1100*num,$("#tv_zhiobo_ul").css("left",-ul_left)),"prev"==$(this).attr("name")&&(num--,theNum(),ul_left=1100*num,$("#tv_zhiobo_ul").css("left",-ul_left))}),$(window).scroll(function(){550<=window.scrollY?$(".search_fixed").css("height","54px").css("display","flex"):$(".search_fixed").css("height","0")});var pages=0,ipage=1;function init(){$.ajax({type:"post",url:"api/list.php",async:!0,data:{page:ipage},success:function(t){var n=JSON.parse(t);pages=Math.ceil(n.total/n.num);var s=n.goodslist.map(function(t){return'\n\t\t\t\t<li data-id="'.concat(t.id,'">\n\t\t\t\t\t<a class="div_a" href="###">\n\t\t\t\t\t\t<div class="a_con4_list">\n\t\t\t\t\t\t\t<p class="p_img">\n\t\t\t\t\t\t\t\t<img class="lazy" src="').concat(t.img,'">\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="huodong_text">\n\t\t\t\t\t\t\t<p class="p_title">').concat(t.title,'</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<p class="p_p">\n\t\t\t\t\t\t\t\t<span class="price1">￥<span>').concat(t.price,'</span></span>\n\t\t\t\t\t\t\t\t<span class="price2"><del>￥').concat(t.costprice,"</del></span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t</a>\n\t\t\t\t</li>")}).join("");$("#create_list").html($("#create_list").html()+s)}})}init();var list=document.getElementById("con_list"),isok=!0;document.onscroll=function(){var t=window.scrollY;if(list.offsetHeight-window.innerHeight+list.offsetTop<=t){if(ipage==pages)return void $(".end").css("display","block");$(".end").css("display","none"),$("#load_img").css("display","block"),isok&&(isok=!1,ipage++,setTimeout(function(){$("#load_img").css("display","none"),$.ajax({type:"post",url:"api/list.php",async:!1,data:{page:ipage},success:function(t){var n=JSON.parse(t);pages=Math.ceil(n.total/n.num);var s=n.goodslist.map(function(t){return'\n\t\t\t\t<li data-id="'.concat(t.id,'"> \n\t\t\t\t\t<a class="div_a" href="###">\n\t\t\t\t\t\t<div class="a_con4_list">\n\t\t\t\t\t\t\t<p class="p_img">\n\t\t\t\t\t\t\t\t<img class="lazy" src="').concat(t.img,'">\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="huodong_text">\n\t\t\t\t\t\t\t<p class="p_title">').concat(t.title,'</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<p class="p_p">\n\t\t\t\t\t\t\t\t<span class="price1">￥<span>').concat(t.price,'</span></span>\n\t\t\t\t\t\t\t\t<span class="price2"><del>￥').concat(t.costprice,"</del></span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t</a>\n\t\t\t\t</li>")}).join("");$("#create_list").html($("#create_list").html()+s)}}),isok=!0},1e3))}},$("#create_list").on("click","li",function(){window.open("html/details.html?"+$(this).attr("data-id"))});var endtime="2019-9-16 23:51:10",end=Date.parse(endtime);function setTime(t){return{secs:t%60,mins:parseInt(t/60)%60,hours:parseInt(t/60/60)%24,days:parseInt(t/60/60/24)}}function showtime(){var t=Date.now(),n=parseInt((end-t)/1e3);if(n<=0)clearInterval(timer);else{var s=setTime(n);$(".djs_time").html("".concat(s.days,"天").concat(s.hours,"时").concat(s.mins,"分").concat(s.secs,"秒"))}}showtime();var timer=setInterval(showtime,1e3);