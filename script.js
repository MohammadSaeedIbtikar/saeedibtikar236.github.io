// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
})();

// Particle.js Configuration
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#00bcd4"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00bcd4",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        }
    },
    retina_detect: true
});

// Blog System
class BlogSystem {
    constructor() {
        this.posts = [
            {
                title: "Modern JavaScript Features Every Developer Should Know",
                category: "programming",
                excerpt: "Deep dive into ES6+ features including async/await, destructuring, and optional chaining.",
                image: "images/blog/js-features.jpg",
                date: "March 1, 2025",
                readTime: 8,
                technologies: ["JavaScript", "ES6+", "Web Development"],
                fullContent: "blog-posts/modern-javascript-features.html"
            },
            {
                title: "Introduction to Machine Learning with Python",
                category: "data-science",
                excerpt: "Learn the fundamentals of machine learning using Python and scikit-learn.",
                image: "images/blog/ml-intro.jpg",
                date: "February 28, 2025",
                readTime: 12,
                technologies: ["Python", "Machine Learning", "scikit-learn"],
                fullContent: "blog-posts/machine-learning-intro.html"
            },
            {
                title: "Effective Teaching Strategies for Programming",
                category: "education",
                excerpt: "Best practices and methodologies for teaching programming concepts.",
                image: "images/blog/teaching-prog.jpg",
                date: "February 25, 2025",
                readTime: 10,
                technologies: ["Education", "Programming", "Teaching Methods"],
                fullContent: "blog-posts/effective-teaching-strategies.html"
            }
        ];

        this.initializeCategories();
        this.displayPosts("all");
    }

    initializeCategories() {
        const categoryBtns = document.querySelectorAll(".category-btn");
        categoryBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                categoryBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                this.displayPosts(btn.dataset.category);
            });
        });
    }

    displayPosts(category) {
        const blogGrid = document.querySelector(".blog-grid");
        blogGrid.innerHTML = "";

        const filteredPosts = category === "all" 
            ? this.posts 
            : this.posts.filter(post => post.category === category);

        filteredPosts.forEach(post => {
            const postElement = this.createPostElement(post);
            blogGrid.appendChild(postElement);
        });
    }

    createPostElement(post) {
        const article = document.createElement("article");
        article.className = "blog-card";
        article.setAttribute("data-aos", "fade-up");

        article.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="blog-image">
            <div class="blog-content">
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-meta">
                    <span>${post.date}</span>
                    <span>${post.readTime} min read</span>
                </div>
            </div>
        `;

        article.addEventListener("click", () => {
            window.location.href = post.fullContent;
        });

        return article;
    }
}

// Project Showcase
class ProjectShowcase {
    constructor() {
        this.projects = [
            {
                title: "AI-Powered Analytics Dashboard",
                category: "web",
                image: "project1.jpg",
                description: "Real-time analytics dashboard with machine learning predictions",
                technologies: ["React", "Python", "TensorFlow"],
                link: "#"
            },
            // Add more projects here
        ];

        this.initializeFilters();
        this.displayProjects("all");
    }

    initializeFilters() {
        const filterBtns = document.querySelectorAll(".filter-btn");
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                this.displayProjects(btn.dataset.filter);
            });
        });
    }

    displayProjects(filter) {
        const projectsGrid = document.querySelector(".projects-grid");
        projectsGrid.innerHTML = "";

        const filteredProjects = filter === "all"
            ? this.projects
            : this.projects.filter(project => project.category === filter);

        filteredProjects.forEach(project => {
            const projectElement = this.createProjectElement(project);
            projectsGrid.appendChild(projectElement);
        });
    }

    createProjectElement(project) {
        const article = document.createElement("article");
        article.className = "project-card";
        article.setAttribute("data-aos", "fade-up");

        article.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join("")}
                </div>
                <a href="${project.link}" class="project-link">View Project</a>
            </div>
        `;

        return article;
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.getElementById("contact-form");
        this.initializeForm();
    }

    initializeForm() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const templateParams = {
                from_name: this.form.name.value,
                from_email: this.form.email.value,
                message: this.form.message.value
            };

            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
                .then(() => {
                    alert("Message sent successfully!");
                    this.form.reset();
                })
                .catch(() => {
                    alert("Failed to send message. Please try again.");
                });
        });
    }
}

// Initialize components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new BlogSystem();
    new ProjectShowcase();
    new ContactForm();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
