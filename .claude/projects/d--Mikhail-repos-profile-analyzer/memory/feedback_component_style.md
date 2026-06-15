---
name: feedback_component_style
description: User prefers export const arrow function style for React components
metadata:
  type: feedback
---

Use `export const ComponentName = () =>` (arrow function) instead of `export function ComponentName()` for all React components.

**Why:** User preference for consistency — arrow functions are consistent with how other constants are declared in the file.

**How to apply:** Every React component in this project should be written as `export const Name = (props): JSX.Element =>` or with typed props interface + arrow function.
