/*
  VOLLEY4CHARITY DATA FILE
  ========================
  THIS is the only file you normally need to edit.

  Match score format: [sets won by team 1, sets won by team 2]
  Group/playoff/semi/3rd-place matches are best of 3.
  Final is best of 5.

  Leave a score as null until the match is played.
*/
const TOURNAMENT = {
  name: 'IPLT “Stefan cel Mare” Volley4Charity Tournament',
  year: '2026',
  teams: [
    '10 “B”', '9 “A”', '12 “A”', '8 “A”',
    '11 “A”', '9 “C”', '10 “A”', '9 “B”'
  ],
  groups: {
    A: ['12 “A”','10 “A”','9 “B”','8 “A”'],
    B: ['11 “A”','10 “B”','9 “A”','9 “C”']
  },
  /* 3 matchdays = complete single round-robin in each group. */
  matchdays: [
    {name:'Matchday 1', matches:[
      {group:'A', a:'12 “A”', b:'10 “A”', score:null, date:'19.01.2027'},
      {group:'A', a:'9 “B”', b:'8 “A”', score:null, date:'21.01.2027'},
      {group:'B', a:'11 “A”', b:'10 “B”', score:null, date:'26.01.2027'},
      {group:'B', a:'9 “A”', b:'9 “C”', score:null, date:'28.01.2027'}
    ]},
    {name:'Matchday 2', matches:[
      {group:'A', a:'12 “A”', b:'9 “B”', score:null, date:'02.02.2027'},
      {group:'A', a:'10 “A”', b:'8 “A”', score:null, date:'04.02.2027'},
      {group:'B', a:'11 “A”', b:'9 “A”', score:null, date:'09.02.2027'},
      {group:'B', a:'10 “B”', b:'9 “C”', score:null, date:'11.02.2027'}
    ]},
    {name:'Matchday 3', matches:[
      {group:'A', a:'12 “A”', b:'8 “A”', score:null, date:'16.02.2027'},
      {group:'A', a:'10 “A”', b:'9 “B”', score:null, date:'18.02.2027'},
      {group:'B', a:'11 “A”', b:'9 “C”', score:null, date:'23.02.2027'},
      {group:'B', a:'10 “B”', b:'9 “A”', score:null, date:'25.02.2027'}
    ]}
  ],
  /* Knockout draw follows the workbook: A2 vs B3 and B2 vs A3. */
  playoff1:{a:{group:'A',place:2},b:{group:'B',place:3},score:null},
  playoff2:{a:{group:'B',place:2},b:{group:'A',place:3},score:null},
  semi1:{a:'seed1',b:'seed4',score:null},
  semi2:{a:'seed3',b:'seed2',score:null},
  third:{a:'semi1loser',b:'semi2loser',score:null},
  final:{a:'semi1winner',b:'semi2winner',score:null}
};
