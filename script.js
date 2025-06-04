// Navigation and content loading functionality
document.addEventListener("DOMContentLoaded", () => {
  // Handle navigation
  setupNavigation()

  // Initialize skill bars animation
  initializeSkillBars()

  // Load initial content
  loadContent('profile')
})

// 语言配置
const translations = {
    en: {
        profile: 'Profile',
        education: 'Education',
        skills: 'Skills',
        research: 'Research',
        evaluation: 'Self-Evaluation',
        langButton: '中文'
    },
    zh: {
        profile: '个人简介',
        education: '教育背景',
        skills: '技能特长',
        research: '研究经历',
        evaluation: '自我评价',
        langButton: 'English'
    }
};

let currentLang = 'en';

// 语言切换功能
document.getElementById('langToggle').addEventListener('click', function() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    updateLanguage();
});

// 更新页面语言
function updateLanguage() {
    const t = translations[currentLang];
    
    // 更新导航链接文本
    document.querySelectorAll('.nav-link').forEach(link => {
        const section = link.getAttribute('href').substring(1);
        if (t[section]) {
            link.textContent = t[section];
        }
    });

    // 更新语言切换按钮文本
    document.getElementById('langToggle').textContent = t.langButton;

    // 更新标题
    document.title = currentLang === 'en' ? 
        'Personal Resume - [Your Name]' : 
        '个人简历 - [您的姓名]';

    // 载入当前显示的内容
    loadContent(getCurrentSection());
}

// 获取当前显示的部分
function getCurrentSection() {
    return document.querySelector('.section.active').id;
}

// 内容加载功能
function loadContent(section) {
    const contentDiv = document.getElementById(`${section}-content`);
    const lang = currentLang;
    
    // 根据当前语言加载对应的 HTML 文件
    fetch(`${section}${lang === 'zh' ? '_zh' : ''}.html`)
        .then(response => response.text())
        .then(html => {
            contentDiv.innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

async function loadSectionContent() {
  const sections = [
    { id: "profile", file: `profile${currentLang === 'zh' ? '_zh' : ''}.html` },
    { id: "education", file: `education${currentLang === 'zh' ? '_zh' : ''}.html` },
    { id: "skills", file: `skills${currentLang === 'zh' ? '_zh' : ''}.html` },
    { id: "research", file: `research${currentLang === 'zh' ? '_zh' : ''}.html` },
    { id: "evaluation", file: `evaluation${currentLang === 'zh' ? '_zh' : ''}.html` },
  ]

  for (const section of sections) {
    try {
      const response = await fetch(section.file)
      const content = await response.text()
      const contentDiv = document.getElementById(`${section.id}-content`)
      if (contentDiv) {
        contentDiv.innerHTML = content
      }
    } catch (error) {
      console.error(`Error loading ${section.file}:`, error)
      // Fallback content
      const contentDiv = document.getElementById(`${section.id}-content`)
      if (contentDiv) {
        contentDiv.innerHTML = `<p>Content for ${section.id} section will be loaded here.</p>`
      }
    }
  }
}

function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll(".section")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links and sections
      navLinks.forEach((l) => l.classList.remove("active"))
      sections.forEach((s) => s.classList.remove("active"))

      // Add active class to clicked link
      this.classList.add("active")

      // Show corresponding section
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)
      if (targetSection) {
        targetSection.classList.add("active")
        
        // 立即加载对应语言的内容
        loadContent(targetId)

        // Re-initialize skill bars if skills section is shown
        if (targetId === "skills") {
          setTimeout(initializeSkillBars, 100)
        }
      }
    })
  })
}

function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const width = bar.style.width
    bar.style.width = "0%"

    setTimeout(() => {
      bar.style.width = width
    }, 200)
  })
}

// Smooth scrolling for better UX
function smoothScroll(target) {
  const element = document.getElementById(target)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Add some interactive features
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to skill items
  const skillItems = document.querySelectorAll(".skill-item")
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(5px)"
      this.style.transition = "transform 0.3s ease"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)"
    })
  })

  // Add click effects to contact items
  const contactItems = document.querySelectorAll(".contact-item")
  contactItems.forEach((item) => {
    item.addEventListener("click", function () {
      const text = this.querySelector("span").textContent
      if (text.includes("@")) {
        window.location.href = `mailto:${text}`
      } else if (text.includes("linkedin")) {
        window.open(`https://${text}`, "_blank")
      } else if (text.includes("github")) {
        window.open(`https://${text}`, "_blank")
      }
    })

    item.style.cursor = "pointer"
  })
})

// 初始化时加载内容
document.addEventListener('DOMContentLoaded', function() {
    loadContent('profile');
});

// 添加导航栏响应式控制
document.addEventListener('DOMContentLoaded', function() {
    // 创建菜单按钮
    const menuBtn = document.createElement('button');
    menuBtn.className = 'menu-toggle';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navigation').insertAdjacentElement('afterbegin', menuBtn);
    
    // 添加菜单切换事件
    menuBtn.addEventListener('click', function() {
        document.querySelector('.navigation').classList.toggle('show');
    });
    
    // 点击内容区域时关闭菜单
    document.querySelector('.main-content').addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('.navigation').classList.remove('show');
        }
    });
    
    // 内容预加载
    const preloadContent = async () => {
        const sections = ['profile', 'education', 'skills', 'research', 'evaluation'];
        const currentLang = document.documentElement.lang === 'zh' ? '_zh' : '';
        
        for (const section of sections) {
            try {
                const response = await fetch(`${section}${currentLang}.html`);
                const content = await response.text();
                document.getElementById(`${section}-content`).innerHTML = content;
            } catch (error) {
                console.error(`Error loading ${section} content:`, error);
            }
        }
    };

    // 平滑切换效果
    const switchSection = (targetId) => {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // 监听导航点击
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            switchSection(targetId);
            history.pushState(null, '', `#${targetId}`);
        });
    });

    // 初始加载
    preloadContent();
    
    // 根据 URL hash 加载对应部分
    const initialSection = window.location.hash.substring(1) || 'profile';
    switchSection(initialSection);
});

// 移动端菜单控制
function setupMobileMenu() {
    const navigation = document.querySelector('.navigation');
    const container = document.querySelector('.container');
    
    // 创建菜单按钮
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    container.appendChild(menuButton);
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    container.appendChild(overlay);
    
    // 切换菜单显示状态
    function toggleMenu() {
        navigation.classList.toggle('show');
        overlay.classList.toggle('show');
        
        // 切换菜单图标
        const icon = menuButton.querySelector('i');
        if (navigation.classList.contains('show')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    }
    
    // 添加事件监听器
    menuButton.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // 点击导航链接时关闭菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
}

// 在页面加载完成后初始化移动端菜单
document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
});
