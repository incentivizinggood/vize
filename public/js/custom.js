$("#multi-select-demo").multiselect();
$("#multi-select-demo1").multiselect();
$("#multi-select-demo2").multiselect();
$("#multi-select-demo3").multiselect();

$(document).ready(function() {
    var itaImgLink = "images/mx.jpg";
    var engImgLink = "images/us.jpg";
    var deuImgLink = "images/mx.jpg";
    var fraImgLink = "images/mx.jpg";

    var imgBtnSel = $("#imgBtnSel");
    var imgBtnIta = $("#imgBtnIta");
    var imgBtnEng = $("#imgBtnEng");
    var imgBtnDeu = $("#imgBtnDeu");
    var imgBtnFra = $("#imgBtnFra");

    var imgNavSel = $("#imgNavSel");
    var imgNavIta = $("#imgNavIta");
    var imgNavEng = $("#imgNavEng");
    var imgNavDeu = $("#imgNavDeu");
    var imgNavFra = $("#imgNavFra");

    var spanNavSel = $("#lanNavSel");
    var spanBtnSel = $("#lanBtnSel");

    imgBtnSel.attr("src", itaImgLink);
    imgBtnIta.attr("src", itaImgLink);
    imgBtnEng.attr("src", engImgLink);
    imgBtnDeu.attr("src", deuImgLink);
    imgBtnFra.attr("src", fraImgLink);

    imgNavSel.attr("src", itaImgLink);
    imgNavIta.attr("src", itaImgLink);
    imgNavEng.attr("src", engImgLink);
    imgNavDeu.attr("src", deuImgLink);
    imgNavFra.attr("src", fraImgLink);

    $(".language").on("click", function(event) {
        var currentId = $(this).attr("id");

        if (currentId == "navIta") {
            imgNavSel.attr("src", itaImgLink);
            spanNavSel.text("");
        } else if (currentId == "navEng") {
            imgNavSel.attr("src", engImgLink);
            spanNavSel.text("");
        } else if (currentId == "navDeu") {
            imgNavSel.attr("src", deuImgLink);
            spanNavSel.text("");
        } else if (currentId == "navFra") {
            imgNavSel.attr("src", fraImgLink);
            spanNavSel.text("");
        }

        if (currentId == "btnIta") {
            imgBtnSel.attr("src", itaImgLink);
            spanBtnSel.text("");
        } else if (currentId == "btnEng") {
            imgBtnSel.attr("src", engImgLink);
            spanBtnSel.text("");
        } else if (currentId == "btnDeu") {
            imgBtnSel.attr("src", deuImgLink);
            spanBtnSel.text("");
        } else if (currentId == "btnFra") {
            imgBtnSel.attr("src", fraImgLink);
            spanBtnSel.text("");
        }
    });
});
