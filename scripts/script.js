function removeLoadingCover() {
    var cover = document.getElementById("loading-screen");
    var content = document.getElementById("content");
    cover.style.display = "none";
    content.style.display = "block";
}

const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
        // Add the animation class
            entry.target.classList.add('fade-animation');
        }
    });
});


document.querySelectorAll(".projects-entry").forEach((i) => {
    if (i) {
        observer.observe(i);
    }
});
observer.observe(document.querySelector('.welcome-intro'));