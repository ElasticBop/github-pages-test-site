var projects = [{
    description : "A website to store and view the projects I create. Built using HTML, CSS, and Javascript",
    link : "https://github.com/elasticbop",
    img : "./projects/images/project1.jpg"
}, {
    description : "Second project",
    link : "https://github.com/elasticbop",
    img : "./projects/images/project1.jpg"        
}];

function addProject(project) {
    var link = document.createElement("a");
    var paragraph = document.createElement("p");
    var img = document.createElement("img");
    var figure = document.createElement("figure");
    var figcaption = document.createElement("figcaption");
    var container = document.createElement("div");

    link.setAttribute("href", project.link);
    link.setAttribute("target", "_blank");
    link.setAttribute("class", "projects-entry-image-cover");
    link.appendChild(document.createTextNode("View"));
    
    paragraph.appendChild(document.createTextNode(project.description));

    img.setAttribute("src", project.img);
    img.setAttribute("alt", "No Image Available");

    container.setAttribute("class", "projects-entry");

    img.appendChild(link);
    figure.appendChild(img);

    figcaption.appendChild(paragraph);
    figure.appendChild(figcaption);

    container.appendChild(figure);
    document.getElementById("projects-container").appendChild(container);
}

var observer; 
function createObserver(){
    observer = new IntersectionObserver(entries => {
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
}

function init() {
    //projects.forEach( addProject );
    createObserver();
    var cover = document.getElementById("loading-screen");
    var content = document.getElementById("content");
    cover.style.display = "none";
    content.style.display = "block";
}

