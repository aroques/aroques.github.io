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

<!--more-->

###### Design Smells 
- **Rigidity** is the tendency of a system to be hard to change. A system is hard to change when the cost to change the system is high. For instance, a system with a slow 3 hour build time. A change in one module should not force other modules to be rebuilt.
- **Fragility** is when a small change to one module causes other unrelated modules to misbehave.
- **Immobility** is when a system's internal components cannot be easily extracted and reused in new environments.
- **Viscosity** is when necessary operations like building and testing are long and difficult to complete
- **Needless complexity** is when a system designs for future needs 

###### Code Rot
- **Dependency inversion** is when dependencies oppose the flow of control
![Dependency Inversion](/img/posts/dependency-inversion.png 'Dependency Inversion')
- The essential quality of OOP, the thing that makes it different from other paradigms and the thing that makes it useful, is it's ability to invert key dependencies. Protecting high level policies from low level details.

### The Single Responsibility Principle
- Responsibilities are about change. Which users will request that a module be changed?
- Responsibilities are given to actors (or roles) and not to individuals
- An example Employee class has 3 roles: policy (methods to calculate employee pay), architecture (methods to save data to a DB), and operations (methods that describe employees - to be used in reporting)
- A responsibility is a family of functions that serve the needs of an actor
- An actor is the single source of change for that responsibility
- Secondary value of software is behavior. The software does what it's supposed to do without bugs, crashes, or delays
- The primary value of software is the ability to change according to actor's needs
- Co-location of responsibilities couples actors. For example, operations and policy use the same total function because they are in the same module. At some point a change one actor makes can violate the other actor's needs.
![Coupling](/img/posts/coupling.png 'Coupling')
- A module should have one and only one reason to change (one responsibility)
- There is a good example of separating code and logging code into a base class and inheriting (logging) class at 37min
- Employee Facade: easy to find, but coupled methods
![Employee Facade](/img/posts/employee-facade.png 'Employee Facade')
- Employee Interface Segregation: well separated but hard to find methods
![Employee Interface Segregation](/img/posts/employee-interface-segregation.png 'Employee Interface Segregation')
- Mastermind Architecture: Did TDD method to get it all working. Then, some analysis and refactoring.
![Mastermind Architecture](/img/posts/mastermind-architecture.png 'Mastermind Architecture')

### The Open-Closed Principle
- A software module should be open for extension but closed for modification
- **Open for extension** means that the module is easy to change
- **Closed for modification** means that the source code shouldn't change 
- Whenever you have a module who's behavior you'd like to extend without modifying, separate the extensible behavior behind an abstract interface and invert the dependencies. Like the Copy module and File interface (implemented by IO devices like printer or keyboard).
- If you wish to change the behavior of an existing OC module, then you can do so by adding new code and not by changing existing code
- Customers think that adding additional features is adding new code, not changing existing code, so this lines up with their thinking.
- A contains relationship is a dependency
- There is a good expense report example at 37:00
![Expense Report Architecture](/img/posts/expense-report-architecture.png 'Expense Report Architecture')

###### Crystal Ball Problem
- **Crystal ball problem** is that open-closed only works if you can perfectly predict the future and know which dependencies are going to change then invert those dependencies before the change (that will be requested) is requested.
Two Solutions:
- **Big Design Up Front (BDUF)** is when you think of everything up front and create abstractions. This is bad because a lot the abstractions may not be needed. Abstractions can be hard to follow and make cause and effect hard to see, so abstractions should be minimized.
- **Agile Design** is creating an MVP and getting it in front of the users. Then, make abstractions as necessary.

