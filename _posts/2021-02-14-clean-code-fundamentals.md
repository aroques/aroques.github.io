---
layout: post
title: 'Clean Code Fundamentals'
categories: [clean code, clean code fundamentals, software development]
date: 2021-02-14 09:25:00
---

### Names
###### Desirable Attributes
- Should reveal intent
- Avoid disinformation
- Should be pronounceable
- Avoid encodings like Hungarian notation. No need to add prefixes to indicate the type like bIsOpen or p_PrivateMemberVariable. IDEs can handle that now.  

<!--more-->

###### Parts of Speech
- Classes and variables should be nouns
- Methods and functions should be verbs
- Booleans should be predicates (ex: isEmpty)

###### Name Length
- **The scope rule**: variable name length should correlate with scope length. I.e., variables that are in small short scopes should have small short names and variables that are in a larger longer scopes should have larger longer names.
- **Public method names** should be short since they will be called from different placed and we want calling them to be convenient. 
- **Private method names** can be longer to serve as good documentation and since they will only be called few times.
- The same naming rules for method names apply for **public and private class names**. Public class names should be shorter and private names can be longer. Note that derived classes tend to be longer (ex: Savings Account that derives from Account)

### Functions
- A function should do one thing
- The first rule of functions is that they should be small. The second rule is that they should be smaller than that.
- Don't worry about the efficiency of function calls
- Should be 4-6 lines long and no more than 20 lines.
- A class is a group of functions that use a common set of variables and a large function is where classes go to hide
- Extract till' you drop to create smaller functions

### Function Structure
###### Function Arguments
- Functions should have 3 arguments max and fewer are better.
- If 3 arguments are so cohesive that they can be passed into a function, then why aren't they a class? Bob feels the same way about constructor arguments. He'd rather use a bunch of setters or guest speaker mentioned that one could use a builder pattern or pass an object or struct into the constructor.
- Functions shouldn't have any boolean arguments ever. Boolean arguments loudly say that the function does 2 things. Instead write 2 functions: 1 for the true case and 1 for the false case.
- Use only input arguments and no output arguments. Output arguments are not expected.
- Don't handle nulls parameters inside functions. Write two functions: one that doesn't take the parameter and one that does. Handling nulls arguments inside a function is basically a psuedo-boolean.

###### Function Order
- **The stepdown rule** says that important stuff should go towards the top of a file and details should go towards the bottom. Similarly, public members should go towards the top of a file and private members should go towards the bottom. Function calls should point down. Order functions in the order that they are called and in the order of their hierarchy. Keep listing child functions until no more exist, then start at next parent function. What if there are two public functions? Then, put the second public function at the end of the first public function's child functions.
- C++ used to have a **scissors rule** that said public members should be at the top of file and private members should be at the bottom. Then, someone could cut off the top of the page or file that had all the public members and hand it to the users. Java puts private members at top of a file so it doesn't follow this.

###### Dependency Management
- One thing that OOP does very well is manage dependencies. Module A calls a function held in module B. So at runtime, A depends on B. These modules cannot be deployed separately. Any change to module B will force a recompile (and re-deployment) of module A.  
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
- Having module B inherit from an interface changes the direction of the source code dependency (at least from the perspective of module B). Each module can now be deployed independently. Module A knows nothing of module B. Module B plugs into module A. In fact, many different module Bs can plug into A.  
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
- **Switch statements** (or long chains of if-else statements) create a fan of dependencies that make independent deployability virtually impossible. Switch statements can be replaced (with polymorphism) by making an abstract base class that has a method for whatever operation that the switch was performing. Then, make inheriting (derived) classes for each statement. This inverts the source code dependencies. Typically create those instances in some kind of factory.
- Switch statements don't cause a problem if they are in a safe independently deployable plug-in module.
- You should be able to draw line between core (App) functionality and Main to create to partitions. Main should be kept small and should point towards the app. It should plug-in to the app. This is called dependency injection.
  ![Main and App Partitions](/img/posts/main-and-app-partitions.png 'Main and App Partitions')
