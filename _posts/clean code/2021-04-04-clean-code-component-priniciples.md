---
layout: post
title: 'Clean Code Component Principles'
categories: [clean code, clean code component principles, software development]
date: 2021-04-04 18:07:00
---

### Solid Components

###### What is a Component?
Relocatable Modules  
- Starts off by explaining the history of libraries (modules put together by linkers)
- Today, linkers are fast because processors are fast and memory is inexpensive. So, there is no longer a separate linking step that links together executable files. The loader links and together and relocates DLLs/JAR files as needed.
- A **component** is an independently deployable module library like a DLL, GEM, JAR, or shared library in UNIX.
- **Independently deployable** means that a change to one does not cause another to be recompiled or redeployed.
- Components can be independently developed and deployed

<!--more-->

###### Coffee Make Requirements
```java
// Coffee Maker API
void setBoiler(bool);
void setWarmer(bool);
void setValve(bool);
void setLight(bool);

bool getBoiler();
int getPlate();
bool getButton();
```  

The Architect's Solution  
- The accepted technique for composing requirements into object oriented designs is through noun-verb analysis
- We enumerate the nouns and they become candidate objects for the design. They are: Coffee Maker, Warmer Plate, Boiler, Valve, Heating Element, Sensor, Button, and Light
- They Coffee Maker is the central object in the design
- The design contains too many classes and abstractions  

A Real Design  
- First step in any design is to apply the Single Responsibility Principle. Determine who the actors are and separate the responsibilities.
- The persons who decides to make coffee in the first place. This person fills the boiler and pushes the start button. **The Brewer**. This person will be requesting changes for the UI, the button and the light.
- The person who wants their coffee before the pot fills up, **The Now Drinker**. This person will request changes to the plate and the pot so that they can remove the pot from the plate while the coffee is still brewing.
- The person who is interested in the temperature of the brewed coffee is **The Hot Drinker**.  

High Level Modules  
- The Brewer's module is **The UI** module.
- The module for the Now Drinker must allow that actor to get coffee while it is still being brewed. We'll call it **The Hot Water Source** module.
- The module for the Hot Drinker must collect the coffee and keep it hot. We'll call this module **The Containment Vessel**.  

Methods and Relationships  
- Go up and down the abstraction layers like a yo-yo. Start at the top, then go down to the Mark 4 Coffee Maker, then back up.
- The Brewer sends the start message to the UI (pushes the button on the coffee maker)
- The UI should tell the Hot Water Source to start. First, should determine whether or not we're already brewing. Second, need to know if there is water in the boiler. Third, find out if there is an empty pot on the plate. If all are true, then can tell the Hot Water Source to start.
- The UI and the Hot Water Source both have a start method. The Hot Water Source and the Containment Vessel both have a AreYouReady method.  

Brewing Begins  
- The Containment Vessel needs to tell the Hot Water Source to suspend the flow when the pot is removed during brewing. When the pot is put back on the plate the Containment Vessel will need to send the resume message to the Hot Water Source.
- Once the pot is filled, the a done message will be sent to the UI so that the UI can turn the light on. In the Mark 4 case, the Hot Water Source will send this message, but it could be sent by the Containment Vessel in another design.
- The Hot Water Source should also send the done message to the Containment Vessel so that the Containment Vessel stops sending resume and suspend messages every time that the pot is removed from the warmer plate.
- Once an empty pot is returned to the plate, it will send a finished message to the UI so that the UI can turn off the light.  

Implement the Design  
- Main will sit in a loop and call the poll method of each module.
- Message passing will happen between modules as described above.
![Coffee Maker Design](/img/posts/coffee-maker.png 'Coffee Maker Design')

### Component Cohesion
- The pieces inside of a component are functions.
- The force that bind those functions together is called **cohesion**.
- Classes are the first layer of cohesion for functions. The data isn't as important as the public functions - the functions that give a class it's purpose.

False Cohesion
- Most common problem is **sub-system error**. The fact that a group of classes work together to achieve a certain goal is not necessarily a good reason to bind them together into a single component. For example, the classes that calculate pay for different types of employees. Or the classes that calculate what is displayed in a report does not belong in same component with classes that format a report.
- Or shouldn't bundle together whole inheritance hierarchies into a single component. Base classes and their derivatives are often packaged into separate components. Whereas those classes that use a base class are often packaged into the same component as the base class. This is the because the derivatives source code dependency opposes the runtime dependency which is what we want our components to do. 

###### The Release Reuse Equivalence Principle
- The granule of reuse is the granule of release. You can't reuse a component unless it's author is willing to manage it through a release cycle.
- A component should be large enough (have enough classes) to justify the cost of managing release cycles. 
- You want to manage a few strategic components, not a plethora of tiny ones.

