---
layout: post
title: 'Episode 12: The Interface Segregation Principle'
categories: [clean code, clean code solid principles, software development]
date: 2020-11-29 19:08:00
---

#### Description

There may be no "I" in "team", but there sure is an "I" in "SOLID", and that's what this episode is all about: The Interface Segregation Principle.

I remember, long ago, a nemesis of mine on comp.object used to accuse me of being a racist because I used the word "segregation" in this principle. He also took note that I called a particular design pattern "TaskMaster". Ah, Elliott, I sometimes miss your thorn in my flesh.

In this episode we're going to talk about the problem of too much knowledge. We'll show the strange backwards dependency that happens when classes know too much, and the problem that backwards dependency causes.

I'll tell you the story about how the Interface Segregation Principle came into being. It's a story about a company that had a big build-time problem. I'll show you the bizarre solution we discovered to fix that problem, and tell you why soot was so important to that discovery.

We'll talk about fat classes—classes that have too many methods, and too many dependents. We'll discuss the problems they cause, and how to resolve those problems.

We'll watch a young novice under the tutelage of her master as she struggles through the ATM case study and investigates why too much knowledge harms system structure.

Then, we'll investigate the physical structure of interface segregation, and once again assert the importance of the boundary between the application and main.

Finally, we'll talk about the principle behind the principle, and why this principle which, on the surface of it, seems to be about static typing, is actually not about static typing at all.

So pack the kids in the car, strap the bikes on the roof rack, and cram the tent in the trunk, because we're about to drive into the rugged territory of the Interface Segregation Principle.

<!--more-->

#### My Notes
- Package together the switch and the interface (since switch needs the interface anyways), then package together interface implementers (that the interface knows nothing about) for independent deployability  
![Switch Light UML](/img/posts/switch-light.png 'Switch Light UML')
- Call the interface Switchable. Good because it helps accentuate the tight coupling (binding) that exists between the interface and the Switch class
- Interfaces have more to do with the classes that use them, then the classes that implement them
- Interfaces exist because they solve the problem of multiple inheritance and the deadly diamond of death. For example, how many instances of v should M have? 2 (since it inherits from D1 and D2) or 1 (since it drives from B)? Our language designers could have disallowed diamonds or variables in the apex of the diamonds. Ruby solves this problem in an elegant way.
![Diamond of Death](/img/posts/diamond-of-death.png 'Diamond of Death')
- Can have the 'fat' job class depend on abstract interfaces so that any time a module needed to be changed the compile time would be much shorter because only the affected module/sub-system would need to be recompiled. This reduced compile time down from an hour to a minute or two
![Job Interface Segregation](/img/posts/job-interface-segregation.png 'Job Interface Segregation')
- Interface segregation solves the problem of fat classes (classes that have lots of methods). Job class had lots of sub-systems and those sub-systems had lots of data to manage and all that data needed to be in one place so there was no way to split the Job class up. 
- Modern  build times are fast which may make you think that the problem of fat classes has gone away. However, coupling between a fat class and it's clients can be so severe that it makes it hard to put those clients into their own independently deployable DLL or JAR files. So isolate clients from fat classes by having fat class depend on interface that those clients can implement. 
- Since interfaces are more logically coupled to the clients that call them then the classes that implement them we make sure those interfaces contain only the methods that those clients wish to call and those interfaces are multiply inherited by the original fat class. Since changes to one client will only affect the client being changed, other modules won't have to be recompiled and redeployed. Because of this the clients can be placed into independently deployable components (DLLs, JAR, or GEM files) which means that these components can be developed separately and development teams can work separately without interfering with each other.
- The interface segregation principle says that a module shouldn't depend on methods that it doesn't call. Simply put, don't depend on things you don't need.
- The following ATM example is good because each ATM module won't need to be recompiled each time a new message is added. However, we want main to build all the interactors and pass them across the application boundary so that the application does not know that the messenger interface implements both  the common and it's corresponding (segregated) interface.  
![ATM Interface Segregation](/img/posts/atm-interface-segregation.png 'ATM Interface Segregation')
![ATM Interactor](/img/posts/atm-interactor.png 'ATM Interactor')
```java
public class WithdrawalInteractor {
    public WitthdrawalInteractor(
        WitthdrawalMessenger withdrawalMessenger,
        CommonMesssenger commonMessenger) {

        } 
    )
}
```
```java
Messenger messenger = new FrenchMessenger();
WithdrawalInteractor withdrawalInteractor = new WithdrawalInteractor(messenger, messenger);
```