- You want a system of independent deployable modules. A system that is independently deployable is also independently developable and teams can work independently.

###### Programming Paradigms
- Paradigms are functional, structured, and object-oriented.
- **Functional programming** was the first paradigm to be invented (in 1957) with LISP and the last paradigm to become popular. There are no assignment statements. Instead of storing values in variables,  values are passed as arguments into functions. Instead of looping over variables you recurse through a set of function arguments. Given the same input, functions will always return the same output. System state doesn't matter and no side effects.

###### Side Effects
- **Side effects** are when a function changes the system state that exists outside of it's scope. This makes systems difficult to understand and are a consistent source of errors. Some examples of side effect causing couplings are open before close or new before delete. This is called **temporal coupling**. You can eliminate temporal coupling by **passing a block**. Passing a block is when you have one function open a file, perform the operation, and then close the file. This leaves the system in the same state that it was before. Our goal is not to eliminate side effects, but to impose discipline on where and when they happen. We want to be able to cause side effects like writing to files.  
  ```
  // 'passing a block' example
  f.open(); 
  
  // becomes...
  public void open(file f, fileCommand c) {
      f.open();
      c.process(f);
      f.close();
  }
  ```
- **Command query separation** is a successful discipline for managing side effects. A command changes the state of a system. It has a side effect. A query does not. A query returns the state of the system or the value of a computation. A command changes the state of the system and returns nothing. Getters and setters are a good example of command query separation. If a command fails, throw an exception, don't return an error code.  
  ```
  int f();  // query, returns a value
  void g(); // command, doesn't return a value
  
  // Example of bad command:
  // Why does the authorizer return the user?
  // Are we supposed to do something with that user?
  User u = authorizer.login(username, password);
  ```
- **Tell, don't ask**. Tell objects to do work. Do not ask objects what their state is. We don't want to ask an object's state and make decisions on it's behalf. It knows it's own state and can make it's own decisions.  
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
- **The Law of Demeter** says that functions should have limited knowledge of the system. The following code line violates this severely. Law of Demeter is tell don't ask, formalized as, you may call methods of objects that are:
  1. Passed as arguments
  2. Created locally
  3. Instance variables
  4. Globals
  
  You may not call methods on objects that are return from a previous method call.  
```
// violates the law of demeter
o.getX().getY().getZ().doSomething();
```

###### Program Control Flow
- **Structured programming** is the youngest of the three disciplines. OOP came second between '62-'66. Structured programming didn't really come to fruition until Dijikstra published his *GoTo Considered Harmful* paper in 1967. That says that all algorithms should be composed of three basic operations: sequence, selection, and iteration. This allows code to be reasoned about sequentially because each of the structures correctness does not depend on any of the others. A system whose correctness can be proven is an understandable system. All structures, algorithms, modules, systems, etc have a single entrance at the top and a single exit at the bottom.
- **Early returns** at the beginning of a function are no big deal. However, early returns or breaks from a loop makes the loop a whole lot more complicated and harder to understand so they should be avoided.

###### Error Handling
- Michael Feathers once wrote that "Error handling is important, but if it obscures logic, then it's wrong".
- It's always best to **write error-handling code first** so that you don't end up with an implementation that cannot handle errors well.
- **Prefer exceptions over returning values**. Scope exception to the class that throws it and have the exception contain as much information as possible. Don't use checked exceptions - derive exceptions from RuntimeException. The name and context of the exception should be mostly informational enough and they shouldn't need a big message, if any.
- The **special case pattern** can prevent your code from being cluttered with special handling. For example, a zero capacity stack. A factory pattern can be used to implement the special case or null object pattern and can return a ZeroCapacityStack object when capacity is zero. Top() should throw an exception, rather than return NULL, since NULL would be unexpected. Find() returns NULL because it is excepted, meaning the value wasn't found.
- **Trying is one thing**. There should only be only one line of code inside a try block and the function that contains the try block should end after the catch and/or finally blocks.

