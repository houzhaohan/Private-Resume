// Navigation and content loading functionality
document.addEventListener("DOMContentLoaded", () => {
  // Load content for each section
  loadSectionContent()

  // Handle navigation
  setupNavigation()

  // Initialize skill bars animation
  initializeSkillBars()
})

async function loadSectionContent() {
  const sections = [
    { id: "profile", file: "profile.html" },
    { id: "education", file: "education.html" },
    { id: "skills", file: "skills.html" },
    { id: "research", file: "research.html" },
    { id: "evaluation", file: "evaluation.html" },
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
