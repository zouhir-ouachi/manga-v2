function setupMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOpenIcon = document.getElementById("menu-open-icon");
  const menuCloseIcon = document.getElementById("menu-close-icon");

  if (!mobileMenuButton || !mobileMenu || !menuOpenIcon || !menuCloseIcon) {
    console.warn("Mobile menu elements not found");
    return;
  }

  const toggleMenu = () => {
    const isExpanded =
      mobileMenuButton.getAttribute("aria-expanded") === "true";
    mobileMenuButton.setAttribute("aria-expanded", (!isExpanded).toString());

    // Toggle menu visibility
    mobileMenu.classList.toggle("mobile-menu-open");
    mobileMenu.classList.toggle("mobile-menu-closed");

    // Toggle icons
    menuOpenIcon.classList.toggle("hidden");
    menuCloseIcon.classList.toggle("hidden");
  };

  // Handle click events
  mobileMenuButton.addEventListener("click", toggleMenu);

  // Handle keyboard events
  mobileMenuButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      mobileMenu.classList.contains("mobile-menu-open")
    ) {
      toggleMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      mobileMenu.classList.contains("mobile-menu-open") &&
      !mobileMenuButton.contains(event.target as Node) &&
      !mobileMenu.contains(event.target as Node)
    ) {
      toggleMenu();
    }
  });
}

// Setup on initial load
setupMobileMenu();

// Setup after navigation
document.addEventListener("astro:after-swap", setupMobileMenu);

export {};
