backend:
  name: git-gateway
  branch: main

media_folder: "public/images"
public_folder: "/images"

collections:

  - name: "settings"
    label: "⚙️ Site Settings"
    files:
      - name: "general"
        label: "Personal Info & Bio"
        file: "content/settings.json"
        fields:
          - { label: "Full Name", name: "name", widget: "string" }
          - { label: "Email", name: "email", widget: "string" }
          - { label: "Phone", name: "phone", widget: "string" }
          - { label: "Location", name: "location", widget: "string" }
          - { label: "GitHub URL", name: "github", widget: "string", required: false }
          - { label: "LinkedIn URL", name: "linkedin", widget: "string", required: false }
          - { label: "Profile Photo", name: "photo", widget: "image", required: false }
          - { label: "Bio", name: "bio", widget: "text" }
          - label: "Typing Taglines"
            name: "taglines"
            widget: "list"
            field: { label: "Tagline", name: "tagline", widget: "string" }
          - label: "Research Interests"
            name: "researchInterests"
            widget: "list"
            field: { label: "Interest", name: "interest", widget: "string" }

  - name: "education"
    label: "🎓 Education"
    files:
      - name: "education"
        label: "Education"
        file: "content/education.json"
        fields:
          - label: "Degrees"
            name: "items"
            widget: "list"
            fields:
              - { label: "Degree", name: "degree", widget: "string" }
              - { label: "Institution", name: "institution", widget: "string" }
              - { label: "Year", name: "year", widget: "string" }
              - { label: "Details", name: "detail", widget: "text" }

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
      - { label: "Short Description (card preview)", name: "shortDesc", widget: "text" }
      - { label: "Full Detail (shown in popup and page)", name: "detail", widget: "markdown" }
      - { label: "Year", name: "year", widget: "string" }
      - { label: "Status / Role", name: "status", widget: "string" }
      - label: "Tags"
        name: "tags"
        widget: "list"
        field: { label: "Tag", name: "tag", widget: "string" }
      - { label: "Cover Image", name: "image", widget: "image", required: false }
      - label: "Image Gallery"
        name: "gallery"
        widget: "list"
        required: false
        fields:
          - { label: "Image", name: "src", widget: "image" }
          - { label: "Caption (optional)", name: "caption", widget: "string", required: false }
      - { label: "YouTube Video URL (optional)", name: "videoUrl", widget: "string", required: false, hint: "e.g. https://www.youtube.com/watch?v=..." }
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
        hint: "Choose whether clicking a project opens a popup only, or also offers a full dedicated page."
      - { label: "GitHub / External Link", name: "link", widget: "string", required: false }
      - { label: "Sort Order (lower = first)", name: "order", widget: "number", default: 99 }

  - name: "publications"
    label: "📚 Publications"
    folder: "content/publications"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Authors", name: "authors", widget: "string" }
      - { label: "Year", name: "year", widget: "string", required: false }
      - { label: "Journal / Book", name: "journal", widget: "string" }
      - label: "Status"
        name: "status"
        widget: "select"
        options: ["Published", "Accepted", "Submitted", "Revision Submitted"]
      - { label: "DOI / URL", name: "doi", widget: "string", required: false }
      - { label: "Sort Order (lower = first)", name: "order", widget: "number", default: 99 }

  - name: "awards"
    label: "🏆 Grants & Awards"
    folder: "content/awards"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Organisation", name: "org", widget: "string" }
      - { label: "Year", name: "year", widget: "string" }
      - { label: "Sort Order (lower = first)", name: "order", widget: "number", default: 99 }
