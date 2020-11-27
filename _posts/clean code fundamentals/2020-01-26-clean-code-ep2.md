---
layout: post
title: 'Episode 2: Names++'
categories: [clean code, clean code fundamentals, software development]
date: 2020-01-26 19:32:00
---

#### Description

So, you think this is just going to be like the second chapter of the Clean Code book? Think again! This is a completely different take on the topic. Oh, the goal is the same, certainly; but there are things covered in this video that were never mentioned in the book. And even those things that are similar are covered in a very different way. So, even if you've read Clean Code fifty times over, this episode will give you more to think about.

In this 40+ minute episode, Uncle Bob will take you from the Earth to the Sun and then into the bowels of the Earth. You'll visit idyllic countrysides, urban back alleys, graffiti-laden East London side streets, and even the Wild West as you explore the principles of names in your code.

Despite the scenery, Uncle Bob never lets up on driving each point home so they become part of your daily discipline. He begins with the exhortation that names are not just a convenience for the programmer; they are the most powerful tool that programmers have to communicate with each other. Then he dives into a discussion on how to use names to Reveal Your Intent and Avoid Disinformation.

From one code example to the next (showing up in the most unlikely places), you'll see Uncle Bob point out examples of bad names and good names. He'll explain why the good names are good, why the bad names are bad, and how to improve them.

Uncle Bob will tell you how encoding schemes like Hungarian Notation began, and why you don't want to be using them in the twenty-first century. He'll go on to stress the importance of choosing names that make your code read like well-written prose.

Finally, Uncle Bob will tell you about The Scope Rule which will guide you in choosing function, class, and variable names of the appropriate length for the scope that contains them.

So, don't wait! If you want to be a Clean Coder, and if you want to improve your skill and discipline, then hit the button and watch this episode now.

<!--more-->

#### My Notes

- Names should reveal intent
- Avoid disinformation
- Name should be pronouncable
- Avoid encodings like Hungarian notation. No need to add prefixes to indicate the type like bIsOpen or p_PrivateMemberVariable. IDEs can handle that now.
- Classes and varibles are nouns
- Methods and functions are verbs
- Booleans should be predicates (ex: isEmpty)
- The scope rule: variables in short scopes should have short names.
  In a longer scope? Have a longer name.
- Public methods should be short since they will be called from different placed and we want calling them to be convenient (private methods can be longer since they will only be called few times and act as good documentation).
- Same rules apply for public and private class name. Note that derived classes tend to be longer (ex: Savings Account that derives from Account)
