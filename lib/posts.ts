export type PostType = "build" | "text" | "image" | "video" | "meme";

export interface Post {
  id: string;
  type: PostType;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    id?: string;
  };
  tag: string;
  likes: number;
  forks: number;
  // Code / build posts
  code: string;
  // Media posts
  mediaUrl?: string;
  mediaType?: "image" | "video" | "gif";
  thumbnailUrl?: string;
  // Text posts
  body?: string;
  // Links
  repoUrl?: string;
  deployUrl?: string;
  createdAt?: number; // timestamp in ms
}

export function timeAgo(timestamp?: number): string {
  if (!timestamp) return "recently";
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export const samplePosts: Post[] = [
  {
    id: "crop-price-tracker",
    type: "build",
    title: "Crop Price Tracker",
    description:
      "Live dashboard tracking wheat, rice, and soybean prices with color-coded daily changes.",
    author: {
      name: "Arjun Patel",
      avatar: "AP",
    },
    tag: "HTML",
    likes: 142,
    forks: 38,
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
    code: `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #1a1510 0%, #1e1a12 50%, #1a1510 100%);
    color: #e8e4dd;
    padding: 24px;
    min-height: 100vh;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .header-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #4a7c59, #6b9b5e);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  h1 {
    font-size: 20px;
    font-weight: 700;
    color: #f5f0e8;
  }
  .subtitle {
    font-size: 12px;
    color: #8a8578;
    margin-top: 2px;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .card {
    background: rgba(42, 38, 30, 0.8);
    border: 1px solid rgba(139, 119, 73, 0.15);
    border-radius: 12px;
    padding: 16px;
    transition: all 0.2s;
  }
  .card:hover {
    border-color: rgba(139, 119, 73, 0.3);
    transform: translateY(-1px);
  }
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  .crop-name {
    font-size: 14px;
    font-weight: 600;
    color: #d4c9a8;
  }
  .crop-type {
    font-size: 11px;
    color: #7a7568;
    margin-top: 2px;
  }
  .badge {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
  }
  .badge-up {
    background: rgba(74, 124, 89, 0.2);
    color: #6b9b5e;
  }
  .badge-down {
    background: rgba(180, 80, 60, 0.2);
    color: #c75b39;
  }
  .price {
    font-size: 28px;
    font-weight: 700;
    color: #f5f0e8;
    margin-bottom: 4px;
  }
  .unit {
    font-size: 12px;
    color: #7a7568;
  }
  .bar-container {
    margin-top: 12px;
    height: 4px;
    background: rgba(139, 119, 73, 0.1);
    border-radius: 2px;
    overflow: hidden;
  }
  .bar {
    height: 100%;
    border-radius: 2px;
    transition: width 1s ease;
  }
  .bar-green { background: linear-gradient(90deg, #4a7c59, #6b9b5e); }
  .bar-red { background: linear-gradient(90deg, #b4503c, #c75b39); }
  .bar-amber { background: linear-gradient(90deg, #8b7749, #d4a017); }
  .updated {
    text-align: center;
    font-size: 11px;
    color: #5a5548;
    margin-top: 16px;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="header-icon">🌾</div>
    <div>
      <h1>Crop Price Tracker</h1>
      <div class="subtitle">Mandi prices · Updated today</div>
    </div>
  </div>
  <div class="grid">
    <div class="card">
      <div class="card-top">
        <div>
          <div class="crop-name">Wheat (Gehun)</div>
          <div class="crop-type">Grade A · Punjab</div>
        </div>
        <span class="badge badge-up">▲ 2.4%</span>
      </div>
      <div class="price">₹2,485 <span class="unit">/ quintal</span></div>
      <div class="bar-container"><div class="bar bar-green" style="width: 78%"></div></div>
    </div>
    <div class="card">
      <div class="card-top">
        <div>
          <div class="crop-name">Basmati Rice</div>
          <div class="crop-type">1121 · Haryana</div>
        </div>
        <span class="badge badge-down">▼ 1.1%</span>
      </div>
      <div class="price">₹3,820 <span class="unit">/ quintal</span></div>
      <div class="bar-container"><div class="bar bar-red" style="width: 62%"></div></div>
    </div>
    <div class="card">
      <div class="card-top">
        <div>
          <div class="crop-name">Soybean</div>
          <div class="crop-type">Yellow · Madhya Pradesh</div>
        </div>
        <span class="badge badge-up">▲ 3.7%</span>
      </div>
      <div class="price">₹4,150 <span class="unit">/ quintal</span></div>
      <div class="bar-container"><div class="bar bar-amber" style="width: 85%"></div></div>
    </div>
  </div>
  <div class="updated">Last synced: 4 Mar 2026, 09:30 IST</div>
</body>
</html>`,
  },
  {
    id: "hindi-english-translator",
    type: "build",
    title: "Hindi-English Translator",
    description:
      "A minimal translation widget with common Hindi-English word pairs. Type and translate instantly.",
    author: {
      name: "Meera Sharma",
      avatar: "MS",
    },
    tag: "HTML",
    likes: 97,
    forks: 24,
    createdAt: Date.now() - 5 * 60 * 60 * 1000,
    code: `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #151218 0%, #1a1520 50%, #151218 100%);
    color: #e8e4dd;
    padding: 24px;
    min-height: 100vh;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .header-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #d4a017, #c8952e);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
  h1 { font-size: 20px; font-weight: 700; }
  .subtitle { font-size: 12px; color: #8a8578; margin-top: 2px; }
  .translator-box {
    background: rgba(36, 32, 42, 0.8);
    border: 1px solid rgba(212, 160, 23, 0.12);
    border-radius: 14px;
    padding: 20px;
  }
  .lang-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }
  .lang-tab {
    padding: 6px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid rgba(212, 160, 23, 0.15);
    background: transparent;
    color: #8a8578;
    transition: all 0.2s;
  }
  .lang-tab.active {
    background: rgba(212, 160, 23, 0.15);
    color: #d4a017;
    border-color: rgba(212, 160, 23, 0.3);
  }
  .input-area {
    width: 100%;
    min-height: 80px;
    background: rgba(18, 18, 21, 0.6);
    border: 1px solid rgba(212, 160, 23, 0.08);
    border-radius: 10px;
    padding: 14px;
    color: #e8e4dd;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    resize: none;
    outline: none;
    transition: border-color 0.2s;
  }
  .input-area:focus {
    border-color: rgba(212, 160, 23, 0.3);
  }
  .input-area::placeholder {
    color: #5a5548;
  }
  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
  }
  .translate-btn {
    background: linear-gradient(135deg, #d4a017, #b8860b);
    color: #1a1510;
    border: none;
    padding: 10px 28px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .translate-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(212, 160, 23, 0.3);
  }
  .output-area {
    width: 100%;
    min-height: 80px;
    background: rgba(18, 18, 21, 0.4);
    border: 1px solid rgba(212, 160, 23, 0.06);
    border-radius: 10px;
    padding: 14px;
    font-size: 16px;
    color: #d4a017;
    font-family: 'Noto Sans Devanagari', 'Inter', sans-serif;
  }
  .examples {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .example-chip {
    padding: 5px 12px;
    background: rgba(212, 160, 23, 0.08);
    border: 1px solid rgba(212, 160, 23, 0.1);
    border-radius: 20px;
    font-size: 12px;
    color: #8a8578;
    cursor: pointer;
    transition: all 0.2s;
  }
  .example-chip:hover {
    background: rgba(212, 160, 23, 0.15);
    color: #d4a017;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="header-icon">अ</div>
    <div>
      <h1>Hindi ↔ English</h1>
      <div class="subtitle">Instant translation · Common phrases</div>
    </div>
  </div>
  <div class="translator-box">
    <div class="lang-tabs">
      <div class="lang-tab active" onclick="setDir('en-hi')">English → हिन्दी</div>
      <div class="lang-tab" onclick="setDir('hi-en')">हिन्दी → English</div>
    </div>
    <textarea class="input-area" id="input" placeholder="Type something to translate..."></textarea>
    <div class="divider">
      <button class="translate-btn" onclick="translate()">Translate</button>
    </div>
    <div class="output-area" id="output">Translation will appear here...</div>
    <div class="examples">
      <div class="example-chip" onclick="tryExample('Hello')">Hello</div>
      <div class="example-chip" onclick="tryExample('Thank you')">Thank you</div>
      <div class="example-chip" onclick="tryExample('Good morning')">Good morning</div>
      <div class="example-chip" onclick="tryExample('How are you')">How are you?</div>
      <div class="example-chip" onclick="tryExample('Water')">Water</div>
    </div>
  </div>
  <script>
    let direction = 'en-hi';
    const dict = {
      'hello': 'नमस्ते', 'hi': 'नमस्ते', 'good morning': 'सुप्रभात',
      'good night': 'शुभ रात्रि', 'thank you': 'धन्यवाद', 'thanks': 'धन्यवाद',
      'how are you': 'आप कैसे हैं?', 'what is your name': 'आपका नाम क्या है?',
      'my name is': 'मेरा नाम है', 'water': 'पानी', 'food': 'खाना',
      'home': 'घर', 'school': 'विद्यालय', 'book': 'किताब', 'friend': 'दोस्त',
      'love': 'प्यार', 'india': 'भारत', 'beautiful': 'सुंदर', 'welcome': 'स्वागत',
      'goodbye': 'अलविदा', 'yes': 'हाँ', 'no': 'नहीं', 'please': 'कृपया',
      'sorry': 'माफ़ कीजिए', 'help': 'मदद', 'time': 'समय', 'today': 'आज',
    };
    const reverseDict = {};
    for (const [k, v] of Object.entries(dict)) reverseDict[v] = k;

    function setDir(d) {
      direction = d;
      document.querySelectorAll('.lang-tab').forEach((t, i) => {
        t.classList.toggle('active', (i === 0 && d === 'en-hi') || (i === 1 && d === 'hi-en'));
      });
      document.getElementById('input').placeholder = d === 'en-hi' ? 'Type in English...' : 'हिन्दी में टाइप करें...';
      translate();
    }
    function translate() {
      const input = document.getElementById('input').value.trim().toLowerCase();
      if (!input) { document.getElementById('output').textContent = 'Translation will appear here...'; return; }
      if (direction === 'en-hi') {
        const result = dict[input] || 'Translation not found — try a common word';
        document.getElementById('output').textContent = result;
      } else {
        const result = reverseDict[input] || 'Translation not found — try a common word';
        document.getElementById('output').textContent = result;
      }
    }
    function tryExample(text) {
      document.getElementById('input').value = text;
      translate();
    }
    document.getElementById('input').addEventListener('input', translate);
  </script>
</body>
</html>`,
  },
  {
    id: "expense-calculator",
    type: "build",
    title: "Expense Calculator",
    description:
      "Track daily expenses by category with a running total. Simple, functional, fast.",
    author: {
      name: "Vikram Desai",
      avatar: "VD",
    },
    tag: "HTML",
    likes: 118,
    forks: 45,
    createdAt: Date.now() - 12 * 60 * 60 * 1000,
    code: `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #12131a 0%, #161720 50%, #12131a 100%);
    color: #e8e4dd;
    padding: 24px;
    min-height: 100vh;
  }
  .header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .header-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, #5b7a5e, #4a6b4d);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  h1 { font-size: 20px; font-weight: 700; }
  .subtitle { font-size: 12px; color: #8a8578; margin-top: 2px; }
  .total-card {
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.12), rgba(184, 134, 11, 0.08));
    border: 1px solid rgba(212, 160, 23, 0.2);
    border-radius: 14px;
    padding: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
  .total-label { font-size: 12px; color: #8a8578; text-transform: uppercase; letter-spacing: 1px; }
  .total-amount { font-size: 36px; font-weight: 700; color: #d4a017; margin-top: 4px; }
  .form-row {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }
  .form-row input, .form-row select {
    flex: 1;
    padding: 10px 14px;
    background: rgba(26, 26, 30, 0.8);
    border: 1px solid rgba(212, 160, 23, 0.1);
    border-radius: 10px;
    color: #e8e4dd;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-row input:focus, .form-row select:focus {
    border-color: rgba(212, 160, 23, 0.3);
  }
  .form-row input::placeholder { color: #5a5548; }
  .form-row select option { background: #1a1a1e; }
  .add-btn {
    padding: 10px 20px;
    background: linear-gradient(135deg, #d4a017, #b8860b);
    color: #1a1510;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .add-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(212, 160, 23, 0.3); }
  .expenses-list { display: flex; flex-direction: column; gap: 8px; }
  .expense-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: rgba(30, 30, 34, 0.6);
    border: 1px solid rgba(212, 160, 23, 0.06);
    border-radius: 10px;
    animation: slideIn 0.3s ease;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .expense-left { display: flex; align-items: center; gap: 12px; }
  .cat-dot {
    width: 8px; height: 8px; border-radius: 50%;
  }
  .expense-name { font-size: 14px; font-weight: 500; }
  .expense-cat { font-size: 11px; color: #7a7568; }
  .expense-amount { font-size: 15px; font-weight: 600; color: #c75b39; }
  .empty-state {
    text-align: center;
    padding: 30px;
    color: #5a5548;
    font-size: 13px;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="header-icon">₹</div>
    <div>
      <h1>Expense Calculator</h1>
      <div class="subtitle">Track your daily spending</div>
    </div>
  </div>
  <div class="total-card">
    <div class="total-label">Total Spent</div>
    <div class="total-amount" id="total">₹0</div>
  </div>
  <div class="form-row">
    <input type="text" id="name" placeholder="Expense name" />
    <input type="number" id="amount" placeholder="₹ Amount" />
    <select id="category">
      <option value="food">🍕 Food</option>
      <option value="transport">🚗 Transport</option>
      <option value="shopping">🛍️ Shopping</option>
      <option value="bills">📱 Bills</option>
      <option value="other">📦 Other</option>
    </select>
    <button class="add-btn" onclick="addExpense()">+ Add</button>
  </div>
  <div class="expenses-list" id="list">
    <div class="empty-state">No expenses yet. Add one above!</div>
  </div>
  <script>
    const catColors = { food: '#e07c4f', transport: '#5b7a5e', shopping: '#8b6bbf', bills: '#4a90d9', other: '#8a8578' };
    let expenses = [];
    let total = 0;

    function addExpense() {
      const name = document.getElementById('name').value.trim();
      const amount = parseFloat(document.getElementById('amount').value);
      const category = document.getElementById('category').value;
      if (!name || !amount || amount <= 0) return;

      expenses.push({ name, amount, category });
      total += amount;
      document.getElementById('total').textContent = '₹' + total.toLocaleString('en-IN');
      renderList();
      document.getElementById('name').value = '';
      document.getElementById('amount').value = '';
    }

    function renderList() {
      const list = document.getElementById('list');
      list.innerHTML = expenses.map(e =>
        '<div class="expense-item">' +
          '<div class="expense-left">' +
            '<div class="cat-dot" style="background:' + catColors[e.category] + '"></div>' +
            '<div><div class="expense-name">' + e.name + '</div>' +
            '<div class="expense-cat">' + e.category + '</div></div>' +
          '</div>' +
          '<div class="expense-amount">-₹' + e.amount.toLocaleString('en-IN') + '</div>' +
        '</div>'
      ).reverse().join('');
    }

    // Add sample data
    document.getElementById('name').value = 'Morning chai';
    document.getElementById('amount').value = '30';
    addExpense();
    document.getElementById('name').value = 'Auto rickshaw';
    document.getElementById('amount').value = '85';
    document.getElementById('category').value = 'transport';
    addExpense();
    document.getElementById('name').value = 'Lunch thali';
    document.getElementById('amount').value = '150';
    document.getElementById('category').value = 'food';
    addExpense();
    document.getElementById('category').value = 'food';
  </script>
</body>
</html>`,
  },
  {
    id: "weather-card",
    type: "build",
    title: "Weather Card — Mumbai",
    description:
      "A beautifully designed weather card for Mumbai with current conditions, forecast, and air quality.",
    author: {
      name: "Priya Nair",
      avatar: "PN",
    },
    tag: "HTML",
    likes: 203,
    forks: 67,
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    code: `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #0f1923 0%, #142230 50%, #0f1923 100%);
    color: #e8e4dd;
    padding: 24px;
    min-height: 100vh;
  }
  .weather-card {
    background: linear-gradient(160deg, rgba(20, 45, 70, 0.6), rgba(15, 25, 40, 0.8));
    border: 1px solid rgba(100, 160, 220, 0.12);
    border-radius: 20px;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }
  .weather-card::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -30px;
    width: 160px;
    height: 160px;
    background: radial-gradient(circle, rgba(255, 180, 50, 0.15), transparent 70%);
    border-radius: 50%;
  }
  .location {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
  }
  .location-dot {
    width: 6px; height: 6px;
    background: #4a90d9;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .location-name { font-size: 14px; font-weight: 600; }
  .location-sub { font-size: 11px; color: #6a8aaa; margin-left: auto; }
  .main-temp {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 24px;
  }
  .temp-value {
    font-size: 64px;
    font-weight: 700;
    line-height: 1;
    background: linear-gradient(180deg, #f0e6d3, #c8b898);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .temp-info { padding-top: 8px; }
  .condition { font-size: 16px; font-weight: 600; color: #d4c9a8; }
  .feels-like { font-size: 12px; color: #6a8aaa; margin-top: 4px; }
  .sun-icon { font-size: 48px; margin-left: auto; filter: drop-shadow(0 0 20px rgba(255, 180, 50, 0.3)); }
  .details-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }
  .detail-item {
    background: rgba(15, 25, 40, 0.5);
    border: 1px solid rgba(100, 160, 220, 0.08);
    border-radius: 12px;
    padding: 12px;
    text-align: center;
  }
  .detail-label { font-size: 10px; color: #6a8aaa; text-transform: uppercase; letter-spacing: 0.5px; }
  .detail-value { font-size: 18px; font-weight: 700; margin-top: 4px; color: #d4c9a8; }
  .detail-unit { font-size: 11px; color: #6a8aaa; }
  .forecast {
    display: flex;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid rgba(100, 160, 220, 0.08);
  }
  .forecast-item {
    flex: 1;
    text-align: center;
    padding: 10px 0;
  }
  .forecast-day { font-size: 11px; color: #6a8aaa; margin-bottom: 6px; }
  .forecast-icon { font-size: 20px; margin-bottom: 4px; }
  .forecast-temp { font-size: 13px; font-weight: 600; color: #d4c9a8; }
  .forecast-low { font-size: 11px; color: #5a7a9a; }
  .aqi {
    margin-top: 16px;
    padding: 12px;
    background: rgba(180, 120, 40, 0.1);
    border: 1px solid rgba(180, 120, 40, 0.15);
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .aqi-badge {
    padding: 4px 10px;
    background: rgba(212, 160, 23, 0.2);
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    color: #d4a017;
  }
  .aqi-text { font-size: 12px; color: #8a8578; }
</style>
</head>
<body>
  <div class="weather-card">
    <div class="location">
      <div class="location-dot"></div>
      <span class="location-name">Mumbai, Maharashtra</span>
      <span class="location-sub">4 Mar, 10:30 AM</span>
    </div>
    <div class="main-temp">
      <div class="temp-value">32°</div>
      <div class="temp-info">
        <div class="condition">Partly Cloudy</div>
        <div class="feels-like">Feels like 36° · Humidity 74%</div>
      </div>
      <div class="sun-icon">⛅</div>
    </div>
    <div class="details-grid">
      <div class="detail-item">
        <div class="detail-label">Wind</div>
        <div class="detail-value">14</div>
        <div class="detail-unit">km/h SW</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">UV Index</div>
        <div class="detail-value">7</div>
        <div class="detail-unit">High</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Visibility</div>
        <div class="detail-value">6.2</div>
        <div class="detail-unit">km</div>
      </div>
    </div>
    <div class="forecast">
      <div class="forecast-item">
        <div class="forecast-day">WED</div>
        <div class="forecast-icon">🌤️</div>
        <div class="forecast-temp">33°</div>
        <div class="forecast-low">26°</div>
      </div>
      <div class="forecast-item">
        <div class="forecast-day">THU</div>
        <div class="forecast-icon">☀️</div>
        <div class="forecast-temp">34°</div>
        <div class="forecast-low">27°</div>
      </div>
      <div class="forecast-item">
        <div class="forecast-day">FRI</div>
        <div class="forecast-icon">⛅</div>
        <div class="forecast-temp">31°</div>
        <div class="forecast-low">25°</div>
      </div>
      <div class="forecast-item">
        <div class="forecast-day">SAT</div>
        <div class="forecast-icon">🌧️</div>
        <div class="forecast-temp">29°</div>
        <div class="forecast-low">24°</div>
      </div>
      <div class="forecast-item">
        <div class="forecast-day">SUN</div>
        <div class="forecast-icon">⛈️</div>
        <div class="forecast-temp">28°</div>
        <div class="forecast-low">23°</div>
      </div>
    </div>
    <div class="aqi">
      <div class="aqi-badge">AQI 128</div>
      <div class="aqi-text">Moderate — Sensitive groups should limit outdoor activity</div>
    </div>
  </div>
</body>
</html>`,
  },
  {
    id: "pomodoro-timer",
    type: "build",
    title: "Pomodoro Timer",
    description:
      "A minimal focus timer with 25-minute work sessions and visual progress ring. Click to start, click again to pause.",
    author: {
      name: "Sanya Gupta",
      avatar: "SG",
    },
    tag: "JavaScript",
    likes: 97,
    forks: 24,
    createdAt: Date.now() - 3 * 60 * 60 * 1000,
    code: `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #fef9f0 0%, #fdf6e9 100%);
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; color: #292524;
  }
  .container { text-align: center; }
  .ring-wrapper { position: relative; width: 220px; height: 220px; margin: 0 auto 24px; }
  svg { transform: rotate(-90deg); }
  .bg-ring { fill: none; stroke: #e7e5e4; stroke-width: 8; }
  .progress-ring { fill: none; stroke: url(#grad); stroke-width: 8; stroke-linecap: round; transition: stroke-dashoffset 1s linear; }
  .time { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 42px; font-weight: 700; font-variant-numeric: tabular-nums; }
  .label { font-size: 13px; color: #a8a29e; margin-bottom: 24px; font-weight: 500; }
  .btn { padding: 12px 36px; border-radius: 12px; border: none; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .start { background: linear-gradient(135deg, #d97706, #b45309); color: white; }
  .start:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(217,119,6,0.3); }
  .pause { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
  .reset { margin-left: 8px; padding: 12px 20px; border-radius: 12px; border: 1px solid #e7e5e4; background: white; font-family: inherit; font-size: 14px; font-weight: 500; color: #78716c; cursor: pointer; }
  .reset:hover { border-color: #d6d3d1; color: #44403c; }
  .sessions { margin-top: 20px; font-size: 12px; color: #a8a29e; }
  .sessions span { color: #d97706; font-weight: 600; }
</style>
</head>
<body>
  <div class="container">
    <div class="ring-wrapper">
      <svg width="220" height="220">
        <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#d97706"/><stop offset="100%" style="stop-color:#b45309"/></linearGradient></defs>
        <circle class="bg-ring" cx="110" cy="110" r="100"/>
        <circle class="progress-ring" id="progress" cx="110" cy="110" r="100" stroke-dasharray="628.32" stroke-dashoffset="0"/>
      </svg>
      <div class="time" id="display">25:00</div>
    </div>
    <div class="label" id="phase">Focus Time</div>
    <div>
      <button class="btn start" id="toggleBtn" onclick="toggle()">Start</button>
      <button class="reset" onclick="resetTimer()">Reset</button>
    </div>
    <div class="sessions">Sessions completed: <span id="count">0</span></div>
  </div>
  <script>
    let total=1500, remaining=1500, running=false, interval=null, sessions=0;
    const ring=document.getElementById('progress'), display=document.getElementById('display'), btn=document.getElementById('toggleBtn'), countEl=document.getElementById('count'), phase=document.getElementById('phase');
    const C=628.32;
    function update(){
      let m=Math.floor(remaining/60), s=remaining%60;
      display.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
      ring.style.strokeDashoffset=C*(1-remaining/total);
    }
    function toggle(){
      if(running){running=false;clearInterval(interval);btn.textContent='Resume';btn.className='btn start';}
      else{running=true;btn.textContent='Pause';btn.className='btn pause';interval=setInterval(()=>{remaining--;if(remaining<=0){clearInterval(interval);running=false;sessions++;countEl.textContent=sessions;remaining=300;total=300;phase.textContent='Break Time';btn.textContent='Start Break';btn.className='btn start';}update();},1000);}
    }
    function resetTimer(){clearInterval(interval);running=false;total=1500;remaining=1500;phase.textContent='Focus Time';btn.textContent='Start';btn.className='btn start';update();}
    update();
  </script>
</body>
</html>`,
  },
  {
    id: "color-palette-gen",
    type: "build",
    title: "Color Palette Generator",
    description:
      "Generate harmonious color palettes with one click. Copy any color's hex code instantly.",
    author: {
      name: "Meera Krishnan",
      avatar: "MK",
    },
    tag: "JavaScript",
    likes: 118,
    forks: 45,
    createdAt: Date.now() - 8 * 60 * 60 * 1000,
    code: `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', sans-serif;
    background: #fafaf9;
    min-height: 100vh;
    padding: 32px 24px;
    color: #292524;
  }
  .header { text-align: center; margin-bottom: 32px; }
  h1 { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
  .sub { font-size: 13px; color: #a8a29e; }
  .palette { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; max-width: 600px; margin: 0 auto 24px; }
  .swatch {
    width: 100px; height: 120px; border-radius: 16px; cursor: pointer; position: relative;
    transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .swatch:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
  .hex {
    position: absolute; bottom: 0; left: 0; right: 0; text-align: center;
    padding: 8px; font-size: 11px; font-weight: 600; color: white; letter-spacing: 0.5px;
    background: rgba(0,0,0,0.2); border-radius: 0 0 16px 16px; backdrop-filter: blur(4px);
  }
  .copied-toast {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    background: white; color: #292524; padding: 4px 12px; border-radius: 8px;
    font-size: 11px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    opacity: 0; transition: opacity 0.2s;
  }
  .copied-toast.show { opacity: 1; }
  .actions { text-align: center; }
  .gen-btn {
    padding: 12px 32px; border-radius: 12px; border: none;
    background: linear-gradient(135deg, #d97706, #b45309); color: white;
    font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;
  }
  .gen-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(217,119,6,0.3); }
  .mode-toggle {
    margin-top: 12px; display: flex; gap: 8px; justify-content: center;
  }
  .mode-btn {
    padding: 6px 16px; border-radius: 8px; border: 1px solid #e7e5e4; background: white;
    font-family: inherit; font-size: 12px; font-weight: 500; color: #78716c; cursor: pointer;
  }
  .mode-btn.active { background: #fef3c7; border-color: #fcd34d; color: #92400e; }
</style>
</head>
<body>
  <div class="header">
    <h1>🎨 Color Palette</h1>
    <p class="sub">Click any swatch to copy its hex code</p>
  </div>
  <div class="palette" id="palette"></div>
  <div class="actions">
    <button class="gen-btn" onclick="generate()">Generate New Palette</button>
    <div class="mode-toggle">
      <button class="mode-btn active" onclick="setMode('vibrant',this)">Vibrant</button>
      <button class="mode-btn" onclick="setMode('pastel',this)">Pastel</button>
      <button class="mode-btn" onclick="setMode('earth',this)">Earthy</button>
    </div>
  </div>
  <script>
    let mode='vibrant';
    function hsl2hex(h,s,l){l/=100;const a=s*Math.min(l,1-l)/100;const f=n=>{const k=(n+h/30)%12;const c=l-a*Math.max(Math.min(k-3,9-k,1),-1);return Math.round(255*c).toString(16).padStart(2,'0');};return'#'+f(0)+f(8)+f(4);}
    function genColor(){
      if(mode==='pastel') return hsl2hex(Math.random()*360, 40+Math.random()*30, 75+Math.random()*15);
      if(mode==='earth') return hsl2hex(20+Math.random()*40, 30+Math.random()*40, 35+Math.random()*35);
      return hsl2hex(Math.random()*360, 60+Math.random()*35, 45+Math.random()*25);
    }
    function generate(){
      const base=Math.random()*360;
      const p=document.getElementById('palette');
      p.innerHTML='';
      for(let i=0;i<5;i++){
        const hex=mode==='vibrant'?hsl2hex((base+i*72)%360,65+Math.random()*25,50+Math.random()*15):genColor();
        const d=document.createElement('div');
        d.className='swatch';
        d.style.background=hex;
        d.innerHTML='<div class="hex">'+hex.toUpperCase()+'</div><div class="copied-toast" id="t'+i+'">Copied!</div>';
        d.onclick=function(){navigator.clipboard.writeText(hex.toUpperCase());const t=document.getElementById('t'+i);t.classList.add('show');setTimeout(()=>t.classList.remove('show'),800);};
        p.appendChild(d);
      }
    }
    function setMode(m,el){mode=m;document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));el.classList.add('active');generate();}
    generate();
  </script>
</body>
</html>`,
  },
  // --- Media posts ---
  {
    id: "meme-css-is-awesome",
    type: "meme",
    title: "CSS Is Awesome",
    description: "When overflow: hidden is life. The eternal frontend struggle.",
    author: { name: "Rahul Dev", avatar: "RD" },
    tag: "Meme",
    likes: 534,
    forks: 12,
    code: "",
    mediaUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    mediaType: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=320&h=180&fit=crop",
    createdAt: Date.now() - 30 * 60 * 1000,
  },
  {
    id: "video-react-in-5-min",
    type: "video",
    title: "React Hooks Explained in 5 Minutes",
    description: "Quick visual breakdown of useState, useEffect, and useRef. No fluff, just code.",
    author: { name: "Kavya Iyer", avatar: "KI" },
    tag: "Video",
    likes: 312,
    forks: 5,
    code: "",
    mediaUrl: "https://www.youtube.com/embed/dpw9EHDh2bM",
    mediaType: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=320&h=180&fit=crop",
    createdAt: Date.now() - 4 * 60 * 60 * 1000,
  },
  {
    id: "text-why-i-love-rust",
    type: "text",
    title: "Why I Switched From TypeScript to Rust for Backend",
    description: "After 3 years of Node.js, I moved our API layer to Rust. Here's what happened.",
    author: { name: "Aditya Rao", avatar: "AR" },
    tag: "Text",
    likes: 189,
    forks: 0,
    code: "",
    body: "I've been writing TypeScript for 3 years straight. Express, Fastify, tRPC — I've used them all. But last quarter I rewrote our main API in Rust with Axum, and the results shocked me:\n\n**Performance:** 40ms avg response → 2ms. Not a typo.\n**Memory:** 512MB → 18MB for the same workload.\n**Reliability:** Zero crashes in 3 months of production.\n\nThe learning curve was steep — the borrow checker humbled me for weeks. But once it clicked, I realized Rust wasn't fighting me. It was protecting me.\n\nThe best part? Our AWS bill dropped 73%.\n\nWould I recommend Rust for everyone? No. For a quick MVP, TypeScript is still king. But for anything touching production at scale, Rust is now my default.\n\nWhat's your experience? Drop your thoughts below.",
    createdAt: Date.now() - 6 * 60 * 60 * 1000,
  },
  {
    id: "image-desk-setup",
    type: "image",
    title: "My WFH Dev Setup — 2026 Edition",
    description: "Finally happy with the cable management. Dual ultrawide + standing desk.",
    author: { name: "Neha Verma", avatar: "NV" },
    tag: "Image",
    likes: 421,
    forks: 3,
    code: "",
    mediaUrl: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&h=500&fit=crop",
    mediaType: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=320&h=180&fit=crop",
    createdAt: Date.now() - 18 * 60 * 60 * 1000,
  },
  {
    id: "meme-git-push-force",
    type: "meme",
    title: "git push --force on a Friday",
    description: "Living dangerously. What could go wrong?",
    author: { name: "Deepak Joshi", avatar: "DJ" },
    tag: "Meme",
    likes: 876,
    forks: 24,
    code: "",
    mediaUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop",
    mediaType: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=320&h=180&fit=crop",
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: "video-tailwind-tricks",
    type: "video",
    title: "5 Tailwind CSS Tricks You Didn't Know",
    description: "Advanced utility patterns that will level up your UI game. Includes animated gradients.",
    author: { name: "Shreya Kapoor", avatar: "SK" },
    tag: "Video",
    likes: 245,
    forks: 8,
    code: "",
    mediaUrl: "https://www.youtube.com/embed/aSlK3GhRuXA",
    mediaType: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=320&h=180&fit=crop",
    createdAt: Date.now() - 10 * 60 * 60 * 1000,
  },
  {
    id: "image-sunset-hackathon",
    type: "image",
    title: "Sunset Over the Hackathon Venue",
    description: "Golden hour at the hackathon. 12 hours in, still going strong.",
    author: { name: "Priya Sharma", avatar: "PS" },
    tag: "Image",
    likes: 367,
    forks: 2,
    code: "",
    mediaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    mediaType: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
    createdAt: Date.now() - 12 * 60 * 60 * 1000,
  },
  {
    id: "image-mech-keyboard",
    type: "image",
    title: "Mechanical Keyboard Collection",
    description: "My custom keycap collection. Each one tells a story.",
    author: { name: "Vikram Singh", avatar: "VS" },
    tag: "Image",
    likes: 298,
    forks: 1,
    code: "",
    mediaUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=600&fit=crop",
    mediaType: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=300&fit=crop",
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
  },
  {
    id: "image-neon-code",
    type: "image",
    title: "Late Night Code & Neon Lights",
    description: "When the code flows better after midnight.",
    author: { name: "Ankit Mehta", avatar: "AM" },
    tag: "Image",
    likes: 512,
    forks: 7,
    code: "",
    mediaUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&h=600&fit=crop",
    mediaType: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=400&h=300&fit=crop",
    createdAt: Date.now() - 3 * 60 * 60 * 1000,
  },
  {
    id: "image-server-room",
    type: "image",
    title: "Server Room Aesthetic",
    description: "There's something beautiful about rows of blinking lights.",
    author: { name: "Lakshmi Nair", avatar: "LN" },
    tag: "Image",
    likes: 445,
    forks: 5,
    code: "",
    mediaUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    mediaType: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    createdAt: Date.now() - 15 * 60 * 60 * 1000,
  },
];
