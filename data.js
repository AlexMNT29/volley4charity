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
    A: ['10 “B”','12 “A”','9 “B”','10 “A”'],
    B: ['9 “C”','11 “A”','8 “A”','9 “A”']
  },
  /* 3 matchdays = complete single round-robin in each group. */
  matchdays: [
    {name:'Matchday 1', matches:[
      {group:'A', a:'10 “B”', b:'10 “A”', score:null},
      {group:'A', a:'12 “A”', b:'9 “B”', score:null},
      {group:'B', a:'9 “C”', b:'9 “A”', score:null},
      {group:'B', a:'11 “A”', b:'8 “A”', score:null}
    ]},
    {name:'Matchday 2', matches:[
      {group:'A', a:'10 “B”', b:'9 “B”', score:null},
      {group:'A', a:'10 “A”', b:'12 “A”', score:null},
      {group:'B', a:'9 “C”', b:'8 “A”', score:null},
      {group:'B', a:'9 “A”', b:'11 “A”', score:null}
    ]},
    {name:'Matchday 3', matches:[
      {group:'A', a:'10 “B”', b:'12 “A”', score:null},
      {group:'A', a:'9 “B”', b:'10 “A”', score:null},
      {group:'B', a:'9 “C”', b:'11 “A”', score:null},
      {group:'B', a:'8 “A”', b:'9 “A”', score:null}
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
