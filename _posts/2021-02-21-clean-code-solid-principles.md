---
layout: post
title: 'Clean Code Solid Principles'
categories: [clean code, clean code solid principles, software development]
date: 2021-02-21 08:49:00
---

### Foundations
- The source code is the design. Just like other engineers produce documents that specify how to build things, software engineers write source code and then compile that code to build the finished product (the executable).
- The diagrams are not the design. The source code is the design.
- Unlike houses or mechanical parts, software is cheap to build and fix or change after the fact. 

###### Design Smells 
- **Rigidity** is the tendency of a system to be hard to change. A system is hard to change when the cost to change the system is high. For instance, a system with a slow 3 hour build time. A change in one module should not force other modules to be rebuilt.
- **Fragility** is when a small change to one module causes other unrelated modules to misbehave.
- **Immobility** is when a system's internal components cannot be easily extracted and reused in new environments.
- **Viscosity** is when necessary operations like building and testing are long and difficult to complete
- **Needless complexity** is when a system designs for future needs 

<!--more-->

###### Code Rot
- **Dependency inversion** is when dependencies oppose the flow of control
![Dependency Inversion](/img/posts/dependency-inversion.png 'Dependency Inversion')
- The essential quality of OOP, the thing that makes it different from other paradigms and the thing that makes it useful, is it's ability to invert key dependencies. Protecting high level policies from low level details.

### The Single Responsibility Principle
- Responsibilities are about change. Which users will request that module be changed?
- Tie responsibilities to actors (or roles) (not individuals)
- Employee class has 3 roles: policy (calculate pay methods), architecture (save to DB method(s)), and operations (describe employee - to be used in reporting)
- A responsibility is a family of functions that serve the needs of an actor
- An actor is the single source of change for that responsibility
- Secondary value of software is behavior. The software does what it's supposed to do without bugs, crashes, or delays
- The primary value of software is the ability to change according to actor's needs
- Co-location of responsibilities couples actors
- Example: operations and policy use the same total function because they are in the same module. at some point a change one actor makes, violates the other actor's needs
![Coupling](/img/posts/coupling.png 'Coupling')
- A module should have one and only one reason to change (one responsibility)
- Good example of separating code and logging code into a base class and inheriting (logging) class at 37min
- Employee Facade: easy to find, but coupled methods
![Employee Facade](/img/posts/employee-facade.png 'Employee Facade')
- Employee Interface Segregation: well separated but hard to find methods
![Employee Interface Segregation](/img/posts/employee-interface-segregation.png 'Employee Interface Segregation')
- Mastermind Architecture: Did a TDD method and got it all working. Then, some analysis and refactoring.
![Mastermind Architecture](/img/posts/mastermind-architecture.png 'Mastermind Architecture')