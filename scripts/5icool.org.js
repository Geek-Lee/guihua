// JavaScript Document
$(document).ready(function(e) {
	/***涓嶉渶瑕佽嚜鍔ㄦ粴鍔紝鍘绘帀鍗冲彲***/
	time = window.setInterval(function(){
		$('.og_next').click();	
	},5000);
	/***涓嶉渶瑕佽嚜鍔ㄦ粴鍔紝鍘绘帀鍗冲彲***/
	linum = $('.mainlist li').length;//鍥剧墖鏁伴噺
	w = linum * 250;//ul瀹藉害
	$('.piclist').css('width', w + 'px');//ul瀹藉害
	$('.swaplist').html($('.mainlist').html());//澶嶅埗鍐呭
	
	$('.og_next').click(function(){
		
		if($('.swaplist,.mainlist').is(':animated')){
			$('.swaplist,.mainlist').stop(true,true);
		}
		
		if($('.mainlist li').length>4){//澶氫簬4寮犲浘鐗�
			ml = parseInt($('.mainlist').css('left'));//榛樿鍥剧墖ul浣嶇疆
			sl = parseInt($('.swaplist').css('left'));//浜ゆ崲鍥剧墖ul浣嶇疆
			if(ml<=0 && ml>w*-1){//榛樿鍥剧墖鏄剧ず鏃�
				$('.swaplist').css({left: '1000px'});//浜ゆ崲鍥剧墖鏀惧湪鏄剧ず鍖哄煙鍙充晶
				$('.mainlist').animate({left: ml - 1000 + 'px'},'slow');//榛樿鍥剧墖婊氬姩				
				if(ml==(w-1000)*-1){//榛樿鍥剧墖鏈€鍚庝竴灞忔椂
					$('.swaplist').animate({left: '0px'},'slow');//浜ゆ崲鍥剧墖婊氬姩
				}
			}else{//浜ゆ崲鍥剧墖鏄剧ず鏃�
				$('.mainlist').css({left: '1000px'})//榛樿鍥剧墖鏀惧湪鏄剧ず鍖哄煙鍙�
				$('.swaplist').animate({left: sl - 1000 + 'px'},'slow');//浜ゆ崲鍥剧墖婊氬姩
				if(sl==(w-1000)*-1){//浜ゆ崲鍥剧墖鏈€鍚庝竴灞忔椂
					$('.mainlist').animate({left: '0px'},'slow');//榛樿鍥剧墖婊氬姩
				}
			}
		}
	})
	$('.og_prev').click(function(){
		
		if($('.swaplist,.mainlist').is(':animated')){
			$('.swaplist,.mainlist').stop(true,true);
		}
		
		if($('.mainlist li').length>4){
			ml = parseInt($('.mainlist').css('left'));
			sl = parseInt($('.swaplist').css('left'));
			if(ml<=0 && ml>w*-1){
				$('.swaplist').css({left: w * -1 + 'px'});
				$('.mainlist').animate({left: ml + 1000 + 'px'},'slow');				
				if(ml==0){
					$('.swaplist').animate({left: (w - 1000) * -1 + 'px'},'slow');
				}
			}else{
				$('.mainlist').css({left: (w - 1000) * -1 + 'px'});
				$('.swaplist').animate({left: sl + 1000 + 'px'},'slow');
				if(sl==0){
					$('.mainlist').animate({left: '0px'},'slow');
				}
			}
		}
	})    
});

$(document).ready(function(){
	$('.og_prev,.og_next').hover(function(){
			$(this).fadeTo('fast',1);
		},function(){
			$(this).fadeTo('fast',0.7);
	})

})

/* 閰风珯浠ｇ爜鏁寸悊 http://www.5icool.org */