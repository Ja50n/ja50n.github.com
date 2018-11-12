$(document).ready(function() {
  $(".post-content-reading").append(
    "<div id='books_list' data-page='0'><ul class='mview--ul clearfix'></ul></div><div id='books_more-reading'></div>"
  );
  $(".post-content-wish").append(
    "<div id='books_list' data-page='0'><ul class='mview--ul clearfix'></ul></div><div id='books_more-wish'></div>"
  );
  $(".post-content-read").append(
    "<div id='books_list' data-page='0'><ul class='mview--ul clearfix'></ul></div><div id='books_more-read'></div>"
  );
  showMyWishBooks();

  var books_status = "";
  function parseBookDatas(data) {
    var item_template =
      '<li class="mview--li"><a target="_blank" href="__book_url__" alt="__book_title__" title="__book_comment__"><div class="mview--cover"><img src="__book_image__" /></div><div class="mview--info"><div class="mview--title">__book_title__</div><div class="mview--rank rating"><div class="rating-star allstar__book_up_rating__"></div><div class="rating-average">__book_rating__average__</div></div></div></div></a></li>';

    $.each(data, function(key, item) {
      var db_star = Math.ceil(item.book.rating.average);
      // var qiniu_cache = item.book.images.large.replace(
      //   /https:\/\/img.\.doubanio\.com/g,
      //   "https://lmm.96-wx.com"
      // );
      var qiniu_cache =
        "https://images.weserv.nl/?url=" + item.book.images.large;
      var bookitem = item_template
        .replace(/__book_url__/g, item.book.alt)
        .replace(/__book_title__/g, item.book.title)
        .replace(/__book_comment__/g, item.comment)
        .replace(/__book_image__/g, qiniu_cache)
        .replace(/__book_up_rating__/g, db_star)
        .replace(/__book_rating__average__/g, item.book.rating.average);
      books_status = item.status; //将阅读状态赋值给变量books_status
      //判断图书的阅读状态
      if (item.status == "reading") {
        $(".post-content-reading ul.mview--ul").append(bookitem);
      } else if (item.status == "wish") {
        $(".post-content-wish ul.mview--ul").append(bookitem);
      } else if (item.status == "read") {
        $(".post-content-read ul.mview--ul").append(bookitem);
      }
    });
  }
  function showMyWishBooks() {
    $("#books_more")
      .show()
      .text("加载中，请稍后");
    var uname = "Ja50nQiu";
    var now_page = parseInt($("#books_list").attr("data-page"));
    var doubanApi =
      "https://api.douban.com/v2/book/user/" +
      uname +
      "/collections?start=" +
      now_page * 20 +
      "&apikey=";
    $.ajax({
      url: doubanApi,
      dataType: "jsonp",
      timeout: 5000,
      success: function(data) {
        $("#books_list").attr({
          "data-page": now_page + 1,
          "data-start": now_page * 20,
          "data-total": data.total,
          "data-flag": "true"
        });
        parseBookDatas(data.collections);
        $("#books_more").hide();
      },
      error: function() {
        console.log("获取豆瓣读书信息失败,请刷新页面重新获取！");
      }
    });
  }

  $(window).scroll(function() {
    var flag = $("#books_list").attr("data-flag");
    if (
      $(this).scrollTop() + $(window).height() + 400 >=
      $(document).height()
    ) {
      var now_start = parseInt($("#books_list").attr("data-start")) + 20;
      var data_total = parseInt($("#books_list").attr("data-total"));
      if (flag == "true") {
        $("#books_list").attr("data-flag", "false");
        if (now_start <= data_total) {
          showMyWishBooks();
        } else {
          $("#books_more").hide();
        // } else {
        //   $("#books_more")
        //     .show()
        //     .text("好书籍不一定改变人生，但一定会让人生更精彩！");
        }
      }
    }
  });
  // var scan = 1;
  // while (scan == 1) {
  //   var flag = $("#books_list").attr("data-flag");
  //   var now_start = parseInt($("#books_list").attr("data-start")) + 20;
  //   var data_total = parseInt($("#books_list").attr("data-total"));
  //   if (flag == "true") {
  //     $("#books_list").attr("data-flag", "false");
  //     if (now_start <= data_total) {
  //       showMyWishBooks();
  //     } else {
  //       scan = 0;
  //     }
  //   }
  // }
});
