# 🚀 Git Workflow & Contribution Guidelines

This document defines the branching strategy, roles, and workflow to ensure smooth collaboration and stable deployments.

---

## 🎨 Design Resources

- **Figma Design:** [Illumine 26 1st draft](https://www.figma.com/design/jici7gUAt3WRdFvBYtCTH0/illumine--26-1st-draft?t=4f9BBUg3ZSmyrxJa-0)
- **Note:** Please send a request for access to view the design if you don't have it already.

---

## 🌳 Branch Architecture

### Core Branches

- **`main`**
  - Production branch
  - Used strictly for deployment/hosting
  - 🔒 Direct commits and PRs are NOT allowed

- **`QA`**
  - Integration and testing branch
  - All development work must be merged here first

---

## 🔁 Development Workflow

1. Create your personal branch from `QA`
2. Work on your feature/fix
3. Push your branch to the repository
4. Raise a Pull Request (**PR**) → target: `QA`
5. Get your code reviewed
6. PR gets merged into `QA` after approval
7. Selected members will later merge `QA` → `main` for deployment

---

## ⚠️ Important Rules

- ❌ No PRs to `main`
- ✅ All PRs must target `QA`
- ✅ Always pull latest `QA` before starting new work
- ✅ Keep PRs small and focused

---

## 👥 Roles & Permissions

### 🧑‍💻 1st-Year Students
- Create branches
- Write code
- Raise PRs to `QA`
- ❌ Cannot merge PRs

### 🧑‍🔬 2nd & 3rd-Year Students
- Review PRs
- Approve changes
- Merge PRs into `QA`

### 🔐 Maintainers
- Merge `QA` → `main`
- Handle deployments

---

## 🏷️ Branch Naming Convention

### Format

<firstname><first letter of last name>_it_<ug or pg>_<graduation_year>

### Example

debarunp_it_ug_2028

---

## 🛠️ Branch Creation

```bash
git checkout QA
git pull origin QA
git checkout -b <branch_name>
```
---

## 📤 Pushing Your Branch

```bash
git add .
git commit -m "Your message"
git push origin <branch_name>
```
---

## 🔍 Pull Request Guidelines

- Use a clear and meaningful title
- Describe:
    * What you did
    * Why you did it
    * Any edge cases handled
- Attach screenshots (if UI changes)
- Keep PRs concise

---

## ✅ Review Checklist (For Reviewers)

- Code correctness
- Readability & structure
- No unnecessary complexity
- Proper naming conventions
- No breaking changes

---

## 🚨 Common Mistakes to Avoid

- Raising PR to main
- Not pulling latest QA before starting
- Large, unstructured PRs
- Poor commit messages

---
