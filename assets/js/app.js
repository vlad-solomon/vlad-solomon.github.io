const container = document.querySelector(".page-content");

const updateViewportElements = () => {
	container.style.height = `${window.innerHeight}px`;
};

window.addEventListener("resize", updateViewportElements);

updateViewportElements();

gsap.timeline()
	.to($(".welcome-splash img"), { delay: 0.5, duration: 0.5, scale: 1, rotate: 0, opacity: 1 })
	.to($(".welcome-splash"), { delay: 0.5, duration: 0.5, scale: 1.1, opacity: 0 })
	.to($(".page-content > div"), { duration: 0.5, "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", stagger: { amount: 1 } })
	.to($(".sidebar > div"), { duration: 0.2, opacity: 1 })
	.to($("[data-submenu='about']"), { duration: 0.2, opacity: 1, display: "block" }, "<")
	.to($("[data-section='who']"), { duration: 0.2, opacity: 1, display: "flex" }, "<")
	.call(function () {
		$(".welcome-splash").remove();
	})
	.set($("body"), { "pointer-events": "auto" });

$(".sidebar__icon").click(function () {
	let selectedSubmenu = $(this).attr("data-submenu-select");
	$(this).addClass("sidebar__icon--selected").siblings().removeClass("sidebar__icon--selected");

	gsap.timeline()
		.to($(".menu__submenu"), { duration: 0.2, opacity: "0" })
		.set($(".menu__submenu"), { display: "none" })
		.set($(`.menu__submenu[data-submenu="${selectedSubmenu}"]`), { display: "block" })
		.to($(`.menu__submenu[data-submenu="${selectedSubmenu}"]`), { duration: 0.2, opacity: 1 });

	$(`[data-submenu="${selectedSubmenu}"] .menu__options .button`).first().trigger("click");
});

$(document).on("click", ".menu__options .button:not('.button--project')", function () {
	let selectedSection = $(this).attr("data-section-select");
	$(this).addClass("button--selected").siblings().removeClass("button--selected");
	gsap.timeline()
		.to($(".main__content"), { duration: 0.2, opacity: "0" })
		.set($(".main__content"), { display: "none" })
		.set($(`.main__content[data-section="${selectedSection}"]`), { display: $(`.main__content[data-section="${selectedSection}"]`).hasClass("main--full") ? "flex" : "block" })
		.to($(`.main__content[data-section="${selectedSection}"]`), { duration: 0.2, opacity: 1 });
});

const splides = document.getElementsByClassName("splide");
const splideOptions = {
	arrows: false,
	pagination: false,
	drag: "free",
	autoWidth: true,
	mediaQuery: "min",
	breakpoints: {
		1081: {
			destroy: true,
		},
	},
};

for (var i = 0; i < splides.length; i++) {
	new Splide(splides[i], splideOptions).mount();
}
