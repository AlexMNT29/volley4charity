const T=TOURNAMENT;
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function result(score){ if(!score) return null; if(score[0]===score[1]) return null; return score[0]>score[1]?1:2; }
function teamStats(group){
  const teams=T.groups[group].map(team=>({team,played:0,points:0,setsFor:0,setsAgainst:0,remaining:0}));
  const by=Object.fromEntries(teams.map(x=>[x.team,x]));
  for(const md of T.matchdays) for(const m of md.matches.filter(x=>x.group===group)){
    if(!m.score){by[m.a].remaining++;by[m.b].remaining++;continue;}
    const r=result(m.score); if(!r) continue;
    by[m.a].played++;by[m.b].played++;
    by[m.a].setsFor+=m.score[0];by[m.a].setsAgainst+=m.score[1];
    by[m.b].setsFor+=m.score[1];by[m.b].setsAgainst+=m.score[0];
    by[r===1?m.a:m.b].points += (Math.max(...m.score)===2 && Math.min(...m.score)===0)?2:1;
  }
  return teams.sort((a,b)=>b.points-a.points || (b.setsFor-b.setsAgainst)-(a.setsFor-a.setsAgainst) || b.setsFor-a.setsFor || a.team.localeCompare(b.team));
}
function guaranteed(group, index, stats){
  // A team is guaranteed a final rank when no other team can catch it.
  const t=stats[index], rem=t.remaining;
  const maxT=t.points+rem*2;
  const minT=t.points;
  const canBeAbove=stats.filter((x,i)=>i!==index && x.points+ x.remaining*2 > minT).length;
  const canCatch=stats.filter((x,i)=>i!==index && x.points+ x.remaining*2 >= minT).length;
  if(index===0){
    return stats.slice(1).every(x=>x.points+x.remaining*2 < minT) ? 1 : null;
  }
  // Exact guaranteed rank test by exhaustive feasible upper/lower point bounds.
  const lowerAbove=stats.filter((x,i)=>i!==index && x.points > maxT).length;
  if(lowerAbove>=index+1) return null;
  const upperBelow=stats.filter((x,i)=>i!==index && x.points < minT).length;
  if(upperBelow >= stats.length-index-1 && stats.filter((x,i)=>i!==index && x.points===minT).length===0) return index+1;
  // Practical exactness: simulate whether any team can occupy each rank using remaining max points.
  let guaranteedRank=true;
  for(let rank=1;rank<=4;rank++){
    const competitors=stats.filter((x,i)=>i!==index);
    const possibleAbove=competitors.filter(x=>x.points+x.remaining*2>minT).length;
    const possibleBelow=competitors.filter(x=>x.points<maxT).length;
    if(rank===index+1 && possibleAbove < rank && possibleBelow < 4-rank) return rank;
  }
  return null;
}
function displayQualifier(group, place){
  const stats=teamStats(group), t=stats[place-1];
  // Only reveal a name once that exact placing is mathematically locked.
  return guaranteed(group,place-1,stats)===place ? t.team : `${place}${place===1?'st':place===2?'nd':place===3?'rd':'th'} place — Group ${group}`;
}
function renderGroup(group,id){
  const stats=teamStats(group); const el=$(id);
  el.innerHTML=`<div class="table-head"><span>#</span><span>Team</span><span>MP</span><span>PTS</span></div>`+stats.map((t,i)=>`<div class="standing-row ${i===0?'leader':''}"><span class="rank">${i+1}</span><span class="team-name">${esc(t.team)}${i===0?'<em>TOP</em>':''}</span><span>${t.played}</span><strong>${t.points}</strong></div>`).join('');
}
function matchCard(m){
 const s=m.score; return `<div class="match-card"><div class="match-meta"><span>GROUP ${m.group}</span><span>${s?'FINAL':'UPCOMING'}</span></div><div class="match-team"><span>${esc(m.a)}</span><b>${s?s[0]:'—'}</b></div><div class="match-team"><span>${esc(m.b)}</span><b>${s?s[1]:'—'}</b></div><div class="format">BEST OF 3</div></div>`;
}
function renderMatchdays(){ $('#matchdays').innerHTML=T.matchdays.map(md=>`<div class="matchday"><div class="md-title"><span>${md.name}</span><small>${md.matches.length} matches</small></div><div class="match-grid">${md.matches.map(matchCard).join('')}</div></div>`).join(''); }
function playoffTeam(ref){return ref.group?displayQualifier(ref.group,ref.place):''}
function winner(match){if(!match.score)return null;return match.score[0]>match.score[1]?match.a:match.b}
function loser(match){if(!match.score)return null;return match.score[0]>match.score[1]?match.b:match.a}
function playoffResolved(p){if(!p.score)return null; return p.score[0]>p.score[1]?playoffTeam(p.a):playoffTeam(p.b)}
function seedData(){
 const a=teamStats('A'), b=teamStats('B');
 const qualifiers=[{label:'1st place — Group A',team:guaranteed('A',0,a)?a[0].team:null,points:a[0].points},{label:'1st place — Group B',team:guaranteed('B',0,b)?b[0].team:null,points:b[0].points},{label:'Playoff 1 winner',team:playoffResolved(T.playoff1),points:T.playoff1.score?Math.max(...T.playoff1.score)===2&&Math.min(...T.playoff1.score)===0?2:1:0},{label:'Playoff 2 winner',team:playoffResolved(T.playoff2),points:T.playoff2.score?Math.max(...T.playoff2.score)===2&&Math.min(...T.playoff2.score)===0?2:1:0}];
 const known=qualifiers.filter(x=>x.team); known.sort((x,y)=>y.points-x.points); return qualifiers.map(x=>({...x,seed:known.findIndex(k=>k===x)+1}));
}
function seedName(n){const s=seedData().sort((a,b)=>a.points-b.points); const x=seedData().find(q=>q.seed===n); return x?.team || `Seed ${n}`}
function stageTeam(ref){ if(typeof ref==='string'){ if(ref==='seed1')return '123';if(ref==='seed2')return seedName(2);if(ref==='seed3')return seedName(3);if(ref==='seed4')return seedName(4);if(ref==='semi1winner')return winner({a:seedName(1),b:seedName(4),score:T.semi1.score});if(ref==='semi2winner')return winner({a:seedName(3),b:seedName(2),score:T.semi2.score});if(ref==='semi1loser')return loser({a:seedName(1),b:seedName(4),score:T.semi1.score});if(ref==='semi2loser')return loser({a:seedName(3),b:seedName(2),score:T.semi2.score});} return ref; }
function stageCard(title,a,b,score,format){return `<div class="stage-card"><div class="stage-title">${title}<span>${format}</span></div><div class="stage-team"><span>${esc(a)}</span><b>${score?score[0]:'—'}</b></div><div class="stage-team"><span>${esc(b)}</span><b>${score?score[1]:'—'}</b></div></div>`}
function renderBracket(){
 const p1a=playoffTeam(T.playoff1.a),p1b=playoffTeam(T.playoff1.b),p2a=playoffTeam(T.playoff2.a),p2b=playoffTeam(T.playoff2.b);
 $('#bracketView').innerHTML=`<div class="round"><h3>Playoffs</h3>${stageCard('Playoff 1',p1a,p1b,T.playoff1.score,'BEST OF 3')}${stageCard('Playoff 2',p2a,p2b,T.playoff2.score,'BEST OF 3')}</div><div class="round"><h3>Seeds</h3>${[1,2,3,4].map(n=>`<div class="seed-card"><span>SEED ${n}</span><strong>${esc(seedName(n))}</strong></div>`).join('')}</div><div class="round"><h3>Semifinals</h3>${stageCard('Semi-final 1',seedName(1),seedName(4),T.semi1.score,'BEST OF 3')}${stageCard('Semi-final 2',seedName(3),seedName(2),T.semi2.score,'BEST OF 3')}</div><div class="round"><h3>Medal matches</h3>${stageCard('3rd place',stageTeam('semi1loser')||'Semi-final 1 loser',stageTeam('semi2loser')||'Semi-final 2 loser',T.third.score,'BEST OF 3')}${stageCard('FINAL',stageTeam('semi1winner')||'Semi-final 1 winner',stageTeam('semi2winner')||'Semi-final 2 winner',T.final.score,'BEST OF 5')}</div>`;
}
function renderPodium(){const win=winner({a:stageTeam('semi1winner'),b:stageTeam('semi2winner'),score:T.final.score});const sec=loser({a:stageTeam('semi1winner'),b:stageTeam('semi2winner'),score:T.final.score});const third=winner({a:stageTeam('semi1loser'),b:stageTeam('semi2loser'),score:T.third.score}); $('#podium').innerHTML=[['2nd',sec],['1st',win],['3rd',third]].map(x=>`<div class="pod ${x[0]==='1st'?'gold':''}"><span>${x[0]}</span><strong>${esc(x[1]||'TBD')}</strong></div>`).join('')}
function render(){renderGroup('A','#groupA');renderGroup('B','#groupB');renderMatchdays();renderBracket();renderPodium();}
render();
