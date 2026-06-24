# Blog Migration (Wix -> New Website)

This guide is an exact, practical process to migrate old Wix blog URLs and preserve SEO as much as possible.

## Goal

- Recover traffic from old Wix blog posts.
- Stop users landing on broken pages.
- Preserve rankings by mapping old URLs to equivalent new URLs.

## Before You Start

For your setup (same domain moved from Wix to Vercel), the migration logic is slightly different.

### Your Exact Case: Same Domain (foreigners.pl) now on Vercel

1. If old URLs were on the same host (for example `foreigners.pl/blog/...`), this is not a cross-domain migration.
2. You do not need domain-to-domain redirects.
3. You only need to make sure each old path either:
- Exists with equivalent content on current site, or
- 301 redirects to the best matching new path.

### When Wix Free-Plan URL matters

It only matters if Google indexed Wix-hosted URLs such as:

1. `username.wixsite.com/...`
2. `*.wixsite.com/...`

If those are indexed, treat them as a separate source of old URLs and map them too.

### Quick Decision Rule

1. If indexed URL starts with `foreigners.pl`: fix path-level mapping in this Next.js app.
2. If indexed URL starts with `*.wixsite.com`: you can only redirect if you still control that Wix site/domain settings.
3. If you cannot redirect Wix URLs, recreate content on `foreigners.pl`, submit sitemap, and request indexing.

---

## Phase 1: Collect All Old URLs

Create one spreadsheet with columns:

1. old_url
2. old_title
3. old_topic
4. status_code
5. new_url
6. mapping_type (exact / closest / category)
7. priority (high / medium / low)
8. notes

### Step 1.1 - Pull URLs from old sitemap (if available)

1. Try opening:
- https://OLD_DOMAIN/sitemap.xml
- https://OLD_DOMAIN/blog-sitemap.xml
- https://OLD_DOMAIN/sitemap-blog.xml

2. Copy all blog URLs into your sheet.

### Step 1.2 - Pull URLs from Google Search Console

1. Open Google Search Console for old domain (if still there).
2. Go to Performance -> Search results.
3. Add filters for:
- pages containing `/blog`
- pages containing `wixsite.com` (if any)
4. Export pages and copy to sheet.

### Step 1.3 - Pull URLs from Analytics

1. Open GA4 (or old analytics).
2. Reports -> Landing pages.
3. Filter URLs containing old blog paths.
4. Export and merge into the same sheet.

### Step 1.4 - Pull missing URLs from Wayback

1. Go to https://web.archive.org.
2. Search old domain.
3. Open a recent snapshot and collect missing blog links.

---

## Phase 2: Rebuild Content on New Site

For each old URL, create a matching article on the new site.

### Step 2.1 - Keep intent + slug alignment

1. Match topic and search intent exactly.
2. Keep slug close to old URL slug when possible.
3. Preserve language and target keywords.

### Step 2.2 - Recreate SEO fields

For each post set:

1. SEO title
2. Meta description
3. H1
4. Intro paragraph
5. Internal links to related services/blog posts
6. Canonical URL (new URL)

### Step 2.3 - Prioritize high-impact posts first

Use this order:

1. URLs with most clicks/impressions
2. URLs with backlinks
3. Remaining long-tail posts

---

## Phase 3: Map Old URL -> New URL

In your sheet, set `new_url` for every `old_url`.

Mapping rules:

1. Exact replacement: old post -> same topic post (best)
2. Closest replacement: old post -> closest article
3. Category fallback: old post -> blog category page (only if no close match)
4. Last fallback: old post -> blog index page

Do NOT map everything to homepage.

---

## Phase 4: Add 301 Redirects (Critical)

### If old URLs are on foreigners.pl (your current setup)

Set redirects inside this Next.js app for any old paths that no longer exist.

1. Keep URLs unchanged where possible (`/blog/old-slug` stays `/blog/old-slug`).
2. Add 301 redirects for changed paths/slugs.
3. Deploy and validate with live URL tests.

### If you also control old Wix-hosted URLs

Set permanent redirects from every old URL to mapped new URL.

#### Option A - At DNS/hosting level (preferred)

1. Add domain-level 301 rules in provider panel (Cloudflare/host/Wix if still active).
2. One rule per high-value URL first.
3. Then bulk-import all remaining mappings.

#### Option B - If old domain points to this Next.js app

Add redirects to `next.config.ts` using the mapping.

Example format:

```ts
async redirects() {
  return [
    {
      source: '/old-blog-path/old-post-slug',
      destination: '/blog/new-post-slug',
      permanent: true,
    },
  ];
}
```

### If you do NOT control old Wix-hosted URLs

You cannot create true 301 from old URLs. Do this instead:

1. Publish reconstructed posts quickly.
2. Update backlinks/social links where possible.
3. Submit new sitemap and request indexing.
4. Monitor and improve internal linking.

---

## Phase 5: Prevent Broken-Page Experience

### Step 5.1 - Keep a helpful 404 page

Include:

1. Search field
2. Links to blog index and top categories
3. Links to key service pages

### Step 5.2 - Add fallback redirects for old path patterns

If old Wix patterns are predictable, add pattern-based redirect rules.

Examples:

1. `/post/:slug` -> `/blog/:slug`
2. `/blog/post/:slug` -> `/blog/:slug`

---

## Phase 6: Reindex and Validate

### Step 6.1 - Submit sitemap

1. Ensure new sitemap includes all migrated blog URLs.
2. Submit in Search Console.

### Step 6.2 - Request indexing for top pages

1. Start with top 20 migrated posts.
2. Use URL inspection -> Request indexing.

### Step 6.3 - Validate redirects

For top old URLs, verify response is:

1. HTTP 301
2. Destination equals mapped new URL

---

## Phase 7: Weekly Monitoring (First 8 Weeks)

Track weekly:

1. 404 errors in Search Console
2. Indexed pages count
3. Clicks/impressions for migrated URLs
4. Top landing pages recovery

If a migrated URL underperforms:

1. Improve intro and headings
2. Add internal links
3. Add FAQ section for long-tail queries

---

## Quick Execution Checklist

1. Build URL inventory sheet from sitemap + GSC + analytics + Wayback (include both `foreigners.pl` and any `wixsite.com` URLs found).
2. Recreate top-priority posts on new site with matching intent.
3. Complete old->new URL mapping sheet (path by path).
4. Implement 301 redirects for changed `foreigners.pl` paths, plus Wix URLs only if controllable.
5. Submit sitemap and request indexing for top pages.
6. Monitor 404 + ranking recovery weekly.

---

## Recommended Deliverables

Create these files in your workflow:

1. `migration/url-map.csv` -> old_url,new_url,priority
2. `migration/content-status.csv` -> old_url,new_url,status,owner,date
3. `migration/redirect-test.csv` -> old_url,status_code,final_url,pass_fail

---

## Realistic Expectations

- With good 301 mapping: recovery can start within days to a few weeks.
- Without old-domain control: recovery is slower and depends on reindexing + backlinks.
- The closer old and new content/slugs are, the better retention you get.
