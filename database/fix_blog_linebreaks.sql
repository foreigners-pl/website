-- Fix escaped newlines and formatting in all blog posts
-- This converts escaped newline characters (\\n) to actual newlines
-- Run this in Supabase SQL Editor to fix the formatting

UPDATE blog_posts
SET content = REPLACE(REPLACE(content, E'\\\\n', E'\n'), '\n\n\n', '\n\n')
WHERE content LIKE '%\\n%';