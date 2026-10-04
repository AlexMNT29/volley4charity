// ============================================================
// VOLLEY4CHARITY TOURNAMENT DATA
// Edit ONLY the scores below after matches are played.
// Leave a score as null until the match is played.
// Group scores: "2-0" or "2-1" (best of 3)
// Knockout scores: "2-0"/"2-1" (best of 3)
// FINAL score: "3-0", "3-1", or "3-2" (best of 5)
// ============================================================

window.TOURNAMENT = {
  title: 'IPLT "Stefan cel Mare"',
  subtitle: 'Volley4Charity Tournament',
  season: '2026',
  groups: {
    A: ['10 "B"', '12 "A"', '9 "A"', '11 "A"'],
    B: ['8 "A"', '9 "C"', '10 "A"', '9 "B"']
  },

  // Three round-robin matchdays. Each team plays once per matchday.
  matchdays: [
    {
      name: 'Matchday 1',
      matches: [
        { id:'A1', group:'A', home:'10 "B"', away:'11 "A"', score:null },
        { id:'A2', group:'A', home:'12 "A"', away:'9 "A"', score:null },
        { id:'B1', group:'B', home:'8 "A"', away:'9 "B"', score:null },
        { id:'B2', group:'B', home:'9 "C"', away:'10 "A"', score:null }
      ]
    },
    {
      name: 'Matchday 2',
      matches: [
        { id:'A3', group:'A', home:'10 "B"', away:'9 "A"', score:null },
        { id:'A4', group:'A', home:'11 "A"', away:'12 "A"', score:null },
        { id:'B3', group:'B', home:'8 "A"', away:'10 "A"', score:null },
        { id:'B4', group:'B', home:'9 "B"', away:'9 "C"', score:null }
      ]
    },
    {
      name: 'Matchday 3',
      matches: [
        { id:'A5', group:'A', home:'10 "B"', away:'12 "A"', score:null },
        { id:'A6', group:'A', home:'9 "A"', away:'11 "A"', score:null },
        { id:'B5', group:'B', home:'8 "A"', away:'9 "C"', score:null },
        { id:'B6', group:'B', home:'10 "A"', away:'9 "B"', score:null }
      ]
    }
  ],

  // Cross-group playoffs: 2nd in each group plays 3rd in the other group.
  playoffs: [
    { id:'P1', label:'Playoff 1', homeSeed:'A2', awaySeed:'B3', score:null },
    { id:'P2', label:'Playoff 2', homeSeed:'B2', awaySeed:'A3', score:null }
  ],

  semifinals: [
    { id:'SF1', label:'Semi-Final 1', homeSeed:'A1', awaySeed:'P2', score:null },
    { id:'SF2', label:'Semi-Final 2', homeSeed:'B1', awaySeed:'P1', score:null }
  ],

  thirdPlace: { id:'3P', label:'3rd Place', homeSeed:'SF1L', awaySeed:'SF2L', score:null },

  final: { id:'F', label:'FINAL', homeSeed:'SF1W', awaySeed:'SF2W', score:null }
};
