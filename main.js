//定义秒杀开始和结束时间
var shuttime = [
	"2015/07/17 10:00:00",
	"2015/07/17 17:40:00"
]
var f = null;
var ids = [
	['5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40'],
	['5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40'],
	['5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40'],
	['5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40'],
	['5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40'],
	['5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40'],
	['5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40'],
	['5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40', '5562f5ba3c306b23702cec40']
]

function takeCount() {
	function show(i, domain) {
		//获取现在时间
		var now = Math.floor(new Date().getTime() / 1000);
		//秒杀开始时间
		var start = Math.floor(new Date(shuttime[i]).getTime() / 1000);
		//获取秒杀结束时间
		var end = Math.floor(new Date(shuttime[1]).getTime() / 1000);
		console.info("间隔时间" + (start - now))
			//距离秒杀时间差
		var tms = start - now;
		var obj = $(domain);
		//判断距离秒杀时间差
		if (tms > 0) {
			var days = Math.floor(tms / (1 * 60 * 60 * 24));
			var hours = Math.floor(tms / (1 * 60 * 60)) % 24;
			var minutes = Math.floor(tms / (1 * 60)) % 60;
			var seconds = Math.floor(tms / 1) % 60;
			// 时分秒为单数时、前面加零
			if (days < 10) {
				days = "0" + days;
			}
			if (hours < 10) {
				hours = "0" + hours;
			}
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			if (days < 0) days = 0;
			if (hours < 0) hours = 0;
			if (minutes < 0) minutes = 0;
			if (seconds < 0) seconds = 0;
			// 显示时间
			$(".twenty #time_d").html(days + "天");
			$(".twenty #time_h").html(hours + "时");
			$(".twenty #time_m").html(minutes + "分");
			$(".twenty #time_s").html(seconds + "秒");
			console.info("现在离秒杀时间还差" + tms);
		} else {
			if (end - now >= 0 && start - now <= 0) {
				console.info("现在超过。。" + (now - start));
				var t_inver = (end - now) % 3600;

				var radomindex = (end - 2400 - now) / 3600;

				if (t_inver == 0) {

					companyActivity(ids[ids.length - 1 - radomindex], i);

					//假设
					/**
					 *
					 * .red{
					 * 	bak:red;
					 * }
					 * .black{
					 * 	.bak-col:black
					 * }
					 *
					 */
					//$("#id").removeClass(".red");
					//$("#id").addClass(".black");
					console.info("秒杀结束。等待下一次秒杀。。变成灰色" + t_inver);

					//ajax 代码
				} else if (t_inver < 2400 && t_inver > 0) {
					console.info("现在是秒杀时间" + t_inver);
				} else if (t_inver == 2400) {
					//ajax 代码
					companyActivity(ids[ids.length - radomindex], i);
					//假设
					/**
					 *
					 * .red{
					 * 	bak:red;
					 * }
					 * .black{
					 * 	.bak-col:black
					 * }
					 *
					 */
					//$("#id").removeClass(".black");
					//$("#id").addClass(".red");
					console.info("开始秒杀，变亮");
				} else if (t_inver > 2400) {
					console.info("秒杀等待时间。等待下一次秒杀");
				}
			} else {

				clearTimeout(f);
				console.info("秒杀活动结束。。。");
			}
		}

		/****/
	}

	$(".twenty").each(function() {
		f = setTimeout("takeCount()", 1000);
		//i 是开始秒杀时间
		show(0, this);
		//end--------
	});
}

$(function() {

	f = setTimeout("takeCount()", 1000);

})