document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");

  menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      menuBtn.innerHTML = "✕";
    } else {
      menuBtn.innerHTML = "☰";
    }
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      menuBtn.innerHTML = "☰";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".menu-slider");
  const grid = document.querySelector(".menu-grid");
  const items = document.querySelectorAll(".menu-grid .items");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const currentPage = document.querySelector(".menu-page");
  const totalPage = document.querySelector(".menu-total");

  let currentIndex = 0;

  function getItemsPerPage() {
    if (window.innerWidth <= 600) {
      return 1;
    }
    if (window.innerWidth <= 900) {
      return 2;
    }
    return 3;
  }

  function getTotalPages() {
    return Math.ceil(items.length / getItemsPerPage());
  }

  function updateCarousel() {
    const itemsPerPage = getItemsPerPage();
    const gap = parseFloat(getComputedStyle(grid).gap) || 0;
    const itemWidth = items[0].getBoundingClientRect().width;
    const moveAmount = (itemWidth + gap) * currentIndex;

    grid.style.transform = `translateX(-${moveAmount}px)`;

    const totalPages = getTotalPages();
    const currentPageNumber = Math.floor(currentIndex / itemsPerPage) + 1;

    currentPage.textContent = String(currentPageNumber).padStart(2, "0");
    totalPage.textContent = String(totalPages).padStart(2, "0");

    prev.disabled = currentIndex === 0;
    next.disabled = currentIndex >= items.length - itemsPerPage;
  }

  next.addEventListener("click", function () {
    const itemsPerPage = getItemsPerPage();

    currentIndex += itemsPerPage;

    if (currentIndex > items.length - itemsPerPage) {
      currentIndex = items.length - itemsPerPage;
    }

    updateCarousel();
  });

  prev.addEventListener("click", function () {
    const itemsPerPage = getItemsPerPage();

    currentIndex -= itemsPerPage;

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    updateCarousel();
  });

  window.addEventListener("resize", function () {
    const itemsPerPage = getItemsPerPage();

    currentIndex = Math.floor(currentIndex / itemsPerPage) * itemsPerPage;

    if (currentIndex > items.length - itemsPerPage) {
      currentIndex = Math.max(0, items.length - itemsPerPage);
    }

    updateCarousel();
  });

  updateCarousel();
});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", function () {
  const navigation = performance.getEntriesByType("navigation")[0];

  if (navigation && navigation.type === "reload") {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );

    setTimeout(function () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, 50);
  }
});

window.addEventListener("pageshow", function () {
  const navigation = performance.getEntriesByType("navigation")[0];

  if (navigation && navigation.type === "reload") {
    setTimeout(function () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, 100);
  }
});

