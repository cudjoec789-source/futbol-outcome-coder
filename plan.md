# Football Match Analysis & Booking Code Generator Plan

The goal is to create a frontend-only React application that allows users to analyze football matches (potential outcomes) and generate "booking codes" (simulated) based on those analyses. Since there is no database/Supabase, all data will be handled via local state and mocked data.

## Scope Summary
- **Match Selection**: A list of upcoming/current football matches.
- **Analysis Interface**: Allow users to select potential outcomes (Home Win, Draw, Away Win, Over/Under, etc.).
- **Booking Code Generation**: A feature to "generate" a code based on the selected outcomes.
- **Local Persistence**: Save user's analysis history to `localStorage`.
- **UI/UX**: Modern, mobile-responsive dashboard using Tailwind CSS and shadcn/ui.

## Non-Goals
- Real-time live scores from an external API (unless a free/demo API is easily accessible; otherwise, use mock data).
- Actual betting/real money transactions.
- User accounts/authentication (server-side).
- Connecting to real bookmaker APIs.

## Assumptions & Open Questions
- **Data Source**: We will use a robust set of mock football data (teams, leagues, matches).
- **Booking Code**: This will be a randomly generated alphanumeric string associated with the user's selections.
- **Analyses**: The "analysis" will be a user-driven selection process (predicting results).

## Affected Areas
- **Frontend**: All UI components, state management (React hooks), and localStorage logic.
- **UI Components**: Cards for matches, forms for predictions, lists for historical analysis.

## Implementation Phases

### Phase 1: Project Setup & Mock Data
- Define the data structure for Matches, Predictions, and Booking Codes.
- Create a `mockData.ts` file with sample football matches across different leagues.
- **Owner**: `frontend_engineer`

### Phase 2: Match Dashboard
- Build a dashboard to display matches categorized by league or date.
- Implement search/filter for matches.
- **Owner**: `frontend_engineer`

### Phase 3: Analysis & Selection Logic
- Create a "Slip" or "Analysis" side-panel/modal.
- Allow users to click matches to add predictions (e.g., Team A to win).
- Calculate "Potential" or "Confidence" (simulated).
- **Owner**: `frontend_engineer`

### Phase 4: Booking Code Generation
- Implement a "Generate Code" button.
- Create a logic to transform the selection into a unique-looking booking code.
- Display the code with a "Copy to Clipboard" feature.
- **Owner**: `quick_fix_engineer`

### Phase 5: History & Persistence
- Save generated codes and their associated match analyses to `localStorage`.
- Create a "History" view to see previous analyses.
- **Owner**: `frontend_engineer`

### Phase 6: Final Polish & Responsive Design
- Ensure the app looks great on mobile (crucial for sports apps).
- Add animations/transitions for adding matches to the analysis slip.
- **Owner**: `frontend_engineer`

## Sequencing Constraints
- Phase 1 must be completed before UI development.
- Phase 3 is a prerequisite for Phase 4.
- Phase 5 can be done in parallel with or after Phase 4.
