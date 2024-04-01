// document.querySelectorAll("*").forEach(e=> {e.style.outline = 'grey 1px solid'})
const AnimationFunction = () => {
	const sectionArray = document.querySelectorAll("[aria-label='content']");
	const sectionPosition = {};
	const offset = document.querySelector(".navbar").offsetHeight;
	sectionArray.forEach((section) => (sectionPosition[section.id] = section.offsetTop));
	window.onscroll = () => {
		let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
		for (id in sectionPosition) {
			if (sectionPosition[id] - offset <= scrollPosition) {
				document.querySelectorAll("a[class*='-links'],a[class^='-links']").forEach((e) => {
					e.ariaSelected = false;
				});
				document.querySelectorAll(`a[class*='-links'][href='#${id}']`).forEach((e) => {
					e.ariaSelected = true;
				});
			}
		}
	};
};

document.addEventListener("DOMContentLoaded", (e) => {
	let splitText = Splitting();
	splitText[0].words.forEach((e, idx) => {
		// console.log(e);
		e.dataset.aos = window.innerWidth < 1024 ? "zoom-in-up" : "zoom-in-right";
		e.dataset.aosDelay = idx * (window.innerWidth < 1024 ? 50 : 100);
	});
	if (window.scrollY > 0) {
		document.querySelector(".navbar").classList.add("py-4", "shadow-md");
	} else {
		document.querySelector(".navbar").classList.remove("py-4", "shadow-md");
	}
	document.querySelector("#sidebar-nav").addEventListener("change", (e) => {
		if (e.target.checked) {
			document.querySelector(".navbar").classList.add("py-4", "shadow-md");
		} else {
			document.querySelector(".navbar").classList.remove("py-4", "shadow-md");
		}
	});
	document.querySelectorAll("[aria-label='nav-link']").forEach((el) => {
		let li = document.createElement("li");
		let link = document.createElement("a");
		link.href = el.href;
		link.ariaLabel = "drawer-links";
		link.innerHTML = el.innerHTML;
		link.classList.add("drawer-links");
		li.appendChild(link);
		document.querySelector(".drawer-side > ul").appendChild(li);
	});
	if (!window.localStorage.getItem("theme")) {
		if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			window.localStorage.setItem("theme", "dark");
		} else {
			window.localStorage.setItem("theme", "lightdim");
		}
	}
	if (window.localStorage.getItem("theme") != "lightdim") {
		document.querySelector("[data-toggle-theme]").checked = true;
	}
	AOS?.init?.({ anchorPlacement: "top-bottom" });
	window.localStorage.getItem("theme") == "lightdim";
	AnimationFunction();
	document.querySelector(`a[href="${window.location.hash}"`) && (document.querySelector(`a[href="${window.location.hash}"`).ariaSelected = true);
});

// Scroll up function
document.addEventListener("scroll", (e) => {
	if (window.scrollY > 0) {
		document.querySelector(".navbar").classList.add("py-4", "shadow-md");
	} else {
		document.querySelector(".navbar").classList.remove("py-4", "shadow-md");
	}
	if (window.scrollY > 200) {
		document.querySelector(".floating")?.classList?.remove?.("d-none");
	} else {
		document.querySelector(".floating")?.classList?.add?.("d-none");
	}
});

// Smooth scrolling for anchor links in navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		window.location.replace(this.getAttribute("href"));
		const targetId = this.getAttribute("href").substring(1);
		const targetElement = document.getElementById(targetId);
		let offset = document.querySelector(".navbar").offsetHeight * 0.9;
		window.scrollTo({
			top: (targetElement ?? document.body).offsetTop - offset,
			behavior: "smooth",
		});
	});
});

function closeSidebar() {
	document.querySelector("#sidebar-nav").checked = false;
}
