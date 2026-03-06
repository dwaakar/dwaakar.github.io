# Diwakar Adhikari — Portfolio Website

## 🗂️ File Structure

```
/
├── index.html                  ← Your website
├── netlify.toml                ← Netlify config
├── generate-manifests.js       ← Build script (don't edit)
├── admin/
│   ├── index.html              ← Admin panel entry
│   └── config.yml              ← CMS field definitions
├── content/
│   ├── settings.json           ← Your name, bio, photo, contact
│   ├── education.json          ← Your degrees
│   ├── skills.json             ← Skill groups
│   ├── projects/               ← One .md file per project
│   ├── publications/           ← One .md file per publication
│   └── awards/                 ← One .md file per award
└── public/
    └── images/                 ← Uploaded images go here
```

---

## 🚀 Setup Instructions (one-time)

### Step 1 — Push to GitHub
1. Go to github.com → New Repository → name it `dwaakar.github.io`
2. Upload ALL files and folders (keep folder structure intact)

### Step 2 — Connect to Netlify
1. Go to netlify.com → Sign up (free) → "Add new site" → "Import from Git"
2. Choose GitHub → select `dwaakar.github.io`
3. Build command: `node generate-manifests.js`
4. Publish directory: `.`
5. Click **Deploy**

### Step 3 — Enable Netlify Identity
1. In Netlify dashboard → **Identity** tab → **Enable Identity**
2. Scroll to **Registration** → set to **Invite Only**
3. Scroll to **Services** → **Git Gateway** → **Enable Git Gateway**
4. Go to **Identity** tab → **Invite users** → enter your email
5. Check your email and accept the invite — set a password

### Step 4 — Connect dwakaradhikari.com.np
1. In Netlify → **Domain settings** → **Add custom domain** → type `dwakaradhikari.com.np`
2. Netlify will show you DNS records to add
3. Go to register.com.np → DNS settings → add those records
4. Wait up to 48 hours for DNS to propagate
5. Netlify will auto-enable HTTPS

---

## ✏️ How to Update Your Website

1. Go to `dwakaradhikari.com.np/admin`
2. Log in with your email and password
3. Use the sidebar to edit:
   - **⚙️ Site Settings** — change bio, photo, contact info
   - **📁 Projects** — add/edit/delete projects with images
   - **📚 Publications** — manage publications
   - **🏆 Grants & Awards** — manage awards
   - **🛠️ Skills** — update skill groups
   - **🎓 Education** — update degrees

All changes save automatically to GitHub and your site updates within ~30 seconds.

---

## 🖼️ Adding Images to Projects

1. In Admin → click a project → click **Cover Image** → Upload
2. Images are stored in `/public/images/`
3. Supported: JPG, PNG, WebP (keep under 2MB for fast loading)
