## AirCall Application

This application is designed to manage call logs, allowing users to view, archive, unarchive, and filter calls based on various criteria. The app also provides role-based filtering to display relevant calls to different users.

## Table of Contents

-[Features](#Features)

- [Setup Instructions](#setup-instructions)
- [Usage](#Usage)
- [Components](#Components)
- [API](#API)

# Features

View Calls: Display all calls, missed calls, answered calls, and archived calls.
Archive and Unarchive: Archive all calls or individual calls and unarchive them.
Role-Based Filtering: Display calls relevant to the user's role.
Search and Filter: Search for calls by number and filter calls based on type.
Undo Actions: Undo the last archive action using a Snackbar notification.

You have the choice to be an Owner (3 different owners created) or an Admin.
Owner: can view its specific calls in the inbox tab
Admin: can view the calls from the users in the inbox tab.

Here are the login details:
Owner 1
Email: owner1@example.com
Password: OwnerPass1!

Owner 2
Email: owner2@example.com
Password: OwnerPass2!

Owner 3
Email: owner3@example.com
Password: OwnerPass3!

Admin
Email: admin@example.com
Password: AdminPass1234&
For security, type the password AdminPass1234& twice.

The tabs are explained as follow:

Activity tab: Displays all active (non-archived) calls with an option to archive all calls.
It displays right off the bat the inbound, outbound calls.
Call details displayed when the call is clicked

Inbox tab: A subset of calls (e.g., missed or answered calls) based on specific criteria.
We'll ensure that Owner 1 sees calls from/to 1, Owner 2 sees calls from/to 2, Owner 3 sees calls from/to 4, and Admin sees all calls except archived ones.

All Calls tab: All calls, both active and archived.
It displays the call direction - inbound or outbound call depending on the icon used.
It displays the call if it was missed or answered depending on the icon used.

Archived tab: Display only archived calls with an option to unarchive all calls.

## Setup Instructions

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

### Cloning the Repository

To clone the repository, run the following command in your terminal:

```bash
https://github.com/Nourakab/c79040f8.git

## Installing Dependencies
Navigate to the project directory and install the necessary dependencies:
cd c79040f8
npm install

## Setting Up Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:

env
Copy code
REACT_APP_USER_1_NAME="Owner 1"
REACT_APP_USER_1_ROLE="Owner"
REACT_APP_USER_1_EMAIL="owner1@example.com"
REACT_APP_USER_1_PASSWORD="OwnerPass1!"


REACT_APP_USER_2_NAME="Owner 2"
REACT_APP_USER_2_ROLE="Owner"
REACT_APP_USER_2_EMAIL="owner2@example.com"
REACT_APP_USER_2_PASSWORD="OwnerPass2!"


REACT_APP_USER_3_NAME="Owner 3"
REACT_APP_USER_3_ROLE="Owner"
REACT_APP_USER_3_EMAIL="owner3@example.com"
REACT_APP_USER_3_PASSWORD="OwnerPass3!"


REACT_APP_USER_4_NAME="Admin User"
REACT_APP_USER_4_ROLE="Admin"
REACT_APP_USER_4_EMAIL="admin@example.com"
REACT_APP_USER_4_PASSWORD="AdminPass1234&"



## Running the Project
To start the development server, run the following command:
npm start

This will start the development server and you can view the application by navigating to http://localhost:3000 in your web browser.

# Usage

Navigate to the Home Page: View all calls and use the tabs to switch between different call views.
Archive Calls: Click on the "Archive All" button to archive all displayed calls.
Unarchive Calls: Go to the "Archived" tab and click "Unarchive All" to restore all archived calls.
Search and Filter: Use the search bar to find specific calls and the filter buttons to filter calls by type.
Undo Actions: Use the Snackbar's "UNDO" button to revert the last archive action.

# Components

HomePage
The main component that renders the header, tabs, action buttons, and the ActivityFeed component.

ActivityFeed
Handles displaying the list of calls based on the current tab and search/filter criteria. Also handles archiving calls and displaying the Snackbar.

ArchiveAllButton
A button component to archive all displayed calls.

UnarchiveAllButton
A button component to unarchive all archived calls.

TabsComponent
Handles the tab navigation between different call views.

UndoButton
A button component to undo the last archive action.

CallList
Displays the list of calls grouped by date and filtered based on the user's criteria.

Snackbar
A notification component to show messages and actions (like undo).

# API
The app interacts with the following API endpoints:

GET /activities: Fetch all call activities.
PATCH /activities/
: Update a call activity (archive/unarchive).
PATCH /reset: Reset all calls to unarchived state.
```
