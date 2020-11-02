---
layout: post
title: 'Episode 6: TDD: part 2'
categories: [clean code, clean code fundamentals, software development]
date: 2020-11-01 19:15:00
---

#### Description

This is part 2 of Episode 6: Test Driven Development.

This episode begins as the mirror forces of traditional software development lose patience with Uncle Bob's incessant preaching and demand a practical demonstration before allowing the debate to continue. Uncle Bob complies by walking through the famous example of The Bowling Game. (You don't want to miss this!) In this example, Uncle Bob uses the three laws and the Red-Green-Refactor cycle to implement the algorithm for scoring games of ten-pin bowling.

The demonstration begins with a quick description of the scoring rules. Then, Uncle Bob leads us on a quick UML design session. TDD commences, and we watch Uncle Bob create the algorithm by applying the three laws of TDD in the Red-Green-Refactor cycle. Finally, the end result is compared to the initial design.

Having satisfied and impressed the mirror forces with that demonstration, the debate begins in earnest. Point by point the mirror forces raise one objection after another:

"TDD is slow", "Managers won't allow it", "Refactoring is rework", "Who tests the tests?", "Tests are fragile", "Tests can prove correctness", "TDD is too dogmatic", "Tests don't _have_ to come first.", "What about Legacy Code", "How do you test GUIs", "How do you test databases.", "Programmers aren't testers.", "TDD is too hard" 

One by one, Uncle Bob answers those objections. Sometimes the mirror forces agree, sometimes they are skeptical, but they cannot deny the logic. In the end... Well, you'll just have to see!

After the debate ends, Uncle Bob describes why TDD should be considered a minimum requirement for professional behavior. He likens the discipline of TDD to the discipline of double-entry bookkeeping used by accountants. He makes the point that developers should expect QA to find nothing. He concludes with the story of how Doctors learned to wash their hands.

The lesson ends with a summary, and a promise for the next episode, Use Cases and High Level Design.

<!--more-->

#### My Notes

- bowling game demonstration: 3:00 - 42:30
- good UML diagram example
- red, green, refactor method for TDD
- implement the simplest cases first, ex: all gutters, then all ones 
- removes simple tests that are contained in other tests as you go during the refactor phase
- next he implemented one spare
- can @ignore a failing test so that you can refactor to a different design
- refactor tests as they were production code and keep them clean
- arrived at a very simple algorithm by going step by step
- a change to production code shouldn't cause many tests to fail. consider redesigning your tests
- how to test GUI code? have a presenter that has logic about what's in a dropdown and boolean for disabled buttons and test that. the presenter will feed data structures to the view and the view will render it
- TDD is double-entry book-keeping for software developers. Like accounting flipping a single bit or number can be very problematic 
- 100% code coverage is the goal but usually not attainable. Fitnesse is 95% and he does try to push it higher.