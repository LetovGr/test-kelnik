$( document ).ready(function() {

    let list = [];
    let orderBool = true;

    $(".flat__sort").click(function(){
        let sortType = $(this).data("sort")
        $.get("./static/js/elements.json",function(data){
            let orderType = !orderBool === false ? "asc" : "desc";    
            let sortedList = _.chain(data).orderBy(sortType,orderType).chunk(12).head().value();
            list = _.chain(data).sortBy(sortType).drop(12).value();
            $(".flat__wrapper").html("");
           render(sortedList);
           orderBool = !orderBool;
        },"json");
        $(".flat__sort").removeClass("_active");
        $(this).addClass("_active");
        $(this).toggleClass("_arrow");
    })

    $(".main__more-button").click(function(){
        let newList = _.chain(list).chunk(20).head().value();
        list = _.drop(list,20);
        render(newList);
        let countList = newList + 12;
    })


    $.get("./static/js/elements.json",function(data){
            let chunkedList = _.chain(data).chunk(12).head().value();
            list =  _.drop(data,12);
            render(chunkedList);
    },"json");

    $(".footer__email-input").focusout(function(){
      emailValidate();
    });

    function emailValidate(){
        let pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        let email = $(".footer__email-input").val();
        if(email !== '') {
          if(pattern.test(email)) {
          $('#alert-1').css('display','none');
          $('#alert-2').css('display','none');
          }
          else {
              $('#alert-1').css('display','block');
              $('#alert-2').css('display','none');
          }

        }
        else {
            $('#alert-1').css('display','none');
            $('#alert-2').css('display','block');
        }
    }

    $(".header__burger-btn").click(function(){
        $(".header__menu").toggleClass("_open");
        $(".header__burger-line").toggleClass("_open");
        $(".header__burger-cross").toggleClass("_open");     
    })

    $(window).scroll(function () {
           // Если отступ сверху больше 50px то показываем кнопку "Наверх"
           if ($(this).scrollTop() > 150) {
               $(".main__scroll-button").fadeIn();
           } else {
               $(".main__scroll-button").fadeOut();
           }
       });

    $(".main__scroll-button").click(function () {
          $('body,html').animate({
              scrollTop: 0
          }, 500);
          return false;
      });
});








function render(items) {
    let htmlReady = [];

    for( let i = 0; i < items.length; i++){
        let saleNum = items[i].saleNum
        let sale = items[i].sale === 0 ? "<div class='flat__sale-item'> - " + saleNum + "%" + "</div>" : " ";
        let hot = items[i].hot === 0 ? "<div class='flat__sale-item'>" + 'ШОК ЦЕНА!' +"</div>" : " ";
        let image = items[i].image;
        let style = items[i].interior === 0 ? "без <br> отделки" : "с <br> отделкой";
        let s = items[i].s
        let floor = items[i].floor
        let price = items[i].price.toString().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& " );
        let name = items[i].name;
        let statusWord = items[i].status === 1 ? "Свободно" : items[i].status === 2 ? "Забронировано" : "Продано";
        let status = items[i].status === 1 ? "_free" : items[i].status === 2 ? "_booked" : "_sold";
        let template = "<div class='flat__item-wrapper " + status + "'>" +
                            "<div class='flat__star'>" + items[i].star + "</div>" +
                            "<div class='flat__sale-wrapper'>" +
                                sale + hot +
                            "</div>" +
                            "<div class='flat__item-img'>" +
                                "<img src='./static/images/" + image + "-flat.png' />" +
                            "</div>" +
                            "<div class='flat__title'>" +
                                name +
                            "</div>" +
                            "<div class='flat__subtitle'>" +
                                "<div class='flat__subtitle-style'>" +
                                    style +
                                "</div>" +
                                "<div class='flat__subtitle-digits'>" +
                                    s + "<sup> 2 </sup>" +
                                    "<span> площадь </span>" +
                                "</div>" +
                                "<div class='flat__subtitle-digits'>" +
                                    floor + "/14" +
                                    "<span> этаж </span>" +
                                "</div>" +
                            "</div>" +
                            "<div class='flat__price'>" +
                                price + " руб." +
                            "</div>" +
                            "<div class='flat__status-bar "+ status +"'>" +
                                statusWord +
                            "</div>" +
                       "</div>";
        htmlReady.push(template);

        function flatCount(items){
            let countHtmlReady = [];
            let itemWrap = 100;
            let countTemplate = "<div class='main__title'> Найдено" + " " + itemWrap + " " + "квартир" + "</div>";
            countHtmlReady.push(countTemplate);

            $(".main__title").remove();
            $(".main__wrapper").prepend(countHtmlReady.join(" "));
        }


    }


    flatCount(items)
    $(".flat__wrapper").append(htmlReady.join(" "));

    
    console.log($(".flat__item-wrapper").length);
}

