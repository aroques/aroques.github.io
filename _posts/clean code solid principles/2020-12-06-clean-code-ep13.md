---
layout: post
title: 'Episode 13: The Dependency Inversion Principle'
categories: [clean code, clean code solid principles, software development]
date: 2020-12-06 07:47:00
---

#### Description

And now, at last, it's time for the Dependency Inversion Principle—the final principle in the SOLID suite.

Go back in time with Uncle Bob to 1979, when he was just a noob software developer with only six years experience. Walk with him through the tale of telephone test equipment using 8085 microprocessors with 32K of RAM and 32K of ROM. See how he first discovered the magic and power of inverting source code dependencies in order to turn those ROM chips into independently deployable components.

Then hop into the time machine to the early '90s when Uncle Bob was becoming an accomplished C++ programmer. See how he, and his team, struggle, and at first fail, to create a huge reusable framework. Watch as he discovers the key to reuse, and to building frameworks that many applications can reuse.

In this episode we'll learn what dependencies are. We'll study the difference between source code dependencies and runtime dependencies. We'll learn why that difference is important, and we'll learn how to invert certain key source code dependencies so that they oppose their corresponding runtime dependencies.

Then we'll spend some time looking at two case studies. First we'll look at IO drivers, and how they use dependency inversion to create device independence. Then we'll look at the good old furnace example, and see how dependency inversion allows us to separate high level policy from low level detail in order to create a plug-in architecture.

So get ready for a wild ride through time and technology as we DIP in to the Dependency Inversion Principle.

<!--more-->

#### My Notes
- Runtime dependency: when the flow of control of one module leaves to another there's a runtime dependency between those two modules or if one module accesses the variables of another module then there's a runtime dependency there. A runtime dependency exists whenever two modules interact at runtime.
- Compile-time (source code) dependency: when a name is defined in one module, but appears in another module then that module has a source code dependency on the defining module.
- Source code dependencies are a problem because they can force other modules to be recompiled (if that module is older than the referencing module) and redeployed.
- Structured design is a top-down methodology in which you start with main and then you design the sub-routines that main should call. Then, you define the sub-routines that those sub-routines should call.
![Structured Design](/img/posts/structured-design.png 'Structured Design')
- The source code dependencies are an exact mimic of the runtime dependencies. We don't want this because then it's hard to keep modules independently developable and deployable 
- We invert these dependencies by using polymorphism. Example below: A has a runtime dependency on B. A and B both have a source code dependency on the interface. B's dependency upon the interface points in the opposite direction of A's runtime dependency upon B, so we say the dependency is inverted. B's source code dependency upon the interface inverts A's runtime dependency upon B.
![AB Dependency Inversion](/img/posts/ab-dependency-inversion.png 'AB Dependency Inversion')
- In dynamic languages like Ruby, no interface is required so there's no source code dependency at all. WHile A still depends upon B at runtime, neither A nor B depend upon each other at compile time.
![Dynamic Lang Dependency Inversion](/img/posts/dynamic-lang-dependency-inversion.png 'Dynamic Lang Dependency Inversion')
- Inverting dependencies is the means by which we create boundaries between software modules. Whenever we want a boundary to exist we carefully choose which dependencies to invert and make sure all the dependencies point in the same direction across the boundary. This is how we create plugins.
![Plugin](/img/posts/plugin.png 'Plugin')
- Plugins are modules that are anonymously called. In other words, the caller has no idea who are what it is calling.
- Create a system that is independently developable and deployable by creating plugins (that are independently developable and deployable)
- Formal definition of the dependency inversion principle is simple this: high level policy shouldn't depend upon low level detail. Low level detail should depend upon high level policy.
- Building a reusable framework is hard. If you don't not build it in parallel with at least 2 applications that use it you will almost certainly fail.
- Each low level application depended upon the high level framework. Thus, each application could be independently developed and deployed.
![Framework Dependency Inversion](/img/posts/framework-dependency-inversion.png 'Framework Dependency Inversion')
- Shows operating system IO driver and furnace examples of dependency inversion