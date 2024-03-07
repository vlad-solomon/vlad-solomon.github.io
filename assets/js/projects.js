const projects = ["proton calendar", "discovero", "what's real", "swwwatch", "linebreak"];

let projectButton = projects.map((project) => `<div class="splide__slide button button--project" data-load="${project}" data-section-select="project">${project}</div>`);
$("[data-submenu='projects'] .splide__list").append(projectButton);

var md = window.markdownit({
	html: true,
});

$(document).on("click", ".button--project", function () {
	$("body").css("pointer-events", "none");
	setTimeout(() => {
		$(this).addClass("button--selected").siblings().removeClass("button--selected");
	}, 1000);
	let loadedDoc = $(this).attr("data-load");
	let path = `assets/projects/${loadedDoc}`;

	$(".loading").text(loadedDoc);

	gsap.timeline()
		.to($(".loading"), { duration: 0.6, ease: "power2.inOut", width: "100%" })
		.set($(".loading"), { left: "unset", right: 0 })
		.call(function () {
			fetch(`${path}/index.md`)
				.then((response) => response.text())
				.then((result) => {
					var html = md.render(result);
					$("[data-section='project']").html(html);
					let images = $("[data-section='project']").find("img");
					$("[data-section='project']").find("a").attr("target", "_blank");
					for (i = 0; i < images.length; i++) {
						$(images[i]).attr("src", `${path}/${$(images[i]).attr("src")}`);
					}
				})
				.then(() => {
					$(".main").scrollTop(0);
					gsap.timeline()
						.set($(".main__content"), { display: "none" })
						.set($(`.main__content[data-section="project"]`), { display: "block", opacity: 1 })
						.to($(".loading"), { delay: 1, duration: 1, ease: "power2.inOut", width: 0 })
						.set($(".loading"), { left: 0, right: "unset" })
						.set($("body"), { "pointer-events": "auto" });
				});
		});
});
