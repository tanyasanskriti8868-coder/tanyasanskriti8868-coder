const fs = require('fs');
const https = require('https');

const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || 'your_leetcode_username';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'tanyasanskriti8868-coder';
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME || 'your_medium_username';

// Fetch LeetCode Stats
async function fetchLeetCodeStats() {
  return new Promise((resolve) => {
    const query = `
      query {
        matchedUser(username: "${LEETCODE_USERNAME}") {
          profile {
            realName
            userAvatar
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          streak {
            currentStreak
          }
        }
      }
    `;

    const options = {
      hostname: 'leetcode.com',
      path: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.data?.matchedUser?.submitStatsGlobal) {
            const stats = result.data.matchedUser.submitStatsGlobal.acSubmissionNum;
            const easy = stats.find(s => s.difficulty === 'Easy')?.count || 0;
            const medium = stats.find(s => s.difficulty === 'Medium')?.count || 0;
            const hard = stats.find(s => s.difficulty === 'Hard')?.count || 0;
            
            resolve({
              total: easy + medium + hard,
              easy,
              medium,
              hard,
              streak: result.data.matchedUser.streak?.currentStreak || 0,
            });
          } else {
            resolve({ total: 0, easy: 0, medium: 0, hard: 0, streak: 0 });
          }
        } catch (e) {
          console.error('LeetCode fetch error:', e);
          resolve({ total: 0, easy: 0, medium: 0, hard: 0, streak: 0 });
        }
      });
    });

    req.on('error', () => resolve({ total: 0, easy: 0, medium: 0, hard: 0, streak: 0 }));
    req.write(JSON.stringify({ query }));
    req.end();
  });
}

// Fetch GitHub Stats
async function fetchGitHubStats() {
  return new Promise((resolve) => {
    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
          followers {
            totalCount
          }
          following {
            totalCount
          }
        }
      }
    `;

    const options = {
      hostname: 'api.github.com',
      path: '/graphql',
      method: 'POST',
      headers: {
        'Authorization': `bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-Sync',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.data?.user) {
            resolve({
              repos: result.data.user.repositories.totalCount,
              contributions: result.data.user.contributionsCollection.contributionCalendar.totalContributions,
              followers: result.data.user.followers.totalCount,
              following: result.data.user.following.totalCount,
            });
          } else {
            resolve({ repos: 0, contributions: 0, followers: 0, following: 0 });
          }
        } catch (e) {
          console.error('GitHub fetch error:', e);
          resolve({ repos: 0, contributions: 0, followers: 0, following: 0 });
        }
      });
    });

    req.on('error', () => resolve({ repos: 0, contributions: 0, followers: 0, following: 0 }));
    req.write(JSON.stringify({ query }));
    req.end();
  });
}

// Fetch Medium Articles
async function fetchMediumStats() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.rss2json.com',
      path: `/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.items) {
            resolve({
              articles: result.items.length,
              recentArticles: result.items.slice(0, 3).map(item => ({
                title: item.title,
                link: item.link,
                date: new Date(item.pubDate).toLocaleDateString(),
              })),
            });
          } else {
            resolve({ articles: 0, recentArticles: [] });
          }
        } catch (e) {
          console.error('Medium fetch error:', e);
          resolve({ articles: 0, recentArticles: [] });
        }
      });
    });

    req.on('error', () => resolve({ articles: 0, recentArticles: [] }));
    req.end();
  });
}

// Generate README content
async function generateReadme() {
  const [leetcode, github, medium] = await Promise.all([
    fetchLeetCodeStats(),
    fetchGitHubStats(),
    fetchMediumStats(),
  ]);

  const fireEmoji = leetcode.streak > 0 ? '🔥' : '⏳';
  const timestamp = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return `<div align="center">

![Tanya's Banner](https://img.shields.io/badge/AI%20·%20ML%20·%20Content%20Creator-232340?style=for-the-badge&labelColor=b91d73)

### 👋 Hey, I'm **Tanya Sanskriti**

**B.Tech AI/ML @ Sanskriti University** | **Building in Code** | **Thinking in Systems**

[Portfolio](https://tanyasanskriti.dev) · [LinkedIn](https://linkedin.com/in/tanyasanskriti) · [Twitter](https://twitter.com/tanyasanskriti) · [Medium](https://medium.com/@tanyasanskriti) · [LeetCode](https://leetcode.com/${LEETCODE_USERNAME})

</div>

---

## 📊 **Live Stats** *(Updated Daily)*

<div align="center">

| Metric | Count |
|--------|-------|
| 🟢 **LeetCode Problems** | **${leetcode.total}** |
| 🔴 Easy / 🟡 Medium / 🟠 Hard | ${leetcode.easy} / ${leetcode.medium} / ${leetcode.hard} |
| ${fireEmoji} **Current Streak** | **${leetcode.streak} days** |
| ⭐ **GitHub Repos** | **${github.repos}** |
| 💚 **GitHub Contributions** | **${github.contributions}** |
| 📝 **Medium Articles** | **${medium.articles}** |
| 👥 **GitHub Followers** | **${github.followers}** |

</div>

---

## 🏆 **Achievements**

- ✨ **1st Prize** - WebForge 2026 @ Manipal (DeskGuard UI/UX)
- 🥇 **NCC Gold Medal** - 11 UP Battalion NCC Mathura
- 📚 **CGPA: 9.34** - B.Tech AI/ML (Semester 1)
- 🎯 **Hackathon Warrior** - PSB Cybersecurity Challenge, Multiple Competitions

---

## 🚀 **Featured Projects**

### **Arcanova AI** - AI Storytelling Assistant
Streamlit app with Qwen 2.5 + Kokoro TTS. Generates immersive audio stories.  
[Repo](https://github.com/tanyasanskriti8868-coder/arcanova-ai)

### **Apni Bhaadas Nikalo** - Multilingual Voice Companion
Claude AI + Rumik Silk voice API. Emotion-aware AI therapist with Priya persona.  
[Repo](https://github.com/tanyasanskriti8868-coder/apni-bhaadas-nikalo)

### **CosmosVerse** - 3D Space Explorer
Interactive 3D universe using Three.js + NASA APOD + Claude API.  
[Repo](https://github.com/tanyasanskriti8868-coder/cosmosverse)

---

## 💻 **Tech Stack**

\`\`\`
Languages: Python, JavaScript, SQL
ML/AI: PyTorch, Hugging Face, Claude API, Qwen, Streamlit
Frontend: Next.js 14, React, Tailwind, Three.js
Backend: Node.js, FastAPI, Google Colab
Tools: Git, GitHub, VS Code, Jupyter
\`\`\`

---

## 📱 **Recent Medium Articles**

${medium.recentArticles.length > 0 ? medium.recentArticles.map((article, i) => 
  `${i + 1}. [${article.title}](${article.link}) — *${article.date}*`
).join('\n') : '📝 Check out my Medium for the latest thoughts on AI, coding, and building!'}

---

## 🎓 **Interests**

- 🤖 AI Orchestration & Large Language Models
- 🎬 AI for Creative Applications (Storytelling, Voice, Video)
- 💡 India-Specific AI Solutions
- 🎨 Building Durable Products & Personal Brand
- 📊 Competitive Programming & Problem-Solving

---

<div align="center">

**Last Updated:** ${timestamp}  
Built with ❤️ and automated with 🤖 GitHub Actions

</div>
`;
}

// Main execution
generateReadme().then(content => {
  fs.writeFileSync('README.md', content);
  console.log('✅ README updated successfully!');
});
