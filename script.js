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

// Blog System with Search
class BlogSystem {
    constructor() {
        this.blogGrid = document.querySelector('.blog-grid');
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.searchInput = document.querySelector('#blog-search-input');
        this.currentCategory = 'all';
        this.searchTerm = '';
        
        this.initializeBlog();
        this.addEventListeners();
    }

    initializeBlog() {
        this.displayBlogPosts();
    }

    addEventListeners() {
        this.categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.currentCategory = button.dataset.category;
                this.displayBlogPosts();
            });
        });

        this.searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.displayBlogPosts();
        });
    }

    filterPosts(posts) {
        return posts.filter(post => {
            const matchesCategory = this.currentCategory === 'all' || post.category === this.currentCategory;
            const matchesSearch = this.searchTerm === '' || 
                post.title.toLowerCase().includes(this.searchTerm) ||
                post.category.toLowerCase().includes(this.searchTerm) ||
                post.excerpt.toLowerCase().includes(this.searchTerm) ||
                post.technologies.some(tech => tech.toLowerCase().includes(this.searchTerm));
            
            return matchesCategory && matchesSearch;
        });
    }

    displayBlogPosts() {
        const sampleBlogPosts = [
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

        const filteredPosts = this.filterPosts(sampleBlogPosts);
        
        if (filteredPosts.length === 0) {
            this.blogGrid.innerHTML = '<div class="no-results">No articles found matching your criteria</div>';
            return;
        }

        this.blogGrid.innerHTML = filteredPosts.map(post => `
            <article class="blog-card">
                <div class="blog-card-content">
                    <h3>${post.title}</h3>
                    <p class="blog-meta">
                        <span>${post.date}</span>
                        <span>${post.readTime} min read</span>
                    </p>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-technologies">
                        ${post.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <a href="${post.fullContent}" class="read-more">Read More</a>
                </div>
            </article>
        `).join('');
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

// Theme Switcher
class ThemeSwitcher {
    constructor() {
        this.themeSwitch = document.querySelector('.theme-switch');
        this.icon = this.themeSwitch.querySelector('i');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.initializeTheme();
        this.addEventListeners();
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateIcon();
    }

    updateIcon() {
        this.icon.className = this.currentTheme === 'dark' 
            ? 'fas fa-moon'
            : 'fas fa-sun';
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateIcon();
    }

    addEventListeners() {
        this.themeSwitch.addEventListener('click', () => this.toggleTheme());
    }
}

// Scroll Progress
class ScrollProgress {
    constructor() {
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'progress-bar';
        document.body.appendChild(this.progressBar);
        this.addEventListeners();
    }

    updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    addEventListeners() {
        window.addEventListener('scroll', () => this.updateProgress());
        window.addEventListener('resize', () => this.updateProgress());
    }
}

// AI Tools System
class AIToolsSystem {
    constructor() {
        this.toolsGrid = document.querySelector('.ai-tools-grid');
        this.categories = document.querySelectorAll('.ai-tool-category');
        this.addEventListeners();
    }

    addEventListeners() {
        // Add hover effects
        this.categories.forEach(category => {
            category.addEventListener('mouseenter', () => {
                category.style.transform = 'translateY(-10px)';
            });

            category.addEventListener('mouseleave', () => {
                category.style.transform = 'translateY(0)';
            });
        });

        // Add click events for tool items
        document.querySelectorAll('.ai-tool-item').forEach(tool => {
            tool.addEventListener('click', () => {
                // Future implementation: Show tool details modal
                console.log('Tool clicked:', tool.querySelector('.ai-tool-name').textContent);
            });
        });
    }
}

// Learning Hub System
class LearningHubSystem {
    constructor() {
        this.currentQuiz = 1;
        this.totalQuizzes = 3;
        this.score = 0;
        this.solutions = {
            isPalindrome: `function isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return str === str.split('').reverse().join('');
}`,
            binarySearch: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
            mergeSort: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    
    return [...result, ...left.slice(i), ...right.slice(j)];
}`
        };

        this.initializeCareerPath();
        this.initializeQuiz();
        this.initializeChallenges();
    }

    initializeCareerPath() {
        const pathNodes = document.querySelectorAll('.path-node');
        pathNodes.forEach((node, index) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                node.classList.add('active');
                            }, index * 300);
                        }
                    });
                },
                { threshold: 0.5 }
            );
            observer.observe(node);
        });
    }

    initializeQuiz() {
        const quizCards = document.querySelectorAll('.quiz-card');
        const prevBtn = document.querySelector('.quiz-prev');
        const nextBtn = document.querySelector('.quiz-next');
        const progressFill = document.querySelector('.progress-fill');
        const scoreElement = document.getElementById('quiz-score');

        const updateNavigation = () => {
            prevBtn.disabled = this.currentQuiz === 1;
            nextBtn.disabled = this.currentQuiz === this.totalQuizzes;
            progressFill.style.width = `${(this.score / this.totalQuizzes) * 100}%`;
            scoreElement.textContent = this.score;
        };

        const showQuiz = (id) => {
            quizCards.forEach(card => {
                card.style.display = card.dataset.quizId === id.toString() ? 'block' : 'none';
            });
            updateNavigation();
        };

        prevBtn.addEventListener('click', () => {
            if (this.currentQuiz > 1) {
                this.currentQuiz--;
                showQuiz(this.currentQuiz);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (this.currentQuiz < this.totalQuizzes) {
                this.currentQuiz++;
                showQuiz(this.currentQuiz);
            }
        });

        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', () => {
                const card = option.closest('.quiz-card');
                const options = card.querySelectorAll('.quiz-option');
                
                options.forEach(opt => opt.classList.remove('correct', 'wrong'));
                
                if (option.dataset.correct === 'true') {
                    option.classList.add('correct');
                    if (!card.dataset.answered) {
                        this.score++;
                        card.dataset.answered = 'true';
                        updateNavigation();
                    }
                } else {
                    option.classList.add('wrong');
                    options.forEach(opt => {
                        if (opt.dataset.correct === 'true') opt.classList.add('correct');
                    });
                }
            });
        });

        updateNavigation();
    }

    initializeChallenges() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const challengeCards = document.querySelectorAll('.challenge-card');

        // Challenge filtering
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const difficulty = btn.dataset.difficulty;
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                challengeCards.forEach(card => {
                    if (difficulty === 'all' || card.dataset.difficulty === difficulty) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Code editor functionality
        challengeCards.forEach(card => {
            const codeEditor = card.querySelector('.code-editor code');
            const runBtn = card.querySelector('.run-code');
            const resetBtn = card.querySelector('.reset-code');
            const solutionBtn = card.querySelector('.show-solution');
            const originalCode = codeEditor.textContent;

            codeEditor.setAttribute('contenteditable', 'true');
            codeEditor.setAttribute('spellcheck', 'false');

            runBtn.addEventListener('click', () => {
                try {
                    const code = codeEditor.textContent;
                    const result = eval(`(${code})`);
                    
                    // Test cases
                    if (code.includes('isPalindrome')) {
                        console.log('Testing isPalindrome:');
                        console.log('radar:', result('radar'));
                        console.log('hello:', result('hello'));
                    } else if (code.includes('binarySearch')) {
                        console.log('Testing binarySearch:');
                        console.log('[1,2,3,4,5], 3:', result([1,2,3,4,5], 3));
                        console.log('[1,2,3,4,5], 6:', result([1,2,3,4,5], 6));
                    } else if (code.includes('mergeSort')) {
                        console.log('Testing mergeSort:');
                        console.log(result([64, 34, 25, 12, 22, 11, 90]));
                    }
                } catch (error) {
                    console.error('Error:', error.message);
                }
            });

            resetBtn.addEventListener('click', () => {
                codeEditor.textContent = originalCode;
            });

            solutionBtn.addEventListener('click', () => {
                const functionName = Object.keys(this.solutions).find(key => 
                    originalCode.includes(key)
                );
                if (functionName) {
                    codeEditor.textContent = this.solutions[functionName];
                }
            });
        });
    }
}

// Data Science System
class DataScienceSystem {
    constructor() {
        this.solutions = {
            titanic_analysis: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def analyze_titanic_data():
    # Load data
    df = pd.read_csv('titanic.csv')
    
    # Create subplots
    fig, axes = plt.subplots(2, 2, figsize=(15, 10))
    
    # Survival by class
    sns.barplot(x='Pclass', y='Survived', data=df, ax=axes[0,0])
    axes[0,0].set_title('Survival Rate by Passenger Class')
    
    # Age distribution
    sns.histplot(data=df, x='Age', hue='Survived', multiple="stack", ax=axes[0,1])
    axes[0,1].set_title('Age Distribution by Survival')
    
    # Gender impact
    sns.barplot(x='Sex', y='Survived', data=df, ax=axes[1,0])
    axes[1,0].set_title('Survival Rate by Gender')
    
    # Correlation heatmap
    sns.heatmap(df.corr(), ax=axes[1,1])
    axes[1,1].set_title('Feature Correlations')
    
    plt.tight_layout()
    return fig`,

            churn_model: `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

def build_churn_model(X, y):
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test_scaled)
    print(classification_report(y_test, y_pred))
    
    # Feature importance
    importances = pd.DataFrame({
        'feature': X.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    return model, importances`,

            cnn_model: `import torch
import torch.nn as nn
import torch.nn.functional as F

class ConvNet(nn.Module):
    def __init__(self):
        super(ConvNet, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, 3)
        self.conv2 = nn.Conv2d(32, 64, 3)
        self.conv3 = nn.Conv2d(64, 128, 3)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(128 * 26 * 26, 512)
        self.fc2 = nn.Linear(512, 10)
        self.dropout = nn.Dropout(0.5)
    
    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = self.pool(F.relu(self.conv3(x)))
        x = x.view(-1, 128 * 26 * 26)
        x = self.dropout(F.relu(self.fc1(x)))
        x = self.fc2(x)
        return x`
        };

        this.initializeDataSciencePath();
        this.initializeDataChallenges();
    }

    initializeDataSciencePath() {
        const pathNodes = document.querySelectorAll('.path-node');
        pathNodes.forEach((node, index) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                node.classList.add('active');
                            }, index * 300);
                        }
                    });
                },
                { threshold: 0.5 }
            );
            observer.observe(node);
        });
    }

    initializeDataChallenges() {
        const challengeCards = document.querySelectorAll('.challenge-card');
        
        challengeCards.forEach(card => {
            const codeEditor = card.querySelector('.code-editor code');
            const runBtn = card.querySelector('.run-code');
            const resetBtn = card.querySelector('.reset-code');
            const solutionBtn = card.querySelector('.show-solution');
            const originalCode = codeEditor.textContent;

            codeEditor.setAttribute('contenteditable', 'true');
            codeEditor.setAttribute('spellcheck', 'false');

            runBtn.addEventListener('click', () => {
                try {
                    const code = codeEditor.textContent;
                    console.log('Running analysis/model...');
                    console.log('Note: This is a simulation. In a real environment, you would need the required datasets and libraries.');
                } catch (error) {
                    console.error('Error:', error.message);
                }
            });

            resetBtn.addEventListener('click', () => {
                codeEditor.textContent = originalCode;
            });

            solutionBtn.addEventListener('click', () => {
                const challenge = card.querySelector('h4').textContent.toLowerCase();
                let solution = '';
                
                if (challenge.includes('exploratory')) {
                    solution = this.solutions.titanic_analysis;
                } else if (challenge.includes('machine learning')) {
                    solution = this.solutions.churn_model;
                } else if (challenge.includes('deep learning')) {
                    solution = this.solutions.cnn_model;
                }
                
                if (solution) {
                    codeEditor.textContent = solution;
                }
            });
        });
    }
}

// Performance Optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimize scroll events
    const onScroll = debounce(() => {
        // Your scroll handling code
    }, 16);

    window.addEventListener('scroll', onScroll);

    new ThemeSwitcher();
    new ScrollProgress();
    new BlogSystem();
    new ProjectShowcase();
    new ContactForm();
    new AIToolsSystem();
    new LearningHubSystem();
    new DataScienceSystem();
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
