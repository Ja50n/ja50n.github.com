$(document).ready(function() {
  $(".post-content").append(
    "<div id='books_list' data-page='1'><ul class='mview--ul clearfix'></ul></div><div id='books_more'></div>"
  );

  showMyWishBooks();

  function parseBookDatas(data) {
    var item_template =
      '<li class="mview--li"><a target="_blank" href="https://movie.douban.com/subject/__book_url__" alt="__book_title__" title="__book_title__"><div class="mview--cover"><img src="__book_image__" /></div><div class="mview--info"><div class="mview--title">__book_title__</div><div class="mview--rank rating"><div class="rating-star allstar__book_up_rating__"></div><div class="rating-average">__book_rating__average__</div></div></div></div></a></li>';
    $.each(data, function(key, item) {
      var db_star = Math.ceil(item.rating);
      var bookitem = item_template
        .replace(/__book_url__/g, item.mid)
        .replace(/__book_title__/g, item.title)
        .replace(/__book_image__/g, item.cover)
        .replace(/__book_up_rating__/g, db_star)
        .replace(/__book_rating__average__/g, item.rating);
      $("ul.mview--ul").append(bookitem);
    });
  }

  function showMyWishBooks() {
    $("#books_more")
      .show()
      .text("加载中，请稍后");
    var now_page = parseInt($("#books_list").attr("data-page"));
    var doubanM =
      "https://mufeng.me/app/movie?app_key=8edae8c753f3aed3d7329a2698ca62f0&page=" +
      now_page;
    $.ajax({
      url: doubanM,
      success: function(data) {
        // console.log(data);
        $("#books_list").attr({
          "data-page": now_page + 1,
          "data-flag": "true"
        });
        parseBookDatas(data);
        $("#books_more").hide();
      },
      error: function() {
        $("#books_list").attr("data-flag", "false");
        $("#books_more")
          .show()
          .text("好电影不一定改变人生，但一定会让人生更精彩！");
      }
    });
  }

  $(window).scroll(function() {
    var flag = $("#books_list").attr("data-flag");
    if (
      $(this).scrollTop() + $(window).height() + 200 >=
      $(document).height()
    ) {
      if (flag == "true") {
        $("#books_list").attr("data-flag", "false");
        showMyWishBooks();
      }
    }
  });
});
