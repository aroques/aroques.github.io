---
layout: post
title: 'Episode 4: Function Stucture'
categories: [clean code, clean code fundamentals, software development]
date: 2020-02-09 19:50:00
---

#### Description

In this episode, Uncle Bob enlists the help of the craftsmen at 8th Light, Inc. to expose how functions should be organized and structured. Topics range from error handling and the debate over checked exceptions, to functional programming and the discipline of Command-Query separation. He talks about the OO and Structured paradigms, and discusses why the Law of Demeter is so important. He tells you why switch statements should be avoided, and what to do when you can't avoid them.

In fact, it's really quite startling where this lesson goes. You wouldn't think that the simple topic of function structure would lead you into high-level discussions of architecture and team management, but they do. So you'll learn about the importance of independent develop-ability, and some of the theory behind modular and plugin structure and partitioning. Did you know, for example, that the main program should be a plugin to the rest of the application?

What's the trick to avoiding a morass of XML files that feed the insatiable maw of your dependency injector? How can you avoid temporal couplings by "passing a block"? What number and types of arguments should a function have? And, is Structured Programming really still important nowadays?

So set aside 90 minutes and get ready for a while ride through some lectures and code. Function Structure is about to begin!

<!--more-->

#### My Notes
- How many function arguments? 3 arguments max, fewer are better.
- If 3 arguments are so cohesive that they can be passed into a function, then why aren't they a class? Bob feels same way about constructor arguments. He'd rather use a bunch of setters (or another guy mentioned using a builder pattern or passing a object/struct).
- No boolean arguments ever. Your loudly saying this function does 2 things. instead write 2 functions: 1 for the true case and 1 for the false case.
- Innies not outies. No output arguments please, they're not expected.
- The null defense. Don't handle nulls parameters inside functions. Write two functions - 1 that doesn't take the param and 1 that does. Handling nulls inside functions is basically a psuedo-boolean.
- The Stepdown Rule: important stuff at top, details torwards bottom. public torwards top, private torwards bottom. function calls should point down. order functions in the order that they are called and in the order of their hierarchy: keep listing children function until no more exist, then start at next parent function. What if two public functions? Then, put at the end of the first public function's calls.
- C++ used to have 'scissors rule': public at top, private at bottom, then could cut off public and hand to users. Java puts private members at top so doesn't follow this.
- Switches and Cases:
- One thing that OO does very well is manage dependencies. See module A calls a function held in module B. So at runtime, A depends on B. Can't deploy seperately. Any change to module B will force a recompile (and redeployment) of module A.

```
                     +------------->
+------------+    source code dependency   +------------+
|            |                             |            |
|            |                             |            |
|            |                             |            |
|     A      |       +------------->       |     B      |
|            |                             |            |
|            |                             |            |
|            |                             |            |
+------------+     run time dependency     +------------+
                     +------------->
```

- Having module B inherit from an interface changes the direction of the source code dependency (at least from the perspective of module B). Each module can now be deployed independently. Module A knows nothing of module B. Module B plugs into A. In fact, many different module Bs can plug into A.

```
                     <-------------+
+------------+    source code dependency   +------------+
|            |                             |            |
|            |          +-------+          |            |
|            |          |       |          |            |
|     A      |  +-----> |   I   | <-----+  |     B      |
|            |          |       |          |            |
|            |          +-------+          |            |
|            |                             |            |
+------------+     run time dependency     +------------+
                     +------------->
```

- Switch statements (or long chains of if-else statements) create a fan of dependencys that make independent deployability virtually impossible. Can replace a switch statement by making an abstract base class with a method for whatever operation that the switch was performing. Then, you make a inheriting (derived) class for each statement. This inverts the source code dependencys. Typically create those instances in some kind of factory.
- Switch statements don't cause a problem if they are in a safe independently deployable plug-in module.
- Main and App partitions. Should be able to draw line between core app functionalilty and Main. Main should be kept small and should point torwards the app - it should plug-in to the app. This is called dependency injection.
- Want a system of independent deployable modules. A system that is independently deployable is also independently developable - teams can work independently.
- Paradigms: functional, structured, and object-oriented.
- Functional programming: First to be invented (1957) with LISP. Last to become popular. No assignment statements. Instead of setting value into variables, pass those values as arguments into functions. Instead of looping over variables you recurse thorugh a set of function arguments. Given same input, will always return same output. System state doesn't matter. No side effects.
- Side Effects: when a function changes system state outside of the function. Makes systems difficult to understand and consistent source of errors. Example, open before close, new before delete. This is called temporal coupling. Can eliminate temporal coupling by 'passing a block': having a function open a file, perform the operation, then close the file. This leaves the system in the same state that it was before. Our goal is not to eliminate side effects, but to impose discipline on where and when they happen. We want to be able to cause side effects like writing to files. 
- Command Query Seperation:

stopping at 47:30