---
layout: post
title: 'Episode 10: The Open-Closed Principle'
categories: [clean code, clean code solid principles, software development]
date: 2020-11-28 13:00:00
---

#### Description

The moral center of software architecture.

That's how Uncle Bob describes the Open-Closed Principle (OCP). In this episode, you'll learn all about Bertrand Meyer's remarkable insight into Object-Oriented Design and the motivation behind good Software Architecture.

We'll discuss how it's possible for the source code of a system to be open for extension, but closed for modification. Then we'll show you how to construct designs that conform to that principle.

Next, we'll look at a truly awful design that violates the OCP and we'll show how that violation creates the design smells of Rigidity, Fragility, and Immobility.

Then, we'll present a truly elegant and beautiful design that conforms to the OCP. This design will startle you with its essential simplicity, dazzle you with its suave construction, and enamor you with its incredible flexibility. After seeing it, you'll begin to believe that software can be open for all extension and yet closed for all modification!

Then, we'll break your heart by showing you why the promise of the OCP is, in fact, a big lie. We'll tear that elegant design to shreds, and we'll show you why all that protection it claimed to offer was an illusion that depended upon prescience and perfect foresight. In the end, we'll shatter your hopes and dreams in software design.

Then, we'll resurrect those hopes and dreams by describing a development process that helps to restore the truth behind the promise of the OCP. We'll show you that you can, in fact, make designs that conform to the OCP, if not in whole, then at least in part. We'll describe the disciplines that will help you to take the greatest advantage of the OCP.

So, sit yourself down and settle on in, because after we learn about the Quantum Discontinuity, we're going to open the can of worms called the Open Closed Principle.

<!--more-->

#### My Notes
- A software module should be open for extension but closed for modification
- Open for extension: easy to change that module
- Closed for modification: the source code shouldn't change
- Whenever you have a module who's behavior you'd like to extend without modifying, separate the extensible behavior behind an abstract interface and invert the dependencies. Like the Copy module and File interface (implemented by IO devices like printer or keyboard)
- If you wish to change the behavior of an existing OC module, then you can do so by adding new code, not by changing existing code
- Customers like adding features would be adding new code, not changing existing code, so this lines up with their thinking
- A contains relationship is a dependency
- Good expense report example at 37:00
![Expense Report Architecture](/img/posts/expense-report-architecture.png 'Expense Report Architecture')
- Crystal ball problem: open closed only works if you can perfectly predict the future and know which dependencies are going to change then invert those dependencies before the change (that will be requested) is requested.
Two Solutions:
- Big Design Up Front (BDUF): think of everything up front and create abstractions. Bad because a lot of them may not be needed. Abstractions can be hard to follow and make cause and effect hard to see, so want to minimize abstractions
- Agile Design: create and MVP and make abstractions as necessary