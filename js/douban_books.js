//By ImMmMm.com 20190618
$(document).ready(function(){
    $(".post-content").append("<div id='books_list' data-page='1'><ul class='mview--ul clearfix'></ul></div><div id='books_more'></div>");

    showMyWishBooks();

    function showMyWishBooks(){
        //apiSR 授权自 https://bm.weajs.com/user
        var apiSR = '68181758e005936fceffb5705382bd51f2f97528a2f7398ff8ea84044f81841a';
        var now_page = parseInt($('#books_list').attr('data-page'));
        var doubanM = "https://bm.weajs.com/api/books?page="+now_page+"&secret="+apiSR;
        $('#books_more').show().text("加载中，请稍后");
        $.ajax({
            url: doubanM,
            success: function(data) {
                //console.log(data);
                $('#books_list').attr({'data-page':now_page+1,'data-flag':'true'});
                parseBookDatas(data);
                $('#books_more').hide();
            },
            error: function() {
                $('#books_list').attr('data-flag','false')
                $('#books_more').show().text("ʅ(‾◡◝)就这些数据啦")
            }
       })
    };

    function parseBookDatas(data){
        var item_template = '<li class="mview--li"><a target="_blank" href="https://book.douban.com/subject/__book_url__" alt="__book_title__" title="__book_title__"><div class="mview--cover"><img src="__book_image__" /></div><div class="mview--info"><div class="mview--title">__book_title__</div><div class="mview--rank rating"><div class="rating-star allstar__book_up_rating__"></div><div class="rating-average">__book_rating__average__</div></div></div></div></a></li>';
        $.each(data,function(key,item){
            var db_star = Math.ceil(item.rating)
            var bookitem = item_template.replace(/__book_url__/g,item.doubanId).replace(/__book_title__/g,item.title).replace(/__book_image__/g,item.cover).replace(/__book_up_rating__/g,db_star).replace(/__book_rating__average__/g,item.rating);
            $('ul.mview--ul').append(bookitem);
        });
    };
    
    $(window).scroll(function (){
        var flag = $('#books_list').attr('data-flag');
        if ($(this).scrollTop() + $(window).height() + 50 >= $(".post-content").height() ) {
            if (flag == "true") {  
                $('#books_list').attr('data-flag','false')
                showMyWishBooks();
            }
        }
    });
})