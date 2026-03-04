-- License Exchange Flow Analytics
-- Run this in Supabase SQL Editor

-- Create the analytics table
CREATE TABLE IF NOT EXISTS license_flow_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Session identification
  session_id TEXT NOT NULL,
  
  -- Visitor info
  country TEXT,
  city TEXT,
  timezone TEXT,
  local_time TIMESTAMPTZ,
  
  -- Device info
  device_type TEXT, -- 'mobile', 'tablet', 'desktop'
  browser TEXT,
  os TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  
  -- Traffic source
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- Flow tracking
  event_type TEXT NOT NULL, -- 'page_view', 'step_view', 'button_click', 'option_select', 'whatsapp_click', 'session_end'
  step_name TEXT, -- Current step in the flow
  action TEXT, -- Button or option clicked
  action_value TEXT, -- Additional context (e.g., which option was selected)
  
  -- Session state
  flow_path TEXT[], -- Array of all steps visited in order
  answers JSONB, -- All answers given during the session
  
  -- Outcome tracking
  completed BOOLEAN DEFAULT FALSE,
  exit_step TEXT, -- Last step before leaving
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_license_flow_session ON license_flow_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_license_flow_date ON license_flow_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_license_flow_event ON license_flow_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_license_flow_step ON license_flow_analytics(step_name);
CREATE INDEX IF NOT EXISTS idx_license_flow_country ON license_flow_analytics(country);

-- Enable RLS
ALTER TABLE license_flow_analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from anyone (anonymous tracking)
CREATE POLICY "Allow anonymous inserts" ON license_flow_analytics
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can read (for admin dashboard)
CREATE POLICY "Allow authenticated reads" ON license_flow_analytics
  FOR SELECT TO authenticated
  USING (true);

-- ============================================
-- USEFUL QUERIES FOR ANALYTICS DASHBOARD
-- ============================================

-- 1. Daily visitor count
-- SELECT DATE(created_at) as visit_date, COUNT(DISTINCT session_id) as visitors
-- FROM license_flow_analytics
-- WHERE event_type = 'page_view'
-- GROUP BY DATE(created_at)
-- ORDER BY visit_date DESC;

-- 2. Funnel analysis - drop-off at each step
-- SELECT step_name, COUNT(DISTINCT session_id) as visitors
-- FROM license_flow_analytics
-- WHERE event_type = 'step_view'
-- GROUP BY step_name
-- ORDER BY visitors DESC;

-- 3. Completion rate
-- SELECT 
--   COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN session_id END) as started,
--   COUNT(DISTINCT CASE WHEN event_type = 'whatsapp_click' THEN session_id END) as completed,
--   ROUND(
--     COUNT(DISTINCT CASE WHEN event_type = 'whatsapp_click' THEN session_id END)::numeric / 
--     NULLIF(COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN session_id END), 0) * 100, 
--     2
--   ) as completion_rate
-- FROM license_flow_analytics;

-- 4. Most common drop-off points
-- SELECT exit_step, COUNT(DISTINCT session_id) as drop_offs
-- FROM license_flow_analytics
-- WHERE event_type = 'session_end' AND completed = FALSE
-- GROUP BY exit_step
-- ORDER BY drop_offs DESC;

-- 5. Traffic by country
-- SELECT country, COUNT(DISTINCT session_id) as visitors
-- FROM license_flow_analytics
-- WHERE event_type = 'page_view'
-- GROUP BY country
-- ORDER BY visitors DESC;

-- 6. Device breakdown
-- SELECT device_type, COUNT(DISTINCT session_id) as visitors
-- FROM license_flow_analytics
-- WHERE event_type = 'page_view'
-- GROUP BY device_type;

-- 7. Popular answer paths
-- SELECT answers, COUNT(DISTINCT session_id) as count
-- FROM license_flow_analytics
-- WHERE event_type = 'session_end' AND answers IS NOT NULL
-- GROUP BY answers
-- ORDER BY count DESC
-- LIMIT 20;

-- 8. Hourly traffic pattern (in visitor's local time)
-- SELECT EXTRACT(HOUR FROM local_time) as hour, COUNT(DISTINCT session_id) as visitors
-- FROM license_flow_analytics
-- WHERE event_type = 'page_view' AND local_time IS NOT NULL
-- GROUP BY hour
-- ORDER BY hour;