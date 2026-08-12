# 🚀 Portfolio Dashboard Setup - Complete Guide

Your automated GitHub profile is about to look fire. Follow these steps exactly.

---

## **STEP 1: Prepare Your GitHub Repository** ⚙️

You need a special repo for your profile to show. It's the repo named after your username.

### Option A: You already have `tanyasanskriti8868-coder/tanyasanskriti8868-coder`
→ Go to Step 2

### Option B: You don't have this repo
1. Go to **github.com**
2. Click **+** → **New Repository**
3. Name it: `tanyasanskriti8868-coder` (MUST match your username exactly)
4. Set to **Public**
5. Check "Add a README file"
6. Click **Create Repository**

---

## **STEP 2: Create Folders & Add Files**

Go to your repo. You'll add two things:

### Create `.github/workflows/` folder:
1. Click **Add file** → **Create new file**
2. Path: `.github/workflows/sync-stats.yml`
3. Copy the ENTIRE content from `sync-stats.yml` file I gave you
4. Commit with message: `chore: add portfolio sync workflow`

### Create `scripts/` folder:
1. Click **Add file** → **Create new file**
2. Path: `scripts/update-stats.js`
3. Copy the ENTIRE content from `update-stats.js` file I gave you
4. Commit with message: `chore: add stats update script`

### Create `package.json` in root:
1. Click **Add file** → **Create new file**
2. Path: `package.json`
3. Paste this:
```json
{
  "name": "portfolio-sync",
  "version": "1.0.0",
  "description": "Auto-sync portfolio stats",
  "main": "scripts/update-stats.js",
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```
4. Commit

---

## **STEP 3: Set GitHub Secrets** 🔐

These store your usernames securely so the script can fetch your data.

1. Go to your repo **Settings** tab
2. Left sidebar → **Secrets and variables** → **Actions**
3. Click **New repository secret**

Add these 4 secrets:

| Secret Name | Value | Where to Find |
|------------|-------|---------------|
| `GITHUB_USERNAME` | `tanyasanskriti8868-coder` | Your GitHub username |
| `LEETCODE_USERNAME` | Your LeetCode username | From leetcode.com profile URL |
| `MEDIUM_USERNAME` | Your Medium username | From medium.com profile URL |
| `GITHUB_TOKEN` | Generate a new one (see below) | GitHub Settings |

### How to Generate `GITHUB_TOKEN`:
1. Go to **github.com/settings/tokens**
2. Click **Generate new token (classic)**
3. Name: `Portfolio Sync`
4. Select scopes: ✅ `repo`, ✅ `read:user`
5. Click **Generate token**
6. **Copy it immediately** (won't show again!)
7. Paste it as the `GITHUB_TOKEN` secret

---

## **STEP 4: Customize Your README**

Open `scripts/update-stats.js` and update these lines with YOUR info:

**Line 1-3:** Update links
```javascript
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || 'tanyasanskriti'; // ← Change to your LeetCode
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'tanyasanskriti8868-coder'; // ✓ Already correct
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME || 'tanyasanskriti'; // ← Change to your Medium
```

**In the README template** (search for these and update):
- Replace all instances of `https://tanyasanskriti.dev` → YOUR portfolio URL
- Replace `https://linkedin.com/in/tanyasanskriti` → YOUR LinkedIn
- Replace `https://twitter.com/tanyasanskriti` → YOUR Twitter
- Update project names/links to match YOUR actual projects
- Update your bio/interests to match YOUR vibe

---

## **STEP 5: Test It!**

1. Go to your repo → **Actions** tab
2. Click **Update Portfolio Stats** workflow on the left
3. Click **Run workflow** → **Run workflow** (blue button)
4. Wait 1-2 minutes
5. Refresh your README — it should now show LIVE stats!

If it fails, check:
- ✅ All secrets are set correctly
- ✅ `package.json` exists
- ✅ File paths are exactly `.github/workflows/sync-stats.yml` and `scripts/update-stats.js`
- ✅ Your LeetCode/GitHub/Medium usernames are accessible (not private)

---

## **HOW TO UPDATE THINGS LATER** 🔄

### **Change Your LeetCode Username:**
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Find `LEETCODE_USERNAME`
3. Click the pencil icon
4. Update value
5. Save

### **Change Your Medium Username:**
Same as above but for `MEDIUM_USERNAME`

### **Edit Your Bio/Projects in README:**
1. Open `scripts/update-stats.js`
2. Find the section with your portfolio links and project descriptions
3. Edit the text directly
4. The script will keep auto-updating stats while keeping your custom text

### **Add More Info to README:**
You can add anything between the markers. Just edit `scripts/update-stats.js` and add HTML/Markdown between the template sections.

### **Change How Often It Updates:**
In `.github/workflows/sync-stats.yml`, find:
```yaml
schedule:
  - cron: '0 0 * * *'  # Daily at midnight UTC
  - cron: '0 12 * * *' # Noon UTC
```

Change the times:
- `'0 0 * * *'` = 00:00 UTC (midnight)
- `'0 12 * * *'` = 12:00 UTC (noon)
- `'0 18 * * *'` = 18:00 UTC (evening)

Cron format: `'minute hour day month day-of-week'`

---

## **Color Customization** 🎨

The README uses dark purple/pink theme. If you want to change colors:

In `scripts/update-stats.js`, find this line:
```javascript
![Tanya's Banner](https://img.shields.io/badge/AI%20·%20ML%20·%20Content%20Creator-232340?style=for-the-badge&labelColor=b91d73)
```

- `232340` = dark purple (background)
- `b91d73` = pink (label)

Replace with your favorite hex colors:
- Purple: `232340`, `663399`, `9370db`
- Pink: `b91d73`, `ff1493`, `ff69b4`
- Other: `1a1a2e`, `0f3460`, `16213e`

---

## **DONE! 🎉**

Your dashboard is now:
✅ Auto-updating LeetCode stats  
✅ Auto-updating GitHub stats  
✅ Auto-updating Medium feed  
✅ Running every 12 hours  
✅ Showing on your profile  

Your GitHub profile is now a **live portfolio** that updates itself. No manual work needed.

---

## **Troubleshooting**

**Stats not updating?**
- Check if workflow ran: **Actions** tab → see if job completed
- Click on the failed job to see error logs
- Verify secrets are set correctly

**Wrong numbers showing?**
- Your profiles might be set to private. Make them public or the API can't read them.

**Want to run it manually?**
- Go to **Actions** → **Update Portfolio Stats** → **Run workflow**

---

**Built with ❤️ for your portfolio. Now go ship! 🚀**
