"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Loader2, Sparkles, X, ArrowRight } from "lucide-react";

interface PromptBarProps {
  onGenerate: (code: string) => void;
}

// Suggestion chips — bilingual
const suggestions = [
  { label: "टू-डू लिस्ट", prompt: "a simple todo list app with add and delete" },
  { label: "Calculator", prompt: "a basic calculator with buttons" },
  { label: "मौसम कार्ड", prompt: "a weather card for Delhi with temperature and forecast" },
  { label: "Timer", prompt: "a countdown timer with start pause reset" },
  { label: "Color Palette", prompt: "a color palette generator with copy hex codes" },
  { label: "नोट लिखो", prompt: "a sticky notes app where I can add and delete notes" },
];

// Simulated AI: keyword-driven code generator
function generateCode(prompt: string): string {
  const p = prompt.toLowerCase();

  if (p.includes("todo") || p.includes("टू-डू") || p.includes("task") || p.includes("काम")) {
    return `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Noto Sans Devanagari', 'Inter', sans-serif; background: linear-gradient(135deg,#1a1a1e,#1e1a12); color: #e8e4dd; padding: 24px; min-height: 100vh; }
  h1 { font-size: 22px; font-weight: 700; margin-bottom: 16px; color: #d4a017; }
  .input-row { display: flex; gap: 8px; margin-bottom: 20px; }
  input { flex:1; padding: 10px 14px; background: rgba(26,26,30,0.8); border: 1px solid rgba(212,160,23,0.12); border-radius: 10px; color: #e8e4dd; font-size: 14px; font-family: inherit; outline: none; }
  input:focus { border-color: rgba(212,160,23,0.3); }
  input::placeholder { color: #5a5548; }
  .add-btn { padding: 10px 20px; background: linear-gradient(135deg,#d4a017,#b8860b); color: #1a1510; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; font-family: inherit; }
  .add-btn:hover { opacity: 0.9; }
  .list { display: flex; flex-direction: column; gap: 8px; }
  .item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: rgba(30,30,34,0.6); border: 1px solid rgba(212,160,23,0.06); border-radius: 10px; }
  .item.done .text { text-decoration: line-through; color: #5a5548; }
  .check { width: 20px; height: 20px; border-radius: 6px; border: 2px solid rgba(212,160,23,0.3); cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .check.checked { background: #d4a017; border-color: #d4a017; }
  .check.checked::after { content: '✓'; color: #1a1510; font-size: 12px; font-weight: 700; }
  .text { flex: 1; font-size: 14px; }
  .del { background: none; border: none; color: #5a5548; cursor: pointer; font-size: 16px; padding: 4px 8px; border-radius: 6px; }
  .del:hover { color: #c75b39; background: rgba(199,91,57,0.1); }
  .empty { text-align: center; color: #5a5548; padding: 30px; font-size: 13px; }
</style>
</head>
<body>
  <h1>📝 कार्य सूची — To-Do List</h1>
  <div class="input-row">
    <input id="inp" placeholder="नया काम जोड़ें / Add a task..." />
    <button class="add-btn" onclick="add()">जोड़ें</button>
  </div>
  <div class="list" id="list"><div class="empty">कोई काम नहीं — Add your first task!</div></div>
  <script>
    let todos = [];
    const inp = document.getElementById('inp');
    inp.addEventListener('keydown', e => { if(e.key==='Enter') add(); });
    function add() {
      const t = inp.value.trim(); if(!t) return;
      todos.push({text:t, done:false});
      inp.value = '';
      render();
    }
    function toggle(i) { todos[i].done = !todos[i].done; render(); }
    function del(i) { todos.splice(i,1); render(); }
    function render() {
      const list = document.getElementById('list');
      if(!todos.length) { list.innerHTML = '<div class="empty">कोई काम नहीं — Add your first task!</div>'; return; }
      list.innerHTML = todos.map((t,i) =>
        '<div class="item'+(t.done?' done':'')+'">'+
          '<div class="check'+(t.done?' checked':'')+'" onclick="toggle('+i+')"></div>'+
          '<span class="text">'+t.text+'</span>'+
          '<button class="del" onclick="del('+i+')">✕</button>'+
        '</div>'
      ).join('');
    }
  </script>
</body>
</html>`;
  }

  if (p.includes("calc") || p.includes("कैलकु") || p.includes("गणक") || p.includes("जोड़") || p.includes("calculator")) {
    return `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: linear-gradient(135deg,#12131a,#161720); color: #e8e4dd; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
  .calc { background: rgba(26,26,30,0.9); border: 1px solid rgba(212,160,23,0.12); border-radius: 20px; padding: 20px; width: 280px; }
  .display { background: rgba(18,18,21,0.6); border: 1px solid rgba(212,160,23,0.08); border-radius: 12px; padding: 16px; margin-bottom: 16px; text-align: right; min-height: 70px; display: flex; flex-direction: column; justify-content: flex-end; }
  .expr { font-size: 13px; color: #5a5548; margin-bottom: 4px; min-height: 18px; }
  .result { font-size: 32px; font-weight: 700; color: #d4a017; }
  .grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; }
  .btn { padding: 14px; border: none; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.15s; font-family: 'Inter'; }
  .btn:hover { transform: translateY(-1px); }
  .num { background: rgba(42,42,46,0.8); color: #e8e4dd; }
  .num:hover { background: rgba(52,52,56,0.9); }
  .op { background: rgba(212,160,23,0.15); color: #d4a017; }
  .op:hover { background: rgba(212,160,23,0.25); }
  .eq { background: linear-gradient(135deg,#d4a017,#b8860b); color: #1a1510; }
  .eq:hover { box-shadow: 0 4px 15px rgba(212,160,23,0.3); }
  .clear { background: rgba(199,91,57,0.15); color: #c75b39; }
  .clear:hover { background: rgba(199,91,57,0.25); }
</style>
</head>
<body>
  <div class="calc">
    <div class="display">
      <div class="expr" id="expr"></div>
      <div class="result" id="result">0</div>
    </div>
    <div class="grid">
      <button class="btn clear" onclick="cl()">AC</button>
      <button class="btn clear" onclick="back()">⌫</button>
      <button class="btn op" onclick="ap('%')">%</button>
      <button class="btn op" onclick="ap('/')">÷</button>
      <button class="btn num" onclick="ap('7')">7</button>
      <button class="btn num" onclick="ap('8')">8</button>
      <button class="btn num" onclick="ap('9')">9</button>
      <button class="btn op" onclick="ap('*')">×</button>
      <button class="btn num" onclick="ap('4')">4</button>
      <button class="btn num" onclick="ap('5')">5</button>
      <button class="btn num" onclick="ap('6')">6</button>
      <button class="btn op" onclick="ap('-')">−</button>
      <button class="btn num" onclick="ap('1')">1</button>
      <button class="btn num" onclick="ap('2')">2</button>
      <button class="btn num" onclick="ap('3')">3</button>
      <button class="btn op" onclick="ap('+')">+</button>
      <button class="btn num" onclick="ap('00')">00</button>
      <button class="btn num" onclick="ap('0')">0</button>
      <button class="btn num" onclick="ap('.')">.</button>
      <button class="btn eq" onclick="ev()">=</button>
    </div>
  </div>
  <script>
    let expr='';
    function ap(v){expr+=v;document.getElementById('expr').textContent=expr;try{document.getElementById('result').textContent=eval(expr)}catch(e){}}
    function cl(){expr='';document.getElementById('expr').textContent='';document.getElementById('result').textContent='0';}
    function back(){expr=expr.slice(0,-1);document.getElementById('expr').textContent=expr;if(!expr){document.getElementById('result').textContent='0';return;}try{document.getElementById('result').textContent=eval(expr)}catch(e){}}
    function ev(){try{const r=eval(expr);document.getElementById('result').textContent=r;expr=String(r);document.getElementById('expr').textContent='';}catch(e){document.getElementById('result').textContent='Error';}}
  </script>
</body>
</html>`;
  }

  if (p.includes("weather") || p.includes("मौसम") || p.includes("तापमान") || p.includes("temperature")) {
    const city = p.includes("delhi") || p.includes("दिल्ली") ? "Delhi" : p.includes("mumbai") || p.includes("मुंबई") ? "Mumbai" : p.includes("bangalore") || p.includes("बेंगलुरु") ? "Bangalore" : "Delhi";
    const temp = city === "Delhi" ? "28" : city === "Mumbai" ? "32" : "24";
    return `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Noto Sans Devanagari', 'Inter', sans-serif; background: linear-gradient(135deg,#0f1923,#142230); color: #e8e4dd; padding: 24px; min-height: 100vh; display:flex; align-items:center; justify-content:center; }
  .card { background: linear-gradient(160deg,rgba(20,45,70,0.6),rgba(15,25,40,0.8)); border:1px solid rgba(100,160,220,0.12); border-radius:20px; padding:28px; width: 320px; position:relative; overflow:hidden; }
  .card::before { content:''; position:absolute; top:-40px; right:-20px; width:140px; height:140px; background:radial-gradient(circle,rgba(255,180,50,0.15),transparent 70%); border-radius:50%; }
  .loc { font-size:13px; color:#6a8aaa; margin-bottom:4px; }
  .city { font-size:20px; font-weight:700; margin-bottom:16px; }
  .main { display:flex; align-items:flex-start; gap:12px; margin-bottom:20px; }
  .temp { font-size:56px; font-weight:700; line-height:1; background:linear-gradient(180deg,#f0e6d3,#c8b898); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  .info { padding-top:8px; }
  .cond { font-size:15px; font-weight:600; color:#d4c9a8; }
  .feels { font-size:12px; color:#6a8aaa; margin-top:3px; }
  .icon { font-size:44px; margin-left:auto; }
  .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
  .gi { background:rgba(15,25,40,0.5); border:1px solid rgba(100,160,220,0.08); border-radius:10px; padding:10px; text-align:center; }
  .gl { font-size:10px; color:#6a8aaa; text-transform:uppercase; letter-spacing:0.5px; }
  .gv { font-size:18px; font-weight:700; color:#d4c9a8; margin-top:3px; }
  .gu { font-size:10px; color:#6a8aaa; }
</style>
</head>
<body>
  <div class="card">
    <div class="loc">📍 भारत / India</div>
    <div class="city">${city}</div>
    <div class="main">
      <div class="temp">${temp}°</div>
      <div class="info">
        <div class="cond">Partly Cloudy</div>
        <div class="feels">Feels like ${parseInt(temp)+4}° · Humidity 68%</div>
      </div>
      <div class="icon">⛅</div>
    </div>
    <div class="grid">
      <div class="gi"><div class="gl">Wind</div><div class="gv">12</div><div class="gu">km/h</div></div>
      <div class="gi"><div class="gl">UV</div><div class="gv">6</div><div class="gu">High</div></div>
      <div class="gi"><div class="gl">AQI</div><div class="gv">142</div><div class="gu">Moderate</div></div>
    </div>
  </div>
</body>
</html>`;
  }

  if (p.includes("timer") || p.includes("countdown") || p.includes("टाइमर") || p.includes("उलटी गिनती") || p.includes("stopwatch") || p.includes("clock") || p.includes("घड़ी")) {
    return `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: linear-gradient(135deg,#1a1510,#1e1a12); color: #e8e4dd; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
  .timer-box { text-align: center; }
  h2 { font-size: 14px; color: #8a8578; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }
  .display { font-size: 72px; font-weight: 700; font-variant-numeric: tabular-nums; background: linear-gradient(180deg,#f0e6d3,#d4a017); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 30px; }
  .btns { display: flex; gap: 12px; justify-content: center; }
  .btn { padding: 12px 28px; border: none; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter'; transition: all 0.2s; }
  .btn:hover { transform: translateY(-1px); }
  .start { background: linear-gradient(135deg,#d4a017,#b8860b); color: #1a1510; }
  .pause { background: rgba(212,160,23,0.15); color: #d4a017; border: 1px solid rgba(212,160,23,0.2); }
  .reset { background: rgba(199,91,57,0.15); color: #c75b39; border: 1px solid rgba(199,91,57,0.2); }
  .presets { display: flex; gap: 8px; justify-content: center; margin-bottom: 24px; }
  .preset { padding: 6px 16px; background: rgba(42,38,30,0.6); border: 1px solid rgba(212,160,23,0.1); border-radius: 20px; color: #8a8578; font-size: 12px; cursor: pointer; font-family: 'Inter'; }
  .preset:hover { background: rgba(212,160,23,0.1); color: #d4a017; border-color: rgba(212,160,23,0.2); }
</style>
</head>
<body>
  <div class="timer-box">
    <h2>⏱ Countdown Timer</h2>
    <div class="presets">
      <button class="preset" onclick="set(60)">1 min</button>
      <button class="preset" onclick="set(300)">5 min</button>
      <button class="preset" onclick="set(600)">10 min</button>
      <button class="preset" onclick="set(1500)">25 min</button>
    </div>
    <div class="display" id="disp">05:00</div>
    <div class="btns">
      <button class="btn start" id="startBtn" onclick="startTimer()">Start</button>
      <button class="btn pause" onclick="pauseTimer()">Pause</button>
      <button class="btn reset" onclick="resetTimer()">Reset</button>
    </div>
  </div>
  <script>
    let total=300, remaining=300, interval=null, running=false;
    function fmt(s){const m=Math.floor(s/60);const sec=s%60;return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');}
    function set(s){total=s;remaining=s;running=false;clearInterval(interval);document.getElementById('disp').textContent=fmt(s);}
    function startTimer(){if(running||remaining<=0)return;running=true;interval=setInterval(()=>{remaining--;document.getElementById('disp').textContent=fmt(remaining);if(remaining<=0){clearInterval(interval);running=false;document.getElementById('disp').textContent='00:00';}},1000);}
    function pauseTimer(){running=false;clearInterval(interval);}
    function resetTimer(){running=false;clearInterval(interval);remaining=total;document.getElementById('disp').textContent=fmt(total);}
  </script>
</body>
</html>`;
  }

  if (p.includes("color") || p.includes("palette") || p.includes("रंग") || p.includes("hex")) {
    return `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #1a1a1e; color: #e8e4dd; padding: 24px; min-height: 100vh; }
  h1 { font-size: 20px; font-weight: 700; color: #d4a017; margin-bottom: 6px; }
  .sub { font-size: 12px; color: #5a5548; margin-bottom: 20px; }
  .gen-btn { padding: 10px 24px; background: linear-gradient(135deg,#d4a017,#b8860b); color: #1a1510; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; font-family: 'Inter'; margin-bottom: 20px; font-size: 14px; }
  .gen-btn:hover { opacity: 0.9; }
  .palette { display: flex; gap: 10px; flex-wrap: wrap; }
  .swatch { flex:1; min-width:70px; height: 120px; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding-bottom: 10px; cursor: pointer; transition: transform 0.2s; position: relative; }
  .swatch:hover { transform: translateY(-4px); }
  .hex { font-size: 11px; font-weight: 600; background: rgba(0,0,0,0.3); padding: 3px 8px; border-radius: 6px; color: #fff; }
  .copied { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); background: rgba(0,0,0,0.7); color: #d4a017; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; }
</style>
</head>
<body>
  <h1>🎨 Color Palette Generator</h1>
  <p class="sub">Click a swatch to copy its hex code</p>
  <button class="gen-btn" onclick="generate()">Generate New Palette</button>
  <div class="palette" id="pal"></div>
  <script>
    function randHex(){return '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');}
    function generate(){
      const pal=document.getElementById('pal');
      pal.innerHTML='';
      for(let i=0;i<5;i++){
        const c=randHex();
        const d=document.createElement('div');
        d.className='swatch';
        d.style.background=c;
        d.innerHTML='<span class="hex">'+c.toUpperCase()+'</span>';
        d.onclick=function(){
          navigator.clipboard.writeText(c);
          const m=document.createElement('div');m.className='copied';m.textContent='Copied!';
          d.appendChild(m);setTimeout(()=>m.remove(),800);
        };
        pal.appendChild(d);
      }
    }
    generate();
  </script>
</body>
</html>`;
  }

  if (p.includes("note") || p.includes("नोट") || p.includes("sticky") || p.includes("memo") || p.includes("diary")) {
    return `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Noto Sans Devanagari', 'Inter', sans-serif; background: #1a1a1e; color: #e8e4dd; padding: 24px; min-height: 100vh; }
  h1 { font-size: 20px; font-weight: 700; color: #d4a017; margin-bottom: 16px; }
  .add-row { display: flex; gap: 8px; margin-bottom: 20px; }
  textarea { flex:1; padding: 10px 14px; background: rgba(26,26,30,0.8); border: 1px solid rgba(212,160,23,0.12); border-radius: 10px; color: #e8e4dd; font-size: 14px; font-family: inherit; outline: none; resize: none; min-height: 60px; }
  textarea:focus { border-color: rgba(212,160,23,0.3); }
  textarea::placeholder { color: #5a5548; }
  .add-btn { padding: 10px 20px; background: linear-gradient(135deg,#d4a017,#b8860b); color: #1a1510; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; font-family: inherit; align-self: flex-end; }
  .notes { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
  .note { padding: 16px; border-radius: 12px; position: relative; font-size: 13px; line-height: 1.5; min-height: 100px; }
  .note .del { position: absolute; top: 8px; right: 8px; background: none; border: none; color: rgba(0,0,0,0.3); cursor: pointer; font-size: 14px; border-radius: 4px; padding: 2px 6px; }
  .note .del:hover { color: rgba(0,0,0,0.6); background: rgba(0,0,0,0.1); }
  .note .time { font-size: 10px; color: rgba(0,0,0,0.3); margin-top: 8px; }
</style>
</head>
<body>
  <h1>📝 Sticky Notes / नोट्स</h1>
  <div class="add-row">
    <textarea id="inp" placeholder="नोट लिखें / Write a note..."></textarea>
    <button class="add-btn" onclick="addNote()">+ Add</button>
  </div>
  <div class="notes" id="notes"></div>
  <script>
    const colors=['#e8c96a','#7ecba1','#e07c6a','#7eb5e0','#c49be0','#e0a87e'];
    let notes=[{text:'Welcome to Sticky Notes! 🎉',color:colors[0]},{text:'यह एक नोट है — Edit me!',color:colors[1]},{text:'Click ✕ to delete a note',color:colors[2]}];
    function addNote(){
      const t=document.getElementById('inp').value.trim();
      if(!t)return;
      notes.push({text:t,color:colors[notes.length%colors.length]});
      document.getElementById('inp').value='';
      render();
    }
    function del(i){notes.splice(i,1);render();}
    function render(){
      document.getElementById('notes').innerHTML=notes.map((n,i)=>
        '<div class="note" style="background:'+n.color+';color:#1a1510">'+
          '<button class="del" onclick="del('+i+')">✕</button>'+
          n.text+
          '<div class="time">Just now</div>'+
        '</div>'
      ).join('');
    }
    render();
    document.getElementById('inp').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();addNote();}});
  </script>
</body>
</html>`;
  }

  if (p.includes("quiz") || p.includes("प्रश्न") || p.includes("trivia") || p.includes("question")) {
    return `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}body{font-family:'Noto Sans Devanagari','Inter',sans-serif;background:linear-gradient(135deg,#1a1510,#1e1a12);color:#e8e4dd;padding:24px;min-height:100vh;display:flex;align-items:center;justify-content:center}
  .quiz{max-width:400px;width:100%}.header{font-size:12px;color:#8a8578;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}.q{font-size:20px;font-weight:700;margin-bottom:20px;line-height:1.4}.opts{display:flex;flex-direction:column;gap:8px}.opt{padding:14px 18px;background:rgba(42,38,30,0.6);border:1px solid rgba(212,160,23,0.1);border-radius:12px;font-size:14px;cursor:pointer;transition:all 0.2s;text-align:left;color:#e8e4dd;font-family:inherit}.opt:hover{border-color:rgba(212,160,23,0.3);background:rgba(212,160,23,0.05)}.opt.correct{background:rgba(74,124,89,0.2);border-color:#4a7c59;color:#6b9b5e}.opt.wrong{background:rgba(199,91,57,0.15);border-color:#c75b39;color:#c75b39}.score{text-align:center;margin-top:20px;font-size:14px;color:#8a8578}.btn{margin-top:16px;padding:10px 24px;background:linear-gradient(135deg,#d4a017,#b8860b);color:#1a1510;border:none;border-radius:10px;font-weight:600;cursor:pointer;font-family:inherit}
</style></head><body>
  <div class="quiz" id="quiz"></div>
  <script>
    const qs=[{q:'भारत की राजधानी क्या है?',opts:['Mumbai','Delhi','Kolkata','Chennai'],ans:1},{q:'What is 144 ÷ 12?',opts:['10','11','12','13'],ans:2},{q:'HTML stands for?',opts:['Hyper Text Markup Language','High Tech Modern Language','Hyper Transfer Markup Language','Home Tool Markup Language'],ans:0}];
    let ci=0,score=0;
    function show(){
      if(ci>=qs.length){document.getElementById('quiz').innerHTML='<div style="text-align:center"><div class="header">Quiz Complete!</div><div class="q">Score: '+score+'/'+qs.length+'</div><button class="btn" onclick="ci=0;score=0;show()">Play Again</button></div>';return;}
      const q=qs[ci];
      document.getElementById('quiz').innerHTML='<div class="header">Question '+(ci+1)+' of '+qs.length+'</div><div class="q">'+q.q+'</div><div class="opts">'+q.opts.map((o,i)=>'<button class="opt" onclick="answer('+i+')">'+o+'</button>').join('')+'</div><div class="score">Score: '+score+'</div>';
    }
    function answer(i){
      const btns=document.querySelectorAll('.opt');
      btns.forEach((b,j)=>{b.disabled=true;if(j===qs[ci].ans)b.classList.add('correct');if(j===i&&i!==qs[ci].ans)b.classList.add('wrong');});
      if(i===qs[ci].ans)score++;
      setTimeout(()=>{ci++;show();},1000);
    }
    show();
  </script>
</body></html>`;
  }

  // Fallback: generate a generic app scaffold based on prompt keywords
  const title = prompt.length > 50 ? prompt.slice(0, 50) + "..." : prompt;
  return `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Noto Sans Devanagari', 'Inter', sans-serif;
    background: linear-gradient(135deg, #1a1a1e 0%, #1e1a12 100%);
    color: #e8e4dd;
    padding: 32px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .app {
    max-width: 420px;
    width: 100%;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .icon {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #d4a017, #c75b39);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  h1 {
    font-size: 20px;
    font-weight: 700;
  }
  .desc {
    font-size: 12px;
    color: #8a8578;
    margin-top: 2px;
  }
  .card {
    background: rgba(42, 38, 30, 0.8);
    border: 1px solid rgba(212, 160, 23, 0.12);
    border-radius: 14px;
    padding: 24px;
  }
  .card p {
    font-size: 14px;
    line-height: 1.6;
    color: #b8b0a0;
  }
  .hint {
    margin-top: 16px;
    padding: 12px;
    background: rgba(212, 160, 23, 0.08);
    border: 1px solid rgba(212, 160, 23, 0.1);
    border-radius: 10px;
    font-size: 12px;
    color: #d4a017;
  }
</style>
</head>
<body>
  <div class="app">
    <div class="header">
      <div class="icon">✦</div>
      <div>
        <h1>${title}</h1>
        <div class="desc">Generated by Taksha AI</div>
      </div>
    </div>
    <div class="card">
      <p>This is a scaffold for your app. The AI understood your prompt and created this starting point. Edit the code on the left to build out the full functionality.</p>
      <div class="hint">💡 Tip: Try describing specific features — "add a button that counts clicks" or "दो इनपुट फील्ड जोड़ें"</div>
    </div>
  </div>
</body>
</html>`;
}

