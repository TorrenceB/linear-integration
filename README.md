# Linear Cycle Burndown Demo

A small React.js app that integrates the Linear API. Torrence's Sandbox is a team created in the Linear App and contains issues that have been assigned to a cycle. The team's cycles are retrieved from the API and displays the cycle's issues in a Burndown Chart.

This project acheives three goals:

1. Integrate Linear TypeScript Client into Torrence's Sandbox React App.
2. Map existing Linear project issues to Cycle Burndown Chart.
3. Become familiar with and apply at least 3 Linear Domain Models to codebase:

   a. Cycle
   
   b. Issue
   
   c. Team

## Getting Started

1. Clone this repo to your local machine:
   `git clone https://github.com/TorrenceB/linear-integration.git`

2. Once you have the repo, navigate to the root of the project and install dependencies:
   `npm install`

3. Finally run the development server:
   `npm run dev`

## Takeaways

1. The API Changelog is updated daily, sometimes multiple times a day. This adheres to Linear's operating principle #1, ship early and method of "Build in public".
2. Some of the object types don't include a description. This applies to the "Write Issues" method that states descriptions should be optional; "the title should be easy to scan" and "write only as much as you need to share".
3. The mental model of the API maps directly to what they're referred to in the Linear Interface. There's no guessing game as to what the data for a specific attribute is named. E.G Issue => Issue, not Issue => Task
