# ⚡ Quick Checklist - Portfolio Dashboard

Just follow this. Don't overthink.

---

## **BEFORE YOU START**
- [ ] You have GitHub account (username: `tanyasanskriti8868-coder`)
- [ ] You have LeetCode account
- [ ] You have Medium account
- [ ] You're logged into GitHub

---

## **REPO SETUP** (5 mins)

- [ ] Create/open repo: `tanyasanskriti8868-coder/tanyasanskriti8868-coder` (must be Public)
- [ ] Add file `.github/workflows/sync-stats.yml` → paste from file I gave
- [ ] Add file `scripts/update-stats.js` → paste from file I gave
- [ ] Add file `package.json` → paste from file I gave

---

## **SECRETS SETUP** (3 mins)

Go to **Settings → Secrets and variables → Actions**

Copy these exactly:

```
GITHUB_USERNAME = tanyasanskriti8868-coder
LEETCODE_USERNAME = [your LeetCode username]
MEDIUM_USERNAME = [your Medium username]
GITHUB_TOKEN = [generate new at github.com/settings/tokens]
```

---

## **CUSTOMIZATION** (5 mins)

Edit `scripts/update-stats.js`:

Line 3-5: Update your usernames
```javascript
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || 'YOUR_LEETCODE_HERE';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'tanyasanskriti8868-coder';
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME || 'YOUR_MEDIUM_HERE';
```

Search & Replace in the README template section (lines 100-130):
- `https://tanyasanskriti.dev` → YOUR portfolio URL
- `https://linkedin.com/in/tanyasanskriti` → YOUR LinkedIn
- `https://twitter.com/tanyasanskriti` → YOUR Twitter
- Project names and descriptions → YOUR projects

---

## **TEST** (2 mins)

1. Go to **Actions** tab
2. Click **Update Portfolio Stats** on left
3. Click **Run workflow**
4. Wait 1-2 minutes
5. Refresh README — should see live stats!

---

## **THAT'S IT** ✅

Your profile now auto-updates every 12 hours.

---

## **WHAT UPDATES AUTOMATICALLY**

- LeetCode: Problems solved, streak, easy/medium/hard counts
- GitHub: Repos, contributions, followers
- Medium: Latest 3 articles
- Timestamp: When it last updated

**What doesn't auto-update:** Your bio, project descriptions, links. Edit `scripts/update-stats.js` anytime to change those.

---

## **IF SOMETHING BREAKS**

### **Stats showing 0?**
→ Your profiles might be private. Make them public.

### **Workflow failed?**
→ Go to **Actions** → click the red X → scroll down → read the error

### **Secrets wrong?**
→ **Settings** → **Secrets and variables** → verify each one matches exactly

### **Want to run it NOW?**
→ **Actions** → **Update Portfolio Stats** → **Run workflow**

### **Want to change update time?**
→ Edit `.github/workflows/sync-stats.yml`, change the `cron` times

### **Want different colors?**
→ Edit `scripts/update-stats.js`, change the hex colors in the banner line

---

## **FILES YOU CREATED**

```
tanyasanskriti8868-coder/tanyasanskriti8868-coder/
├── .github/workflows/sync-stats.yml
├── scripts/update-stats.js
├── package.json
├── README.md (auto-generated, don't edit directly)
└── (other files...)
```

Only edit:
- `sync-stats.yml` → change update schedule
- `update-stats.js` → change usernames, bio, projects, colors
- **DON'T edit** `README.md` directly (script overwrites it)

---

## **THAT'S LITERALLY IT**

You now have a **live portfolio dashboard** that updates itself.

Go flex on LinkedIn with this. 🔥

---

**Any errors?** Read the Actions tab logs. They tell you exactly what's wrong.

**Want to customize more?** Edit `scripts/update-stats.js` — it's all JavaScript, pretty straightforward.

**Done?** Your GitHub profile is now your portfolio. Ship it.
