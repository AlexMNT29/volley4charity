const D = window.TOURNAMENT;

function parseScore(score) {
  if (!score || typeof score !== 'string') return null;
  const m = score.trim().match(/^([0-3])\s*-\s*([0-3])$/);
  if (!m) return null;
  const a = +m[1], b = +m[2];
  if (a === b || Math.max(a,b) < 2) return null;
  // Bo3: winner must have 2; loser must have 0 or 1.
  return {a,b};
}
function played(score){ return !!parseScore(score); }
function result(score){
  const s=parseScore(score); if(!s) return null;
  const winner=s.a>s.b?'home':'away';
  const loser=winner==='home'?'away':'home';
  const winnerPoints=Math.max(s.a,s.b)===2 && Math.min(s.a,s.b)===0 ? 2 : 1;
  return {winner,loser,winnerPoints,loserPoints:0,a:s.a,b:s.b};
}
function allGroupMatches(group){
  return D.matchdays.flatMap(md=>md.matches.filter(m=>m.group===group));
}
function standings(group){
  const teams=[...D.groups[group]];
  const rows=teams.map(t=>({team:t,played:0,points:0,wins:0,setsFor:0,setsAgainst:0}));
  const map=Object.fromEntries(rows.map(r=>[r.team,r]));
  allGroupMatches(group).forEach(m=>{
    const r=result(m.score); if(!r)return;
    map[m.home].played++; map[m.away].played++;
    map[m.home].setsFor+=r.a; map[m.home].setsAgainst+=r.b;
    map[m.away].setsFor+=r.b; map[m.away].setsAgainst+=r.a;
    map[m[r.winner]].wins++;
    map[m[r.winner]].points+=r.winnerPoints;
  });
  return rows.sort((x,y)=>
    y.points-x.points || y.wins-x.wins ||
    (y.setsFor-y.setsAgainst)-(x.setsFor-x.setsAgainst) ||
    y.setsFor-x.setsFor || x.team.localeCompare(y.team)
  );
}
function rankMap(){
  const A=standings('A'),B=standings('B');
  return {A,B};
}
function seed(name){
  const {A,B}=rankMap();
  const [g,rank]=name.split('');
  if(name==='A1')return A[0]?.team||'1st Group A';
  if(name==='A2')return A[1]?.team||'2nd Group A';
  if(name==='A3')return A[2]?.team||'3rd Group A';
  if(name==='B1')return B[0]?.team||'1st Group B';
  if(name==='B2')return B[1]?.team||'2nd Group B';
  if(name==='B3')return B[2]?.team||'3rd Group B';
  if(name==='P1')return winner(D.playoffs[0])||'Playoff 1 Winner';
  if(name==='P2')return winner(D.playoffs[1])||'Playoff 2 Winner';
  if(name==='SF1W')return winner(D.semifinals[0])||'Semi-Final 1 Winner';
  if(name==='SF1L')return loser(D.semifinals[0])||'Semi-Final 1 Loser';
  if(name==='SF2W')return winner(D.semifinals[1])||'Semi-Final 2 Winner';
  if(name==='SF2L')return loser(D.semifinals[1])||'Semi-Final 2 Loser';
  return name;
}
function winner(m){
  const r=result(m?.score); if(!r)return null;
  return r.winner==='home'?seed(m.homeSeed):seed(m.awaySeed);
}
function loser(m){
  const r=result(m?.score); if(!r)return null;
  return r.loser==='home'?seed(m.homeSeed):seed(m.awaySeed);
}
function renderTable(group,id){
  const rows=standings(group);
  document.querySelector(id).innerHTML=`<table class="table">
  <thead><tr><th>#</th><th>Team</th><th>MP</th><th>W</th><th>Pts</th></tr></thead>
  <tbody>${rows.map((r,i)=>`<tr class="${i<2?'qualify':''}">
    <td>${i+1}</td><td class="team">${r.team}</td><td>${r.played}</td><td>${r.wins}</td><td class="pts">${r.points}</td>
  </tr>`).join('')}</tbody></table>`;
}
function matchHTML(m){
  const r=result(m.score);
  const hs=r?(r.winner==='home'?'winner':''):'';
  const as=r?(r.winner==='away'?'winner':''):'';
  return `<div class="match">
    <div class="home ${hs}">${m.home}</div>
    <div class="score ${r?'':'pending'}">${m.score||'—'}</div>
    <div class="away ${as}">${m.away}</div>
  </div>`;
}
function renderMatchdays(){
  document.querySelector('#matchdays').innerHTML=D.matchdays.map(md=>{
    const complete=md.matches.filter(m=>played(m.score)).length;
    return `<div class="matchday"><div class="md-head"><strong>${md.name}</strong><span>${complete}/${md.matches.length} played • Best of 3</span></div><div class="match-grid">${md.matches.map(matchHTML).join('')}</div></div>`;
  }).join('');
}
function gameCard(label,home,away,score){
  const r=result(score);
  const hs=r?(r.winner==='home'?'w':''):'', as=r?(r.winner==='away'?'w':''):'';
  return `<div class="game"><div class="game-line ${hs}"><span>${home}</span><span class="game-score">${score||'—'}</span></div><div class="game-line ${as}"><span>${away}</span></div></div>`;
}
function renderBracket(){
  const p=D.playoffs, s=D.semifinals, t=D.thirdPlace, f=D.final;
  const p1=[seed(p[0].homeSeed),seed(p[0].awaySeed)],p2=[seed(p[1].homeSeed),seed(p[1].awaySeed)];
  const sf1=[seed(s[0].homeSeed),seed(s[0].awaySeed)],sf2=[seed(s[1].homeSeed),seed(s[1].awaySeed)];
  document.querySelector('#bracketView').innerHTML=`
    <div class="round"><div class="round-title">Playoffs</div>${gameCard('P1',p1[0],p1[1],p[0].score)}${gameCard('P2',p2[0],p2[1],p[1].score)}</div>
    <div class="round"><div class="round-title">Semi-Finals</div>${gameCard('SF1',sf1[0],sf1[1],s[0].score)}${gameCard('SF2',sf2[0],sf2[1],s[1].score)}</div>
    <div class="round"><div class="round-title">3rd Place / Final</div>${gameCard('3P',seed(t.homeSeed),seed(t.awaySeed),t.score)}<div class="spacer"></div>${gameCard('F',seed(f.homeSeed),seed(f.awaySeed),f.score)}</div>
    <div class="round"><div class="round-title">Champion</div><div class="game"><div class="game-line w"><span>🏆 ${winner(f)||'TBD'}</span><span class="game-score">${f.score||'—'}</span></div><div class="game-line"><span>2nd: ${loser(f)||'TBD'}</span></div></div><div class="spacer"></div><div class="game"><div class="game-line w"><span>🥉 ${winner(t)||'TBD'}</span></div></div></div>`;
}
function renderPodium(){
  const f=D.final,t=D.thirdPlace;
  document.querySelector('#podium').innerHTML=`
    <div class="podium-card"><div class="medal">🥇</div><div class="place">CHAMPION</div><h3>${winner(f)||'TBD'}</h3></div>
    <div class="podium-card"><div class="medal">🥈</div><div class="place">2ND PLACE</div><h3>${loser(f)||'TBD'}</h3></div>
    <div class="podium-card"><div class="medal">🥉</div><div class="place">3RD PLACE</div><h3>${winner(t)||'TBD'}</h3></div>`;
}
function validate(){
  // Warn in console for invalid entered scores. The public site itself only displays them.
  const all=[...D.matchdays.flatMap(x=>x.matches),...D.playoffs,...D.semifinals,D.thirdPlace];
  all.forEach(m=>{if(m.score && !parseScore(m.score))console.warn('Invalid Bo3 score:',m.id,m.score)});
  if(D.final.score){
    const s=D.final.score.match(/^([0-3])\s*-\s*([0-3])$/);
    if(!s || Math.max(+s[1],+s[2])!==3) console.warn('Final must be a Bo5 score such as 3-2:',D.final.score);
  }
}
function init(){
  document.title=`${D.subtitle} • ${D.season}`;
  validate(); renderTable('A','#tableA'); renderTable('B','#tableB');
  renderMatchdays(); renderBracket(); renderPodium();
}
init();