export { generateCode };

export default function PromptBar({ onGenerate }: PromptBarProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    // Simulate AI generation delay
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const code = generateCode(prompt);
    onGenerate(code);
    setIsGenerating(false);
    setIsExpanded(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <AnimatePresence>
      {isExpanded ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="border-b border-stone-200/60 bg-gradient-to-r from-stone-50/80 via-white/80 to-stone-50/80 overflow-hidden"
        >
          <div className="px-4 py-4">
            {/* Label */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/50">
                  <Wand2 className="h-3.5 w-3.5 text-amber-600" />
                </div>
                <span className="text-sm font-semibold text-stone-700">
                  Describe what you want to build
                </span>
                <span className="text-xs text-stone-400 ml-1">
                  English या हिन्दी में लिखें
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                aria-label="Close prompt bar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Input + Button */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <textarea
                  ref={inputRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. &quot;A tip calculator with bill splitting&quot; or &quot;एक BMI कैलकुलेटर बनाओ&quot;"
                  rows={2}
                  className="w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 pr-12 text-sm text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/30 transition-all font-sans"
                />
                {prompt.trim() && !isGenerating && (
                  <button
                    onClick={handleGenerate}
                    className="absolute right-2 bottom-2 p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                    aria-label="Generate code"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="flex items-center gap-2 self-end rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-amber-400 hover:to-amber-500 hover:shadow-warm-md disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate
                  </>
                )}
              </motion.button>
            </div>

            {/* Suggestion chips */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-[11px] text-stone-400 mr-1">Try:</span>
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => {
                    setPrompt(s.prompt);
                    inputRef.current?.focus();
                  }}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg border border-stone-200 bg-stone-50 text-[11px] text-stone-500 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-b border-stone-200/60 bg-stone-50/50"
        >
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 w-full px-4 py-2 text-xs text-stone-400 hover:text-amber-600 transition-colors"
          >
            <Wand2 className="h-3 w-3" />
            <span>Describe in natural language to generate code...</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
