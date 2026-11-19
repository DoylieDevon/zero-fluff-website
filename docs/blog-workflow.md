# Blog workflow

Publish on zerofluff.co.uk first, then cross-post to Substack. The site is the original; Substack is the distribution.

## Publishing a post here

1. Add `src/content/blog/<slug>.md`. The filename is the URL: `how-much-does-ai-automation-cost.md` becomes `/blog/how-much-does-ai-automation-cost/`.
2. Frontmatter:

   ```yaml
   ---
   title: "…"
   description: "…"        # unique meta description, around 150 characters
   quickAnswer: "…"        # 2–3 sentences, shown first and used on the blog index
   date: 2026-12-01
   draft: false            # true keeps it out of the build, sitemap, blog index and RSS
   ---
   ```

3. Preview with `npm run dev` and open `/blog/<slug>/`. Drafts show up there (and only there).
4. Set `draft: false`, add a new entry to the top of `CHANGELOG` in `src/lib/version.ts` (a patch bump is fine for a new post), and merge to `main`.
5. After the deploy, run `npm run indexnow` to tell Bing and other IndexNow engines about the new URL (see the README).

The post then appears on `/blog`, in `sitemap-0.xml` and in `/rss.xml` automatically.

## Cross-posting to Substack

1. Wait until the post is live on zerofluff.co.uk.
2. Create the Substack post with the same title and body.
3. Start the post with: *Originally published at [zerofluff.co.uk](https://zerofluff.co.uk/blog/<slug>/).*
4. Finish with a link back to the original and to the most relevant service page.
5. Don't publish to Substack first. Search engines should see the zerofluff.co.uk version as the original.

Substack posts still appear on `/blog` under "From the newsletter", pulled from the Substack feed.

## Rhythm

Publish one post a month. Each one should answer a real question a buyer has asked us, open with the quick answer, and say plainly when the answer is "it depends" and on what.

## Facts

Don't put in prices, client names, results or quotes that we haven't already published or been cleared to publish. If a post needs a number, get it from Andy first.
