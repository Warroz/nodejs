// /!\ Optional JS for Autoplay /!\

// AUTOPLAY SLIDER CSS
var nbSlide = $(".slides").length;
var i = 1;
function sliderAutoplay() {
    if (i == nbSlide + 1) {
        i = 1;
        $("#button-" + i).prop("checked", true).trigger("click");
    } else {
        $("#button-" + i).prop("checked", true).trigger("click");
    }
    i++;
    // durée d'une slide
    timeout = setTimeout(sliderAutoplay, 8000);
}
sliderAutoplay();

// AUTOPLAY STOP QUAND ON CHANGE MANUELLEMENT DE SLIDE
$('#slideshow-wrap input').click(function () {
    var id = $(this).attr("id");
    clearTimeout(timeout);
    //console.log(id.substr(-1));
});