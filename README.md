# Linear Cycle Burndown Demo

A small Next.js app that visualizes a cycle burndown for any Linear team using the Linear TypeScript SDK. Linear deliberately doesn't surface burndown charts in their UI — I wanted to learn their API by building one for my own active cycle.

The chart shows the sum of all issues assigned to the current cycle for a team. Typically each issue is assigned an "estimate" which is basically a unit of measurement for the difficulty but as a V1 for this project, a value of 1 is assigned to each issue. The chart plots two lines: one that projects an "ideal" timeline for work to be completed and one that shows the "actual" work remaining from start to end of the cycle.

![Torrence's Team Burndown for current cycle](./public/burndown-chart.png)

## Design Choices

1. For V1, Assigned a value of 1 to each issue. For the next iteration, estimates will be assigned to issues for a more accurate snapshot.
2. Assigned Linear API Key to environment variable and stored in a .env.local file.
3. The chart only shows burndown for the current cycle. V2 will display a tabbed layout with the ability to view Burndown charts for all cycles.
4. "Completed" and "Canceled" issues are lumped into one but in the future, Canceled will be excluded from the total work.

## Getting Started

1. Clone this repo to your local machine:
   `git clone https://github.com/TorrenceB/linear-integration.git`

2. Once you have the repo, navigate to the root of the project and install dependencies:
   `npm install`

3. Create a `.env.local` file in the root of the project. Add a new environment variable named `NEXT_PUBLIC_LINEAR_API_KEY`. If you already have a Linear API key, skip steps 2 - 5, otherwise:
   1. Login to the Linear Desktop or Browser app.
   2. Click on your team name in the upper left hand corner.
   3. Navigate to Settings => Security and Access
   4. Under Personal API Keys section, click New API Key.
   5. Create a new API key, make sure to assign yourself full access under permissions.
   6. Assign the API key to `NEXT_PUBLIC_LINEAR_API_KEY` in your `.env.local` file.

4. If you haven't already, create a few issues in Linear and assign them to a cycle. To test the Burndown chart is working correctly, set one issue status to "completed".

5. Finally run the development server:
   `npm run dev`

## Takeaways

1. The Developer API Changelog is updated daily, sometimes multiple times a day adhering to Linear's operating principle #1, ship early. As a developer building around the Linear API, it's extra important to be proactive about using static data typing and leveraging Linear's schema to catch attributes that have been added/removed.

2. Issue descriptions are optional in the data model, not just in the UI. That mirrors their 'Write Clearly and Directly' guidance in [Write Issues Not User Stories](https://linear.app/method/write-issues-not-user-stories) — that the title should carry the meaning and a description is something you add only if you need to. The product philosophy is encoded in the schema.

3. The mental model of the API maps directly to what they're referred to in the Linear Interface. There's no guessing game as to what the data for a specific attribute is named. For example:

- Cycles are called "Cycle" in the Schema, not "Sprint".
- Issue types have a clearly defined set of values, e.g "in progress", "todo", "backlog", etc. This makes it easy to write code against the meaning rather than an arbitrary name that you have to constantly reference.

Linear's API is not a thin REST wrapper around their PostgreSQL Database; it's a unified model that aligns with their methodology.

## V2 and Beyond

1. Assign actual estimates to each issue. This will paint a more accurate picture of what Cycle progress looks like.
2. Separate "Completed" and "Canceled" statuses. Including canceled issues in burndown can cloud the accuracy of the chart.
3. Improve UI to support viewing all team Cycles rather than the most current one.
4. Group the Burndown chart by project rather than joining all issues together.