### The Liskov-Substitution Principle: Part 1
- The rules of types apply, regardless of whether or not the compiler checks those types.
- It doesn't matter what is inside a type (or how it is stored or represented), but it does matter what a type can do.
- A type is a 'bag of methods' defined on private data (i.e., a class or object)
- Sub-types can be used as their parent types
- Inheritance is necessary in statically types languages like C# & Java
- Dynamically typed languages use Duck Typing. As long as the object has that method, then it's OK. If that method is not there will be a runtime error. Calling methods on a object can be called 'sending a message' to that object.
- A **refused bequest** is when a method is called on a sub-type and that method is not defined. A more subtle refused bequest is when a method in a sub-type does something that the client of the super type does not expect like cause a side effect or throws an unexpected exception.
- An example of this more subtle refused bequest is when a square inherits from a rectangle. The setWidth and setHeight methods are overridden and set both the width and height. Methods that call setWidth on a rectangle would expect height to remain unchanged so this is unexpected behavior and can cause bugs and errors. 
- To remedy this you may need to check the type of the object in a method and violate the open-closed principle which causes rigidity.
- Representatives of things do not share the relationships of the things that they represent. Two lawyers representing two persons who are getting divorced are not themselves getting divorced. 
- Geometrically, in the real world, a square is a rectangle but not when these objects are represented in software.
- You also cannot model an integer is a real number is a complex number relationship. You'll blow the stack when you try to make a instance of a complex number because the definition is recursive.
- If S is a sub-type of T, a list of S is not a sub-type of a list of T
- So, a list of squares cannot be passed into a function that expects a list of shapes because that function might add a rectangle to the list, then the list is no longer a list of squares in the calling scope.
- A list of shapes represents a group of shapes and is not a shape itself so it does not share shape's relationships to it's sub-types.
- To generalize this rule further, given that S is a sub-type of T, then the generic class P(S) is not automatically a sub-type of the generic class P(T).

### The Liskov-Substitution Principle: Part 2

