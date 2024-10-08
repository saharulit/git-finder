# GitHub User Search Application

## Overview

This is a simple web application for searching and displaying GitHub users. The application consists of a frontend built with React and a backend built with Express.js. Users can search for GitHub profiles, view their profile images, usernames, and the number of public repositories.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version 14 or later)
- npm (Node Package Manager)
- Git
- A GitHub developer token. If you have never created one before, follow these instructions: [Creating a GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

## Getting Started

Follow these instructions to get your application up and running.

### Clone the Repository

Clone the repository to your local machine:

git clone https://github.com/saharulit/git-finder.git
cd git-finder

### Setting Up the Backend
Create a .env file in the server directory and add your GitHub token:
GITHUB_TOKEN=your_github_token_here

### Start the Application
Run the following command to start both the backend and frontend simultaneously:

```
npm i
npm start
```
This endpoint retrieves user data including the username, profile image, and number of public repositories.

