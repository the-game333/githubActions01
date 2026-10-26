# GitHub Actions Demo: developer → QA → main

A small Node.js/Jest project with separate GitHub Actions checks.

## Workflows

- `.github/workflows/developer-tests.yml`: runs on pushes to `developer` and pull requests targeting `developer`; runs `npm test`.
- `.github/workflows/qa-tests.yml`: runs on pushes to `qa` and pull requests targeting `main`; runs the QA suite with `npm run test:qa`.
- `.github/workflows/test.yml`: the existing main workflow; runs tests on pushes to `main` and then attempts deployment using `secrets.RENDER_DEPLOY_HOOK`.

## Create and push the branches

Run these commands from your local repository (after extracting/copying these files into it):

```bash
git switch main
git pull origin main
git switch -c developer
git add .
git commit -m "Add developer and QA GitHub Actions workflows"
git push -u origin developer

git switch main
git switch -c qa
git merge developer
git push -u origin qa
```

For normal work, push commits to `developer`, then open a pull request from `developer` into `qa`. After QA validation, open a pull request from `qa` into `main`. Do not merge directly into `main`.

## IMPORTANT: enforce QA success before merging to main

Workflow YAML alone cannot block merges. Configure a ruleset or branch protection rule in GitHub:

1. Open **Settings → Rules → Rulesets** (or **Settings → Branches → Add branch protection rule**).
2. Target branch name pattern: `main`.
3. Enable **Require a pull request before merging**.
4. Enable **Require status checks to pass before merging**.
5. Select the status check named **QA tests** (job name in `qa-tests.yml`). If it is not listed yet, push the workflow and open a PR into `main` first, then return to settings.
6. Enable **Do not allow bypassing the above settings** if appropriate for your repository.
7. Save the ruleset/rule.

The QA workflow runs on pull requests targeting `main`, so the required check validates the exact proposed merge. The workflow also runs on pushes to `qa`. A successful QA run on the branch alone is not a substitute for the required PR check.

## Secrets / deployment

The existing main workflow uses `secrets.RENDER_DEPLOY_HOOK`. Add this under **Settings → Secrets and variables → Actions** if you use Render. If you do not use Render, remove or disable the deploy job in `.github/workflows/test.yml`.

## Run locally

```bash
npm ci
npm test
npm run test:qa
```
