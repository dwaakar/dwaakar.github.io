backend:
  name: git-gateway
  branch: main

media_folder: "public/images"
public_folder: "/public/images"

collections:

  - name: "settings"
    label: "⚙️ Site Settings"
    files:
      - name: "general"
        label: "Personal Info, Bio & Social Links"
        file: "content/settings.json"
        fields:
          - { label: "Full Name", name: "name", widget: "string" }
          - { label: "Email", name: "email", widget: "string", required: false }
          - { label: "Phone", name: "phone", widget: "string", required: false }
          - { label: "Location", name: "location", widget: "string", required: false }
          - { label: "Profile Photo", name: "photo", widget: "image", required: false }
          - { label: "Bio (shown on hero)", name: "bio", widget: "text", required: false }
          - label: "Typing Taglines"
            name: "taglines"
            widget: "list"
            required: false
            field: { label: "Tagline", name: "tagline", widget: "string" }

          - label: "── About: Research ──"
            name: "aboutResearchLabel"
            widget: "hidden"
            default: ""
          - { label: "Research Objective", name: "aboutResearchObjective", widget: "text", required: false }
          - label: "Research Interests"
            name: "researchInterests"
            widget: "list"
            required: false
            field: { label: "Interest", name: "interest", widget: "string" }

          - { label: "Professional Objective", name: "aboutProfessionalObjective", widget: "text", required: false }
          - label: "Professional Interests"
            name: "professionalInterests"
            widget: "list"
            required: false
            field: { label: "Interest", name: "interest", widget: "string" }

          - { label: "Academic CV (PDF)", name: "cvAcademic", widget: "file", required: false, hint: "Upload your academic CV as a PDF" }
          - { label: "Professional CV (PDF)", name: "cvProfessional", widget: "file", required: false, hint: "Upload your professional CV as a PDF" }

          - { label: "GitHub URL", name: "github", widget: "string", required: false }
          - { label: "LinkedIn URL", name: "linkedin", widget: "string", required: false }
          - { label: "Facebook URL", name: "facebook", widget: "string", required: false }
          - { label: "Instagram URL", name: "instagram", widget: "string", required: false }
          - { label: "Storygraph URL", name: "storygraph", widget: "string", required: false }
          - label: "Custom Social Links (add any platform)"
            name: "customSocials"
            widget: "list"
            required: false
            fields:
              - { label: "Platform Name (e.g. Twitter)", name: "name", widget: "string" }
              - { label: "URL", name: "url", widget: "string" }
              - { label: "Emoji Icon (e.g. 🐦)", name: "icon", widget: "string", default: "🔗" }

  - name: "education"
    label: "🎓 Education"
    folder: "content/education"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Degree Title", name: "title", widget: "string" }
      - { label: "Institution", name: "institution", widget: "string" }
      - { label: "Year", name: "year", widget: "string", required: false }
      - { label: "Grade / GPA", name: "grade", widget: "string", required: false }
      - { label: "Specialisation", name: "specialisation", widget: "string", required: false }
      - { label: "Thesis Title", name: "thesis", widget: "string", required: false }
      - label: "Key Coursework"
        name: "coursework"
        widget: "list"
        required: false
        field: { label: "Course", name: "course", widget: "string" }
      - { label: "Detail / Description", name: "body", widget: "markdown", required: false }
      - { label: "Cover Image", name: "image", widget: "image", required: false }
      - { label: "Link (e.g. institution website)", name: "link", widget: "string", required: false }
      - label: "Display Mode"
        name: "displayMode"
        widget: "select"
        options:
          - { label: "Popup only", value: "popup" }
          - { label: "Popup + Full Page", value: "fullpage" }
        default: "popup"
      - { label: "Sort Order (lower = first)", name: "order", widget: "number", default: 99 }

  - name: "skills"
    label: "🛠️ Skills"
    files:
      - name: "skills"
        label: "Skill Groups"
        file: "content/skills.json"
        fields:
          - label: "Skill Groups"
            name: "items"
            widget: "list"
            fields:
              - { label: "Group Name", name: "group", widget: "string" }
              - label: "Skills"
                name: "items"
                widget: "list"
                field: { label: "Skill", name: "skill", widget: "string" }

  - name: "projects"
    label: "📁 Projects"
    folder: "content/projects"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Short Description (card preview)", name: "shortDesc", widget: "text", required: false }
      - { label: "Full Detail", name: "body", widget: "markdown", required: false }
      - { label: "Year", name: "year", widget: "string", required: false }
      - { label: "Status / Role", name: "status", widget: "string", required: false }
      - label: "Category"
        name: "category"
        widget: "select"
        options:
          - { label: "Research", value: "research" }
          - { label: "Community", value: "community" }
        default: "research"
      - label: "Filter Tags (shown in filter bar)"
        name: "tags"
        widget: "list"
        required: false
        field: { label: "Tag", name: "tag", widget: "string" }
      - { label: "Cover Image", name: "image", widget: "image", required: false }
      - label: "Image Gallery"
        name: "gallery"
        widget: "list"
        required: false
        fields:
          - { label: "Image", name: "src", widget: "image" }
          - { label: "Caption", name: "caption", widget: "string", required: false }
      - { label: "YouTube Video URL", name: "videoUrl", widget: "string", required: false }
      - label: "Downloadable Report"
        name: "report"
        widget: "object"
        required: false
        fields:
          - { label: "PDF File", name: "file", widget: "file", required: false }
          - { label: "Button Label", name: "label", widget: "string", default: "Download Report", required: false }
      - label: "Related Publications"
        name: "relatedPubs"
        widget: "list"
        required: false
        field: { label: "Publication title or DOI", name: "pub", widget: "string" }
      - label: "Display Mode"
        name: "displayMode"
        widget: "select"
        options:
          - { label: "Popup only", value: "popup" }
          - { label: "Popup + Full Page", value: "fullpage" }
        default: "popup"
      - { label: "GitHub / External Link", name: "link", widget: "string", required: false }
      - { label: "Sort Order (lower = first)", name: "order", widget: "number", default: 99 }

  - name: "publications"
    label: "📚 Publications"
    folder: "content/publications"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Authors", name: "authors", widget: "string", required: false }
      - { label: "Year", name: "year", widget: "string", required: false }
      - { label: "Journal / Book", name: "journal", widget: "string", required: false }
      - label: "Status"
        name: "status"
        widget: "select"
        options: ["Published", "Accepted", "Submitted", "Revision Submitted"]
        required: false
      - { label: "DOI / URL", name: "doi", widget: "string", required: false }
      - { label: "Abstract", name: "abstract", widget: "text", required: false }
      - { label: "Detailed Overview", name: "body", widget: "markdown", required: false }
      - { label: "Cover Image", name: "image", widget: "image", required: false }
      - { label: "External Link", name: "link", widget: "string", required: false }
      - label: "Display Mode"
        name: "displayMode"
        widget: "select"
        options:
          - { label: "Popup only", value: "popup" }
          - { label: "Popup + Full Page", value: "fullpage" }
        default: "popup"
      - { label: "Sort Order (lower = first)", name: "order", widget: "number", default: 99 }

  - name: "awards"
    label: "🏆 Grants & Awards"
    folder: "content/awards"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Organisation", name: "org", widget: "string", required: false }
      - { label: "Year", name: "year", widget: "string", required: false }
      - { label: "Sort Order (lower = first)", name: "order", widget: "number", default: 99 }