### Form
###### Comments
- **Coding standards** should be clearly visible from code itself - not necessarily another document.
- Comments should be rare and should be reserved for special cases.
- Comments are failures to write expressive code. Code should express it's intent so well, that it doesn't need comments. 
- Modern languages are remarkably expressive. Processors are so fast and memory is so cheap that any minor inefficiencies created by making your code more expressive can be ignored.
- Comments tend to be clutter and lies. They get out of date because they are non-local and because they do not have to and may not be kept up to date.
- **Good comments** are legal comments, informative comments (for example, that describe some horrible regex, clarifications, and explanations of intent), warnings of consequences, and public API documentation.
- **Bad comments** are mumbling, redundant explanations, mandated redundancy, journal comments, noise comments, big banner comments, closing brace comments (no need anymore because of IDEs), attributions, HTML in comments, non-local information, and commented out code.
- Use explanatory structures, like well named classes, functions, and variables, instead of comments 

###### Formatting
- FitNesse file size statistics (to serve as guidelines) on average are 50-60 lines long. Most are less than 100-200 lines, and the max file size is about 500 lines. Smaller is better.
- **Vertical programming**: 1 line between methods, 1 line between methods and variables, a blank line for more than 1 kind of variole like public and private. Separate if statements and while loops from other code with blank lines. Group things that are related together.
- **Horizontal formatting**: Don't write lines so long that you must scroll to the right to read it all. Lines on average should be about 30-40 characters in length and should be less than 100 or 120 characters.
- **Indentation**: Be consistent. Some suggestions are to use spaces not tabs, use 2 characters to indent, use K&R braces style.

###### Classes and Data Structures
- **Classes** should be private variables manipulated by public functions, so on the outside the class looks like it has no variables and no observable state. Why expose private variables through a set of getters and setters? A maximally cohesive method manipulates every variable within the class. the more variables that a method manipulates, the more cohesive it is. A maximally cohesive class is composed of only maximally cohesive methods. The more getters and setters a class has means the class is less and less cohesive class. Minimize getters and setters, maximize cohesion. Use tell don't ask to minimize getters and setters.
- For example, imagine a Car class with a getGallonsOfGas() (getter) method that exposes a gallonsOfGas variable. This falls apart when a new  DieselCar or ElectricCar class that inherits from the Car class is added. A getPercentFuel() would have worked with all classes.
- Methods should hide data and if they do expose the data, then they should do so in the most abstract way possible.
- **Data structures** are a set of public variables with no methods. They might have simple methods like getters and setters or little navigation aids. Switch statements are needed to perform operations like printing to the screen or deleting an employee (shown below).  
![Delete an Employee](/img/posts/list-of-employee-switch-op.png 'Delete an Employee')
- If you add a new method to a base class, then all the clients and derivatives of the base class are affected. For example, a getPercentFuel() method added to a car base class (shown below).  
![Add drive method to base class](/img/posts/add-drive-method-to-base-class.png 'Add drive method to base class')
- Adding a new function to data structures and switch statements does not break independent deployability. You just need to add a new switch statement - nothing else needs to change or be recompiled. This is illustrated below with shape data structures and their corresponding methods.  
![Functions and Data Structures](/img/posts/functions-data-structures.png 'Functions and Data Structures')
- **Classes** protect against new types through the use of polymorphism, but expose us to new methods. If you add or update a method, then client and derivative code needs to be updated. **Data structures** protect us against new methods, but expose us to new types. If new type is added, then every switch statement needs to have a method for that type added to it. However, adding or updating existing methods can be easier because a change doesn't necessarily affect all client and derivative code.
- Can you get protection from both new methods and new types (called the expression problem)? This will be looked at more in the design patterns series.
- For independent deployability, use classes and objects when it is types that are more likely to be added and use data structures and switch statements when methods are more likely to be added.

