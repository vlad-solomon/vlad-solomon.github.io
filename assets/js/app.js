$(".sidebar__icon").click(function () {
	let selectedSubmenu = $(this).attr("data-submenu-select");
	$(this).addClass("sidebar__icon--selected").siblings().removeClass("sidebar__icon--selected");

	gsap.timeline()
		.to($(".menu__submenu"), { duration: 0.2, opacity: "0" })
		.set($(".menu__submenu"), { display: "none" })
		.set($(`.menu__submenu[data-submenu="${selectedSubmenu}"]`), { display: "block" })
		.to($(`.menu__submenu[data-submenu="${selectedSubmenu}"]`), { duration: 0.2, opacity: 1 });
});

$(".menu__options .button").click(function () {
	let selectedSection = $(this).attr("data-section-select");
	$(this).addClass("button--selected").siblings().removeClass("button--selected");
	gsap.timeline()
		.to($(".main__content"), { duration: 0.2, opacity: "0" })
		.set($(".main__content"), { display: "none" })
		.set($(`.main__content[data-section="${selectedSection}"]`), { display: $(`.main__content[data-section="${selectedSection}"]`).hasClass("main--full") ? "flex" : "block" })
		.to($(`.main__content[data-section="${selectedSection}"]`), { duration: 0.2, opacity: 1 });
});
