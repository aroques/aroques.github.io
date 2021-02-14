---
layout: post
title: 'Clean Code Fundamentals'
categories: [clean code, clean code fundamentals, software development]
date: 2021-02-14 09:25:00
---

#### Names
- Should reveal intent
- Avoid disinformation
- Should be pronounceable
- Avoid encodings like Hungarian notation. No need to add prefixes to indicate the type like bIsOpen or p_PrivateMemberVariable. IDEs can handle that now.
- Classes and variables should be nouns
- Methods and functions should be verbs
- Booleans should be predicates (ex: isEmpty)

<!--more-->

#### Name Length
- **The scope rule**: variable name length should correlate with scope length. I.e., variables that are in small short scopes should have small short names and variables that are in a larger longer scopes should have larger longer names.
- **Public method names** should be short since they will be called from different placed and we want calling them to be convenient. 
- **Private method names** can be longer to serve as good documentation and since they will only be called few times.
- The same naming rules for method names apply for **public and private class names**. Public class names should be shorter and private names can be longer. Note that derived classes tend to be longer (ex: Savings Account that derives from Account)
