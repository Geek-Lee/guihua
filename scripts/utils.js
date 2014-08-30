var util = {};

util.move = function() {
    $(document).ready(function(e) {
        time = window.setInterval(function(){
            $('.og_next').click();  
        },5000);
        linum = $('.mainlist li').length;
        w = linum * 240;
        $('.piclist').css('width', w + 'px');
        $('.swaplist').html($('.mainlist').html());
        
        $('.og_next').click(function(){
            
            if($('.swaplist,.mainlist').is(':animated')){
                $('.swaplist,.mainlist').stop(true,true);
            }
            
            if($('.mainlist li').length>4){
                ml = parseInt($('.mainlist').css('left'));
                sl = parseInt($('.swaplist').css('left'));
                if(ml<=0 && ml>w*-1){
                    $('.swaplist').css({left: '960px'});
                    $('.mainlist').animate({left: ml - 960 + 'px'},'slow');             
                    if(ml==(w-960)*-1){
                        $('.swaplist').animate({left: '0px'},'slow');
                    }
                }else{
                    $('.mainlist').css({left: '960px'})
                    $('.swaplist').animate({left: sl - 960 + 'px'},'slow');
                    if(sl==(w-960)*-1){
                        $('.mainlist').animate({left: '0px'},'slow');
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
                    $('.mainlist').animate({left: ml + 960 + 'px'},'slow');                
                    if(ml==0){
                        $('.swaplist').animate({left: (w - 960) * -1 + 'px'},'slow');
                    }
                }else{
                    $('.mainlist').css({left: (w - 960) * -1 + 'px'});
                    $('.swaplist').animate({left: sl + 960 + 'px'},'slow');
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
        });

    });
};

util.tabClick = function() {
    $(function() {
        var timer, i=0, delay = 2;
        $('.tab-btn').on('click', function() {
            var that = this;
            $(this).fadeOut()
                    .siblings('.tab-con')
                    .animate({'left':'0px'});
            (function(t) {
                t = setInterval(function() {
                    if (i == delay) {
                        $(that).fadeIn()
                                .siblings('.tab-con')
                                .animate({'left':'-151px'});
                        clearTimeout(t);
                        i = 0;
                    } else {
                        i++;
                    }
                }, 1000);
            }(timer));
        });
        $('.back-tab').on('click', function() {
            clearTimeout(timer);
            $(this).parents('.tab-con')
                    .animate({'left':'-151px'})
                    .siblings('.tab-btn')
                    .fadeIn();
        });
    });
};

util.galleryAni = function() {
    $(function() {
        var sl_top = $('.gmainlist').css('height');
        $('.gswaplist').css('top',sl_top).html($('.gmainlist').html());
        timer = window.setInterval(function() {},4000);
        $('.pic-info-btn').eq(1).on('click', function(event) {
            var $picCntr = $('.pic-img-container'),
                param = $picCntr.attr('data-img-on'),
                ind = $(this).index();
            if (param != ind) {
                $('.pic-img-container ul').animate({"top": "-=360px"}, function() {
                    $('.pic-img-container').attr('data-img-on', ind);
                    if (parseInt($('.gmainlist').css('top')) == -720) {
                        $('.gmainlist').css('top',sl_top);
                    }
                    if (parseInt($('.gswaplist').css('top')) == -720) {
                        $('.gswaplist').css('top',sl_top);
                    }
                });
            }
        });
        $('.pic-info-btn').eq(2).on('click', function(event) {
            var $picCntr = $('.pic-img-container'),
                param = $picCntr.attr('data-img-on'),
                ind = $(this).index();
            if (param != ind) {
                $('.pic-img-container ul').animate({"top": "-=360px"}, function() {
                    $('.pic-img-container').attr('data-img-on', ind);
                });
            }

        });
    });
};


util.init = function() {
    util.move();
    util.tabClick();
    util.galleryAni();
};

util.init();