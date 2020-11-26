---
layout: post
title: 'Episode 8: Foundations of the SOLID principles'
categories: [clean code, clean code solid principles, software development]
date: 2020-11-25 16:35:00
---

#### Description

In this video, Uncle Bob begins his exploration of the S.O.L.I.D. principles by beginning at the beginning and laying out their foundations. This is the first of several new episodes that will do deep-dives into the principles one-by-one.

We begin with the question, "What is design?" We make the case, based on Jack Reeves' famous 1992 paper, that the design of a system is best captured by the source code, and that all other forms of design documentation—regardless of their usefulness—are preliminary and/or ancillary.

If the design of a system is its source code, then cleaning the source code is cleaning the design. But what are the symptoms of poor design? How can we know when the design of our systems is starting to degrade? To answer that, we take a harder look at the Design Smells of Rigidity, Fragility, Immobility, Viscosity, and Needless Complexity. How can we identify these smells and clean them before they become a significant problem?

Next, we watch a batch of code rot. We start with a pleasant and clean design and watch as change after change degrades that design into a festering mass. Then we study an alternate design that does not rot when the same changes are applied. We investigate the difference between those two designs and discover the principle that underlies all of Object-Oriented Design. We do a deep dive into the history of OO, and derive a new and unambiguous definition of OO based on Dependency Management.

Finally we take a brief look at the S.O.L.I.D. principles which will be the topics of the next several episodes.

<!--more-->

#### My Notes
- The source code is the design. Just like other engineers produce documents that specify how to build things, software engineers write source code, then compiles build the finished product (the executable).
- The diagrams are not the design. The source code is the design.
- Unlike houses or mechanical parts, software is cheap to build and fix/change after the fact. 
Design Smells: 
- Rigidity: the tendency of a system to be hard to change. system is hard to change when the cost to change the system is high, like a slow 3 hour build time. want a change in one module not to require other modules to be rebuilt.
- Fragility: when a small change to one module causes other unrelated modules to misbehave.
- Immobility: when a system's internal components cannot be easily extracted and reused in new environments
- Viscosity: when necessary operations like building and testing are long and difficult to complete
- Needless Complexity: when a system designs for future needs 
Code Rot
- Dependency Inversion: when the dependencies oppose the flow of control
![Dependency Inversion](/img/posts/dependency-inversion.png 'Dependency Inversion')
- The essential quality of OO, the thing that makes it different from other paradigms and the thing that makes it useful, is it's ability to invert key dependencies. Protecting high level policies from low level details.