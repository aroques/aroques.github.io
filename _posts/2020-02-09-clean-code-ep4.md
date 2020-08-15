---
layout: post
title: 'Episode 4: Function Stucture'
categories: [clean code, clean code fundamentals, software development]
date: 2020-08-09 14:24:00
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

- Switch statements (or long chains of if-else statements) create a fan of dependencys that make independent deployability virtually impossible. Can replace a switch statement (with polymorphism) by making an abstract base class with a method for whatever operation that the switch was performing. Then, you make a inheriting (derived) class for each statement. This inverts the source code dependencys. Typically create those instances in some kind of factory.
- Switch statements don't cause a problem if they are in a safe independently deployable plug-in module.
- Main and App partitions. Should be able to draw line between core app functionalilty and Main. Main should be kept small and should point torwards the app - it should plug-in to the app. This is called dependency injection.
- Want a system of independent deployable modules. A system that is independently deployable is also independently developable - teams can work independently.
- Paradigms: functional, structured, and object-oriented.
- Functional programming: First to be invented (1957) with LISP. Last to become popular. No assignment statements. Instead of setting value into variables, pass those values as arguments into functions. Instead of looping over variables you recurse thorugh a set of function arguments. Given same input, will always return same output. System state doesn't matter. No side effects.
- Side Effects: when a function changes system state outside of the function. Makes systems difficult to understand and consistent source of errors. Example, open before close, new before delete. This is called temporal coupling. Can eliminate temporal coupling by 'passing a block': having a function open a file, perform the operation, then close the file. This leaves the system in the same state that it was before. Our goal is not to eliminate side effects, but to impose discipline on where and when they happen. We want to be able to cause side effects like writing to files. 

```
// 'passing a block' example
f.open(); // becomes...
public void open(file f, fileCommand c) {
    f.open();       
    c.process(f);
    f.close();
}
```

- Command Query Seperation: successful discipline for managing side effects. A command changes the state of a system - it has a side effect. A query does not. A query returns the state of the system or the value of a computation. A command changes the state of the system and returns nothing. Getters and setters are a good example of this. If a command fails, throw an exception, don't return some error code.

```
int f();  // query, returns a value
void g(); // command, doesn't return a value



// example of bad command:
// why does the authorizer return the user?
// are we supposed to do something with that user?
User u = authorizer.login(username, password);
```

- Tell, don't ask. Tell objects to do the work, not ask objects what their state is. We don't want to ask an object's state and make decisions on it's behalf. It knows it's own state and can make it's own decisions.

```
// Example of tell, don't ask
// worst
if (user.isLoggedin())  
    user.execute(command);
else
    annunciator.promptLogin();

// better
try
    user.execute(command);
catch(User.NotLoggedIn e)
    annunciator.promptLogin();

// best - let user object handle it
user.execute(command, annunciator);
```

- The Law of Demeter: we want our functions to have limited knowledge of the system. The following code line violates this severely. Law of Demeter is tell don't ask. Formalized as, you may call methods of objects that are:
1. Passed as arguments
2. Created locally
3. Instance variables
4. Globals
You may not call methods on objects that are return from a previous method call.

```
// violates the law of demeter
o.getX().getY().getZ().doSomething();
```

- Structured Programming: the youngest of the three disciplines. OO came second between '62-'66. Structured didn't really come to fruition until Dijikstra published his 'GoTo considered harmful' paper in 1967. Says all algorithims should be composed of three basic operations: sequence, selection, and iteration. Can reason about code sequentially because each of the structures correctness does not depend on any of the others. A system that is provable to be correct, is an understandable system. All structures, algorithms, modules, systems, etc have a single entrance at the top and a single exit at the bottom.
- Early Returns: at beginning of function is no big deal. Early returns/breaks from loop makes the loop a whole lot more compilcated and harder to understand, so they should be avoided.
- Error Handling (with Stack Kata as an example): Michael Feathers once wrote: "Error handling is important, but if it obscures logic, it's wrong". 
- Errors First: always best to write error-handling code first so you don't end up with an implmentation that cannot handle errors well.
- Prefer exceptions over returning values. Scope exception to the class that throws it and contain as much info as possible. Don't use checked exceptions - derive exceptions from RuntimeException. Name and context of the exception should be mostly informational enough and shouldn't need a big message, if any.
- Special cases: Zero capacity stack - used a factory pattern to implement null object pattern and return a ZeroCapacityStack object. Top() should throw an exception, rather than return NULL, since NULL would be unexpected. Find() returns NULL because it is excepted, meaning the value wasn't found.
- Trying is one thing: there should only be only one line of could inside try block and the function should end after the catch and/or finally blocks.