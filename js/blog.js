$(document).ready(function() {
    // Configure/customize these variables.
    var ellipsestext = "...";
    var moretext = "Читать дальше >";
    var lesstext = "Скрыть";
    

    $('.article-toggler').each(function() {
        $(this).html('<a href="" class="morelink">' + moretext + '</a>');
    });
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).parent().prev().addClass("hidden-blog");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).parent().prev().removeClass("hidden-blog");
            $(this).html(lesstext);
        }
        return false;
    });
});