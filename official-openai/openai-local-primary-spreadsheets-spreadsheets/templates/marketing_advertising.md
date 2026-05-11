## Marketing/Advertising Guidance

### Tab structure
- Default to splitting data and analysis, with separate "Source Data" tab (e.g., an export of ad performance or web analytics data), one or more "Analysis" tabs (where pivot tables, lookup tables, or calculations summarize the raw data), and a Dashboard/Report tab that presents key results and charts for stakeholders.
- Clearly name tabs by content (e.g., â€œLeads_Q1_2025â€, â€œPipeline Analysisâ€, â€œROI Dashboardâ€) so that users can easily find inputs versus results.

### Cell formatting
- Highlight key performance metrics to make them stand out. Use consistent coloring or emphasis for important numbers. For instance, you might shade cells green for metrics that hit target and red for those below target.
- Include a color key with text to ensure meaning is clear
- Bold fonts and borders can draw attention to total figures or summary KPIs.
- Input cells (e.g., cells where a user can adjust an assumption like a growth rate or a budget allocation) can be given a distinct fill color (such as light yellow), so that planners know what fields they can edit.
- For metrics, ensure formatting matches common practice and is legible, e.g. percent metrics with one decimal and a % sign, currency with appropriate symbols and no excessive decimals, and so on, for professional appearance.
- If the spreadsheet serves as a report, you should incorporate the companyâ€™s branding colors in charts or headers.


### Marketing Analysis
- Formula clarity is important. Keep formulas straightforward (SUMIFS, COUNTIFS) and avoid overly complex nested IF logic for scenarios. Instead, consider a separate table mapping conditions to outcomes.
- Leverage pivot tables or summary functions to aggregate data by campaign, channel, etc., rather than a tangle of manual formulas.
- For time series, keep a helper column with Excel dates converted to ISO YYYY-MM-DD so the sheet can be pushed to BI tools without reformatting.

### Raw data vs. outputs
- Keep raw data, including import data, intact and separate from any modifications
- Any cleaning (like removing test entries or combining categories) should be done in an adjacent column or in a processing sheet, so the original dump remains as a source of truth. Then use references or pivot tables to feed your analysis. This way, if new data arrives (say, next monthâ€™s metrics), you can paste it into the Data tab and refresh the analysis easily.
- The Output or Dashboard sheet should pull its figures from the analysis/calculation layer, not directly from raw data scattered around, to avoid errors.
- Include charts or graphs on the output sheet to visualize trends in impressions, click-through rates, conversion funnels, etc., for which the underlying data might reside in hidden supporting sheets or off to the side.


### Metadata and sources
- Marketing analytics often involves combining data from multiple sources (ad platforms, surveys, sales figures). Always document these sources. For example, label a data column â€œFacebook Ads â€“ Impressions (source: Ads Manager export on 2025-05-01)â€ or have a small note on the dashboard: â€œData Sources: Google Analytics, CRM database (as of Apr 2025).â€ This gives context to the numbers and their freshness. Include time frames and units in your labels â€“ e.g., â€œBudget (USD)â€ or â€œWeekly Reachâ€.
- Label any assumptions clearly
- Consistency is also key: if â€œCPCâ€ means cost per click, ensure itâ€™s defined somewhere or obvious from context, so everyone reading the sheet interprets metrics correctly.
