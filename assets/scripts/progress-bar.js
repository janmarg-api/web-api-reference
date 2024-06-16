const scrollProgressBar = document.getElementById("scroll-progress-bar");

function step() {
  let maxScrollHeight = window.visualViewport.height;
  let scrollPercentage = (window.scrollY / maxScrollHeight) * 100;

  scrollProgressBar.style.width = scrollPercentage + "%";

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
