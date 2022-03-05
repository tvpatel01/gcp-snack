# gcp-snack

# Setup Git/GitHub

## Step 1 - Create a new repository
Perform this step in 'GitHub' and copy github https url (i.e. https://github.com/<your_repo>/<repo_name>.git)

## Step 2 - Initialize Git
Perform this step in the directory where you created a new project. Root of the folder, execute `git init`. 

## Step 3 - Add file(s) to be managed by GIT
Create `.gitignore` file and specify file(s)/directory(ies) that you don't want GIT to manage. Once done, tell git to manage remaining files by running `git add **`

## Step 4 - Commit file(s)
Run `git commit -m "Initial check-in"`. 

## Step 5 - Connect GIT to GitHub
Run `git remote add origin https://github.com/tvpatel01/gcp-snack.git`

## Step 6 - Push code to GitHub
run `git push -u origin main`
