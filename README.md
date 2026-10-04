# Volley4Charity Tournament Website

## What you edit
You only need to edit `data.js`.

### Group matches
Enter scores as:
- `2-0` = winner gets 2 points
- `2-1` = winner gets 1 point

Leave unplayed matches as `null`.

### Playoffs / Semi-finals / 3rd place
Same format: `2-0` or `2-1`.

### Final
The final is best of 5:
- `3-0`
- `3-1`
- `3-2`

## Important
Do NOT manually edit the standings, qualifiers or bracket. They are calculated automatically from the scores.

## Publishing with GitHub + Vercel

1. Create a GitHub account at https://github.com if you don't have one.
2. Create a new repository. Suggested name: `volley4charity`.
3. Upload these files to the repository:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `data.js`
4. Create a Vercel account at https://vercel.com and sign in with GitHub.
5. Click "Add New..." → "Project".
6. Select your `volley4charity` GitHub repository.
7. Leave the default settings and click Deploy.
8. Vercel gives you a public URL.
9. When a match finishes, open `data.js` on GitHub, edit only the score, and commit the change.
10. Vercel automatically redeploys the site. Refresh the website after deployment.

### Example
Change:
`score:null`

to:
`score:'2-1'`

Do not put quotes around null.

## Changing the groups after the draw
At the top of `data.js`, change only:

groups: {
  A: [...],
  B: [...]
}

Then change the matchups in the three matchdays so each group has a full round robin.

The current site uses a randomized temporary draw because the official groups have not been drawn yet.
