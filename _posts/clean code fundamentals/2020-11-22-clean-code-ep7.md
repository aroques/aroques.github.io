---
layout: post
title: 'Episode 7: Architecture, Use Cases, and High Level Design'
categories: [clean code, clean code fundamentals, software development]
date: 2020-11-22 10:03:00
---

#### Description

This episode destroys the common myths about software architecture, and reveals what software architecture is really all about. Software architecture is not about databases, web servers, dependency injection, Rails, Hibernate, JSF, Struts, Spring, or any other framework or tool. Architecture is about intent.

When you see a web-based accounting system, the architecture of that system should scream accounting at you. The fact that it's a web based system should be unnoticeable. After all, the web is just a delivery mechanism, and we don't want our system architecture polluted with delivery mechanisms, databases, and other low level-tools and concerns.

In this episode, Uncle Bob re-introduces the concepts first espoused by Ivar Jacobson in his epic book, "Object-Oriented Software Engineering." Uncle Bob describes what use cases are, and how to make sure they are delivery agnostic. He shows you how to partition the system with use cases as the central organizing principle, and the primary abstraction. He also demonstrates how to isolate the system architecture from the rest of the system.

Uncle Bob illustrates how to use Jacobson's three primary architectural classes: Entities, Interactors, and Boundaries. He describes how this triplet helps to decouple the system architecture from the delivery mechanism, leaving the web to dangle off the side of the architecture like an appendix. Uncle Bob goes on to show how Model-View-Controller and Model-View-Presenter are used on the delivery side of the system.

Then Uncle Bob hammers the point home with a case-study taken from his classic book, "Agile Software Development: Principles, Patterns, and Practices." After an informative briefing from the stakeholder, he performs a use-case analysis, and a high level object-oriented design to create the architectural superstructure on which the rest of the application will be built.

Finally, Uncle Bob tells us how to avoid a Big Ball of Mud, and tells us who the architects really are.

So raise your seat backs and put your tray tables in the upright and locked position, because this episode of Clean Code is about to take off, and we are expecting turbulence as we pass through the preconceived notions of Architecture, Use Cases, and High Level Design.

<!--more-->

#### My Notes
- A good architecture is all about use cases. Just like how a well designed library or church 'screams' library or church.
- Good architecture focuses on use cases and allows you to defer decisions about the UI, tools, frameworks, and databases.
- Can better estimate cost-value of different components like the UI or the business logic which supports prudent decision making.
- Use cases are delivery independent descriptions of how a user is to interact with the system
- User cases have a primary course (an algorithm for when nothing goes wrong) and Exception courses  are algorithms that define how to handle something going wrong. Ex: validation error (should notify the user). 
- Writing effective Use Cases and User Stories applied are good books to check out on the subject
- Entity objects are application independent repositories for business rules.
- Interactor objects are application specific business rules
- Boundary objects accept and deliver data from and to the user
- Agile Principles, Patterns, and Practices book has use case case study
- A good architecture maximizes the number of the decisions not made