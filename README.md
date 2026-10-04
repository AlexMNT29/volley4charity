# Volley4Charity Tournament Website

A static, professional tournament website for IPLT “Stefan cel Mare” Volley4Charity.

## The only file you normally edit
Open `data.js` and change match `score` values.

Examples:
- `{score: [2,0]}` = first team wins 2–0 and gets 2 group points.
- `{score: [2,1]}` = first team wins 2–1 and gets 1 group point.
- `{score: null}` = not played yet.

Group matches, playoffs, semifinals and the 3rd-place match are best of 3. The final is best of 5.

The site calculates group standings, qualifying placeholders, playoff winners, seeds, semifinal teams, podium and final results from those scores.

## Publish with GitHub + Vercel
1. Create a GitHub account at https://github.com/ if you don't have one.
2. Create a new repository, e.g. `volley4charity`.
3. Upload `index.html`, `styles.css`, `app.js`, `data.js` and `README.md`.
4. Go to https://vercel.com/ and sign in with GitHub.
5. Choose **Add New → Project**, select `volley4charity`, then deploy.
6. Vercel gives you a public URL. Your PC can be turned off; the site stays online.
7. To update results later, edit `data.js` on GitHub, commit the change, and Vercel automatically redeploys.

## Important
The groups are randomized in `data.js`. Once the real draw is made, only change the two arrays under `groups` to the official groups. Then the existing matchday schedule follows those groups.
