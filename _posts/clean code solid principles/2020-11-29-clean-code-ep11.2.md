---
layout: post
title: 'Episode 11.2: The Liskov Substitution Principle'
categories: [clean code, clean code solid principles, software development]
date: 2020-11-29 17:53:00
---

#### Description

Oh no! Not the Liskov Substitution Principle! Not that! Please! Anything but squares and rectangles and type and subtypes. Katie, bar the door! Mabel, hide the kids. Somebody run for the Marshall. Tell him: LSP is coming!

That's right, in this episode (after a brief diversion through wave/particle duality) Uncle Bob takes on the dreaded Liskov Substitution Principle. He'll tell you all about the history of the theory of types, including Russell's paradox, and Turing's revelations. He'll show how this theory influenced early computer languages like Algol, Fortran, Cobol, and even C++.

Then Uncle Bob will introduce you to Barbara Liskov, and the principle of substitutability that she wrote about back in 1988. He'll describe that principle in terms of modern languages like Java and Ruby, and he'll show how it relates to Martin Fowler's code smell of "Refused Bequest".

Then he'll dive into the favorite old conundrum of the squares and rectangles, and he'll show that inheritance is not what it appears to be, and certainly not what you have been told it is. He'll teach you about the Principle of Representatives and the implications it has for sub-typing and inheritance. And you Ruby programmers won't get off scott free either! He's got plenty to say to you about subtypes in dynamic languages.

Next, Uncle Bob will show you the cost of violating the LSP and will present heuristics and techniques for identifying potential violations, and for correcting existing violations. On the way he'll talk about the dreaded 'if instanceof' statement. He'll show why it is dangerous, and when it is appropriate.

Then, true to form, Uncle Bob will present a case study of a subtle LSP failure, and the horrific consequences it causes. You won't want to miss this part. By the time he's done you'll be hunting all through your code trying to find and repair potential LSP violations in order to prevent all the nasty 2AM phone calls you will otherwise receive.

So let the horses out of the corral, batten down the hatches, and run for the storm cellar, because LSP has arrived!

<!--more-->

#### My Notes
Helpful Heuristics
- If the base class does something, the derived class must do it too and must do it a way that does not violate the expectations of the callers.
- Can never take behavior a way from a sub-type. A sub-type can always do more than its parent type, but it can never do less.
- Hints are when an implemented function always throws an exception or does nothing. Especially if the base class implementation does something.
- 'is instance of' statements usually indicate LSP violation.
- Unless, we're checking the type and we already know that it is true (but the compiler has forget), like below:
![Is Instance Of Use](/img/posts/is-instance-of-use.png 'Is Instance Of Use')
- No new information was added. The function needed to know about the HourlyEmployee regardlessly.
- However, type cases (switch statements based on the object's type) are usually caused by LSP violations and should be replaced with polymorphic dispatch
- Inheritance breeds rigidity because each sub-type inherits all it's parent's fields, methods, and dependencies
- This isn't true for dynamic languages because they don't rely on inheritance from sub-typing. This is one of the reasons why these languages have been becoming more popular. They can fail during runtime for errors that could be caught (via static analysis) by a type-safe compiler, but TDD can help alleviate this problem. Our behavior square-rectangle problem though, could not be caught by a compiler.
Bertrand Russel though of Design by Contract for dynamic type safety:
- Every type has certain invariants that can be stated as boolean expressions that must always be true. Ex: Square, this.width == this.height
- Every function can be surrounded be pre and post conditions. Conditions that must be true before and after a function is called.
- TDD is a more general, but perhaps less rigorous way and is the primary way used today to prevent dynamic type errors.
- Good dial-up and dedicated modem example of LSP violation at 20min 
![Fragile Modem](/img/posts/fragile-modem.png 'Fragile Modem')
![Modem Solution](/img/posts/modem-solution.png 'Modem Solution')