###### The Common Closure Principle
- Goal is to minimize the number of components that change when requirements change. Ideal is one component change per layer: like GUI, middleware, and persistance layer.
- The classes that we group together into components should be closed against the same kind of changes. Gather together classes that change for the same reason. Separate classes that change for different reasons.
- Per the Single Responsibility principle, changes comes from an actor.

###### The Common Reuse Principle
- Group together classes that are used together and separate classes that aren't used together. Or construct components so that when it is used, all the classes are used. Similar to how when one function in a class is used, they're all used.
- Avoid making components that depend on classes that they don't use.
- Want components that are cohesive as possible

###### The Tension Diagram
- Can't conform to all three principles at the same time. Conforming to one, brings you less in conformance to the other two. You must choose a position within the triangle. 
- Position within the triangle is a function of how old mature a project is. Early on focus is more on CC and CR principles but as it matures the emphasis moves closer to the RRE principle because the emphasis shifts more towards reuse and less towards developability.

### Component Coupling
###### The Acyclic Dependencies Principle
- **Morning After Syndrome** is when you have code working when you leave work. Then, the next morning it is not working because something that your component depends upon was released and broke it.
Two Solutions:
- The first solution is the Weekly Build. This works at first, but as the teams grow larger Friday becomes no longer enough time to integrate, this gets pushed to a bi-weekly build and then eventually to a monthly build.
- The second solution is to conform to the acyclic dependency principle. A software system is composed of components. The dependencies between those components should not form a cycle. The dependencies should form a directed acyclic graph.
- If there is a cycle, then no one can release because everyone would need a certain version. 
- It's even worse than that because there is no valid build order for the system because compilers build from bottom-up. But if there is a cycle, then there is no bottom. So the output of the build is undefined. So, you may have to build a couple of time to get the build to work. Visual Studio doesn't allow cycles between projects so it doesn't have this problem.
Two ways to deal with cycles:
- First solution is to split the component that is the target of the dependency into two components. Has the con that if you keep doing this, then you end up with too many small components.
- Second solution is find the dependency that causes the cycle and invert it. For example, create an error display interface in the error management component and have the UI implement it.

###### The Stable Dependencies Principle
- Something that is hard to change is **stable** and something that is easy to change is **unstable**. It's not a boolean attribute, but rather a sliding scale score.
- Want to depend upon something that is stable - hard to change. Want the change to hurt them more than it hurts you.
- A component should only depend on other components that are more stable than it is.
- The more components that a component has depending upon it, the more stable the component is.
- The more components that a component depends upon, the less stable the component is.
- Adult components are stable and teenager components are instable.
- Want unstable component if you expect that that component's code will change frequently.
The I Metric
- Count afferent couplings (Ca) (or fan-in): the number of classes outside of component C that depend upon classes inside component C.
- Count efferent couplings (Ce) (or fan-out): the number of classes outside of C that classes inside of C depend upon.
- I (instability) = Ce / (Ca + Ce)
- I will be 0 if the component is very stable. I will be 1 if the component is very instable.
- Components should point towards components with a smaller I value.
- Fix components that are pointing towards more instable components the same way that you would fix a cycle in the component dependency graph.

###### The Stable Abstractions Principle
- Components at the bottom of the dependency graph are very hard to change, but they can be open for extension.
- The more stable that a component is, the more abstract it should be. 
- So, less abstract components will live at the top of dependency graphs and the further down on the graph that a component is, the more abstract it will be.
- Abstractness of a Component = # abstract classes / # classes
- Interfaces count as an abstract class.
- Make sure components are as abstract as they are stable with the following metric: A + I = 1.
- He'll run the numbers when auditing a new system to see evaluate system health.
- If A + I != 1, then the component is violating the dependency inversion principle.
Distance Graph
- Adult = (A = 1, I = 0). Very hard to change, unstable component.
- Teenager = (A = 0, I = 1). Very easy to change, unstable component.
- Zone of uselessness = (A = 1, I = 1). An abstraction with nothing depending upon it.
- Zone of pain = (A = 0, I = 0). Concrete components that lot's of components depend upon. String and Vector libraries are in this corner, but we are not concerned because those libraries are not changing.
- The line in the middle of the graph that connects (1, 0) and (0, 1) is called **the Main Sequence**. The line's equation is A + I = 1. 
- D (distance from the Main Sequence) = | A + I - 1 |
- Want distance to be 0 or close to 0 

### Component Case Study
- The Payroll case study in the Agile PPP book doesn't partition the app into components until it is completely written and working.
- Controllers use Builders to create request data structures that they pass to Interactors that they acquired through Factories.
- The Interactors manipulate Entities and the database in order to create response data structures.
- Response data structures are passed into Presenters which create ViewModel data structures which are then driven into the views.
![Component Case Study Class Design](/img/posts/ccs-design.png 'Component Case Study Class Design')
![Component Case Study Component Design](/img/posts/ccs-component-design.png 'Component Case Study Component Design')
![Component Case Study Component Diagram](/img/posts/ccs-component-diagram.png 'Component Case Study Diagram')