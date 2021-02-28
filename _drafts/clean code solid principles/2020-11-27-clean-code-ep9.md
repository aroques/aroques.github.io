---
layout: post
title: 'Episode 9: The Single Responsibility Principle'
categories: [clean code, clean code solid principles, software development]
date: 2020-11-27 7:00:00
---

#### Description

In this video, Uncle Bob will take you on a deep dive through the Single Responsibility Principle. After a little General Relativity, you'll learn just what a responsibility is, and how it relates to the users of the system and the roles that they play.

You'll learn about the primary value of software, and why that value is not what you'd expect. You'll also learn how the proper allocation of responsibilities to modules impacts that value and means increased profits for your business.

Uncle Bob will teach you how misplacing responsibilities can lead to design smells like Fragility and Viscosity. He'll show you the importance of separating responsibilities into different functions, classes, and modules. And he'll demonstrate different techniques for achieving that separation.

Next, he'll walk you through several different Java functions and ask you to find the single responsibility violations. Then he'll show them to you and recommend ways to separate them.

Finally, he'll walk you through the case study of a simple application, from inception to delivery. He'll show you how to find the responsibilities, and, following the principles of architecture from Episode 7, how the system can be designed so that those responsibilities are separated. He'll also show you where to get the code so you can study it later.

So get yerselves saddled up and rarin' to go because y'all're 'bout to stampede into The Single Reponsibility Principle. Yee Haw!

<!--more-->

#### My Notes
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