###### Helpful Heuristics
- If the base class does something, then the derived class must do it too and must do it a way that does not violate the expectations of the callers.
- Never take behavior away from a sub-type. A sub-type can always do more than its parent type, but it can never do less.
- Hints that LSP is being violated and when a sub-type is doing less than it's parent type are when an implemented function always throws an exception or does nothing. Especially if the base class implementation does something.
- 'is instance of' statements usually indicate LSP violation. Unless, the type is being checked and the type is already know, but the compiler doesn't know in that scope, like below. No new information is added. The function needed to know about the HourlyEmployee type:
![Is Instance Of Use](/img/posts/is-instance-of-use.png 'Is Instance Of Use')
- However, type cases (switch statements based on the object's type) are usually caused by LSP violations and should be replaced with polymorphic dispatch.
- Inheritance breeds rigidity because each sub-type inherits all of it's parent's fields, methods, and dependencies.
- This isn't true for dynamic languages because they don't rely on inheritance from sub-typing. This is one of the reasons why these languages have been becoming more popular. They can fail during runtime for errors that could be caught (via static analysis) by a type-safe compiler, but TDD can help alleviate this problem. Our behavior square-rectangle problem though, could not be caught by a compiler.

Bertrand Russel thought of Design by Contract for dynamic type safety:
- Every type has certain invariants that can be stated as boolean expressions that must always be true. For example, a square has this.width == this.height
- Every function can be surrounded be pre and post conditions. These conditions must be true before and after a function is called.
- TDD is a more general, byt perhaps less rigorous way to prevent dynamic type errors and is the primary way used today.

- There is a good dial-up and dedicated modem example of LSP violation at 20min. The dedicated modem user don't need dial and hangup methods that is handled by the dedicated modem adapter.  
![Fragile Modem](/img/posts/fragile-modem.png 'Fragile Modem')
![Modem Solution](/img/posts/modem-solution.png 'Modem Solution')

### The Interface Segregation Principle
- Package together the switch and the Switchable interface (since switch needs the interface anyways), then package together interface implementers (that the interface knows nothing about) for independent deployability  
![Switch Light UML](/img/posts/switch-light.png 'Switch Light UML')
- Call the interface Switchable. This name is good because it helps accentuate the tight coupling (binding) that exists between the interface and the Switch class
- Interfaces have more to do with the classes that use them, then the classes that implement them
- Interfaces exist because they solve the problem of multiple inheritance and the deadly diamond of death. For example, how many instances of v should M have? 2 (since it inherits from D1 and D2) or 1 (since it drives from B)? Our language designers could have disallowed diamonds or variables in the apex of the diamonds, but they have instead disallowed multiple inheritance altogether. Ruby solves this problem in an elegant way.  
![Diamond of Death](/img/posts/diamond-of-death.png 'Diamond of Death')
- Can have the 'fat' Job class depend on abstract interfaces so that any time a module needs to be changed the compile time will be much shorter because only the changed module/sub-system will need to be recompiled. This reduced compile time down from an hour to a minute or two  
![Job Interface Segregation](/img/posts/job-interface-segregation.png 'Job Interface Segregation')
- Interface segregation solves the problem of fat classes (or classes that have a lot of methods). The Job class had lots of sub-systems and each of those sub-systems had lots of data to manage and all that data needed to be in one place so there was no way to split the Job class up. 
- Modern build times are fast which may make you think that the problem of fat classes has gone away. However, coupling between a fat class and it's clients can be so severe that it makes it hard to put those clients into their own independently deployable DLL or JAR file. So, isolate clients from fat classes by having fat class depend on interfaces that those clients can implement. 
- Since interfaces are more logically coupled to the clients that call them then the classes that implement them we make sure those interfaces contain only the methods that those clients wish to call and that those interfaces are multiply inherited by the original fat class. Since changes to one client will only affect the client being changed, other modules won't have to be recompiled and redeployed. Because of this, each client can be placed into it's own independently deployable component (DLL, JAR, or GEM file), which means that these components can be developed separately and that development teams can work separately without interfering with each other.
- The interface segregation principle says that a module shouldn't depend on methods that it doesn't call. Simply put, don't depend on things you don't need.
- The following ATM example is good because each ATM module won't need to be recompiled each time that a new message is added. However, we want Main to build all the interactors and pass them across the application boundary so that the application does not know that the messenger interface implements both the common and it's corresponding (segregated) interface.  
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
// main
Messenger messenger = new FrenchMessenger();
WithdrawalInteractor withdrawalInteractor = new WithdrawalInteractor(messenger, messenger);
```

### The Dependency Inversion Principle
- When the flow of control of one module leaves to another there's a **runtime dependency** between the two modules or if one module accesses the variables of another module then there's a runtime dependency. A runtime dependency exists whenever two modules interact at runtime.
- When a name is defined in one module, but appears in another module then that module has a (compile-time) **source code dependency** on the defining module.
- Source code dependencies are a problem because they can force other modules to be recompiled if that module is older than the referencing module and redeployed.
- Structured design is a top-down methodology in which you start with main and then you design the sub-routines that Main should call. Then, you define the sub-routines that those sub-routines should call.  
![Structured Design](/img/posts/structured-design.png 'Structured Design')
- The source code dependencies are an exact mimic of the runtime dependencies. We don't want this because then it's hard to keep modules independently developable and deployable 
- We invert these dependencies by using polymorphism. For example, A has a runtime dependency on B. A and B both have a source code dependency on the interface. B's dependency upon the interface points in the opposite direction of A's runtime dependency upon B, so we say that the dependency is inverted. B's source code dependency upon the interface inverts A's runtime dependency upon B.  
![AB Dependency Inversion](/img/posts/ab-dependency-inversion.png 'AB Dependency Inversion')
- In dynamic languages like Ruby, no interface is required so there is no source code dependency at all. While A still depends upon B at runtime, neither A nor B depend upon each other at compile time.  
![Dynamic Lang Dependency Inversion](/img/posts/dynamic-lang-dependency-inversion.png 'Dynamic Lang Dependency Inversion')
- Inverting dependencies is how boundaries are created between software modules. Whenever we want a boundary to exist we carefully choose which dependencies to invert and make sure that all the dependencies point in the same direction across the boundary. This is plugins are created.  
![Plugin](/img/posts/plugin.png 'Plugin')
- Plugins are modules that are anonymously called. In other words, the caller has no idea who or what it is actually calling.
- Create a system that is independently developable and deployable by creating plugins that are each independently developable and deployable
- The formal definition of the dependency inversion principle is simply this: high level policy shouldn't depend upon low level detail. Low level detail should depend upon high level policy.
- Building a reusable framework is hard. If you do not build it in parallel with at least 2 applications that use it, then you will almost certainly fail.
- Each low level application depends upon the high level framework. Thus, each application can be independently developed and deployed.  
![Framework Dependency Inversion](/img/posts/framework-dependency-inversion.png 'Framework Dependency Inversion')
- Shows operating system IO driver and furnace examples of dependency inversion

### Solid Case Study

##### Payroll Example
###### Use case list
- Add Employee
- Delete Employee
- Change Employee
- Pay Employees
- Add Time Card
- Add Sales Receipt
- Add Union Service Charge

###### Entity List/Data Dictionary
- employee = pay-type + pay-disposition + union-membership
    - pay-type = { commissioned \| hourly \| salaried } 
        - commissioned = base-pay + commission-rate + BI-WEEKLY 
        - hourly = hourly-rate + WEEKLY
        - salaried = salary + MONTHLY
- pay-disposition = {mail \| PAYMASTER \| direct-deposit
    - mail = address
    - direct-deposit = account
- union-membership = { MEMBER \| NON-MEMBER }
- time-card = date + hours-worked
- sales-receipt = date + amount-sold

###### Actors
- **Operations**: Add, change, and delete employees. Add time cards, sales receipts, and union service charges.
- **Policy**: Sets the policies and rules for how employees get paid like how much and when.
- **Union**: When to deduct union dues, how to charge for union service charges, and the whole issue of union membership.

- Elaborate diagrams are a waste of time and keeping them up to date is often too time consuming and not done. Might do some basic diagrams at the beginning just to communicate with the team and get everyone on the same page.  
![Add Employee Use Case](/img/posts/add-employee-use-case.png 'Add Employee Use Case')

###### Single Responsibility Principle
- Modules are separated so that they do not violate SRP  
![Employee Entity SRP](/img/posts/add-employee-entity-srp.png 'Employee Entity SRP')

###### Open-Closed Principle
- The add employee controller doesn't need to be recompiled and redeployed every time a new employee type is added or when the hourly employee request data structure is modified. It's closed for modification, but open for extension.  
![Add Employee Controller](/img/posts/add-employee-controller.png 'Add Employee Controller')

###### Liskov Substitution Principle
- The add time card use case needs to fetch an employee from the employee gateway and add a time card to it's hourly pay type. Don't violate the LSP. Only the hourly pay type should know about the time card, not the employee and not the pay type interface.
```java
public class AddTimeCardUseCase implements UseCase {
    public void execute(Request request) {
        AddTimeCardRequest tcReq = (AddTimeCardRequest) request;
        TimeCard timecard = TimeCard(tcReq.date, tcReq.hours);
        Employee e = employeeGateway.findEmployee(tcReq.employeeId);
        Hourly hourly = (Hourly) e.getPayType();
        hourly.addTimeCard(timecard);
    }
} 
```
- When all the methods of a derived class do nothing, there is no LSP violation. That's the NULL object pattern. Like the non-member union membership.  
![Add Time Card Use Case](/img/posts/add-time-card-use-case.png 'Add Time Card Use Case')

###### Interface Segregation Principle
- The request builder and use case factory should use build and make methods to segregate the interfaces (lose some type safety). Or each controller should depend on their own concrete implementation of these interfaces (gain type safety back, but have more interfaces). This way the add employee controller doesn't need to be recompiled and redeployed each time that a use case is added or removed.  
![Use Case Request Builder](/img/posts/use-case-request-builder.png 'Use Case Request Builder')

###### Dependency Inversion Principle
- The pay employees function is a great example of the DI principle: high level policy that is independent of low level detail. The algorithm is true for every employee type.  
![Pay Employees](/img/posts/pay-employees.png 'Pay Employees')

###### Know and honor the principles, don't be slaves to them
- Sometimes you can ignore these principles (they are not laws), but you should know which ones that you are ignoring
- No design should be fully SOLID compliant. That's an oxymoron. 