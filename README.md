# Github Repo Explorer

## What is it?

A simple app to search for GitHub users and explore their public repositories.

## Installation

### Before Installation

This app requires a Github access token to function. You can generate your own Github access token by following instructions in this article [Managing Your Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

### Installation Steps

1. Clone the latest version of this repository.
2. Create `.env` file in the root directory and add the following variable
   ```
   VITE_GITHUB_ACCESS_TOKEN=[your-github-acces-token]
   ```
3. Install dependencies by running
   ```
   npm install
   ```

## Running the Development Server

To start the development server, run this command:

```
npm run dev
```

Then open this URL on your browser [`http://localhost:5173/github-repo-explorer`](http://localhost:5173/github-repo-explorer)

## Building for Production

To build for production, run this command:

```
npm run build
```

To preview the built version, run this command

```
npm run preview
```

You can access the preview on this URL [`http://localhost:4173/github-repo-explorer`](http://localhost:4173/github-repo-explorer)
