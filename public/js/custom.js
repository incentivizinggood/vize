$("#multi-select-demo").multiselect();
$("#multi-select-demo1").multiselect();
$("#multi-select-demo2").multiselect();
$("#multi-select-demo3").multiselect();

$(document).ready(function() {
	const itaImgLink = "images/mx.jpg";
	const engImgLink = "images/us.jpg";
	const deuImgLink = "images/mx.jpg";
	const fraImgLink = "images/mx.jpg";

	const imgBtnSel = $("#imgBtnSel");
	const imgBtnIta = $("#imgBtnIta");
	const imgBtnEng = $("#imgBtnEng");
	const imgBtnDeu = $("#imgBtnDeu");
	const imgBtnFra = $("#imgBtnFra");

	const imgNavSel = $("#imgNavSel");
	const imgNavIta = $("#imgNavIta");
	const imgNavEng = $("#imgNavEng");
	const imgNavDeu = $("#imgNavDeu");
	const imgNavFra = $("#imgNavFra");

	const spanNavSel = $("#lanNavSel");
	const spanBtnSel = $("#lanBtnSel");

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
		const currentId = $(this).attr("id");

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