###### Boundaries 
- Database tables are so concrete that they never have a chance to be polymorphic. They're data structures, the opposite of a class.
- There is an **impedance mismatch** because a database row cannot be mapped to and instance of an object because it's not an object. It's a data structure. Uncle Bob does like ORMs, but because they map a data structure to a data structure. Specific applications might desire to have their own schema, but most conform to the needs of the enterprise (shown below).  
![Multiple Apps and One DB](/img/posts/enterprise-db-multi-app.png 'Multiple Apps and One DB')
- Views should know about (and therefore depend on) the app, but the app shouldn't know about (and depend on) the view.  
![View and App](/img/posts/view-and-app.png 'View and App')
- Separate domain objects from the database with a database interface layer. The database interface layer should convert database rows to business objects and vice-versa. The layer should depend on (know about) the application and point towards the database. The application should not know about and depend on the interface layer and should definitely not know about and depend on the database (shown below).  
![No Schema Knowledge](/img/posts/no-schema-knowledge.png 'No schema knowledge')
- Boundaries should criss-cross the application and separate concrete things from  abstract things. Concrete things should points towards (and depend on) abstract things.

### TDD
###### Part 1
- Code cannot be cleaned until the fear of change is eliminated
- TDD keeps defects low
- A TDD demonstration starts at 20min and ends at 37min
- Tests save a lot of time. Develop faster and safer with fewer defects and debug less. Code faster and code better.
- The **three laws of TDD** are:
  1. Write no production code except to pass a failing test
  2. Write only enough of a test to demonstrate a failure
  3. Write only enough production code to pass the test
- When following these laws, a little test code is written, then just enough code to get the test to pass is written. This creates little cycles that are maybe 20 seconds long.
- TDD can easily cut debug time in half or perhaps reduce it by a factor of 10 
- Tests serve as the perfect low-level design document. Great code examples and they can't get out of sync with production code.
- Writing tests first makes production code testable and decoupled because the tests need to access the functions being tested
- Perhaps the biggest advantage of TDD is that it gives developers the courage and confidence to clean and improve code
- If these three laws aren't followed, then there will be holes in the test suite

###### Part 2
- There is a bowling game demonstration at 3min and it ends at 42min. Also, there is a good UML diagram of this bowling game.
- He demonstrates the red, green, refactor method for TDD
- Implement the simplest cases first. For example, an all gutters game, then an all ones game.
- Removes simple tests that are contained in other tests as you go during the refactor phase
- Next, he implemented getting one spare
- Can @ignore a failing test so that you can refactor to a different design
- Refactor tests as if they were production code and keep them clean
- A very simple algorithm was arrived at by following this step by step TDD development method
- A change to production code shouldn't cause many tests to fail. If it does, a redesign of the tests should be considered
- How to test GUI code? Have a presenter that has logic about what's in a dropdown and boolean for disabled buttons and test that. The presenter will feed data structures to the view and the view will render it.
- TDD is double-entry book-keeping for software developers. Like accounting, flipping a single bit or number can be very problematic.
- 100% code coverage is the goal but is usually not attainable. Fitnesse is 95% and he does try to continually push the percentage higher.

### Architecture, Use Cases, and High Level Design
- A good architecture is all about use cases. Just like how a well designed library or church 'screams' library or church  well designed accounting system should scream 'accounting'.
- Good architecture focuses on use cases and allows you to defer decisions about the UI, tools, frameworks, and databases.
- This allows better estimation of the cost and value of different components like the UI or the business logic which supports prudent decision making.
- Use cases are delivery independent descriptions of how a user is to interact with the system
- Use cases have a **primary course** (an algorithm for when nothing goes wrong) and **exception courses** which are algorithms that define how to handle when something going wrong. For example, that  a validation error should notify the user.
- *Writing Effective Use Cases* and *User Stories Applied* are good books to check out on the subject
- **Entity objects** are application independent repositories for business rules.
- **Interactor objects** are application specific business rules
- **Boundary objects** accept and deliver data from and to the user
- The *Agile Principles, Patterns, and Practices* book has a use case case study
- A good architecture maximizes the number of the decisions *not made*