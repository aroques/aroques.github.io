---
layout: post
title: 'Episode 5: Form'
categories: [clean code, clean code fundamentals, software development]
date: 2020-08-15 16:15:00
---

#### Description

This episode starts with the form of individual lines of code and ends up describing the form of the partitions at the highest levels of a system. That's a huge range, and it all begins with comments.

Comments are lies.

OK, that's a pretty controversial statement, but in this episode, Uncle Bob attacks much of the old conventional wisdom about comments, formatting, coding standards, white space, indenting, switch statements, classes, data structures, databases, views, and even system design and the separation of applications.

How many comments should you write? When should you write them? Should you enforce comments with tools like Checkstyle? You can bet that Uncle Bob has a lot to say on these topics.

How big should a source file be? How long should a line of code be? How should you use whitespace within your source code? How should you indent? Should you have a coding standard? Uncle Bob's answers to these questions will surprise you.

What is the difference between a class and a data structure? What things do they protect you from, and what risks do they expose you to? How can you use data structures and classes to cover those risks and create solid designs?

Did you know that databases don't contain business objects? What do they contain, then? How should you design the boundary between your application and the database? For that matter, how should you design the boundary between your application and the views? Indeed, what about boundaries in general?

From the form of individual lines of code to the form of the boundaries that criss-cross the system, this episode will load your brain with a lot of new ideas to think about.

<!--more-->

#### My Notes

- Comments
- Coding standards: believes coding standard should be clearly visible from code itself - not necessarily another document.
- Comments should be rare: should be reserved for special cases.
- Comments are failures to write expressive code: want code expresses it's intent so well, that it doesn't need comments. 
- modern languages are remarkably expressive. processor are so fast and memory is so cheap that any minor inefficiency created by making your code more expressive can be ignored.
- Comments are lies: comments tend to be clutter and lies. Comments get out of date because they are non-local and because they may not be kept up to date.
- Good comments: Legal comments, informative comments: describe some horrible regex, clarifications and explanations of intent, warnings of consequences, and public API documentation.
- Bad comments: mumbling, redundant explanations, mandated redundancy, journal comments, noise comments, big banner comments, closing brace comments (no need anymore because of IDEs), attributions, HTML in comments, non-local information, commented out code
- Use explanatory structures: functions, variables, and names
- Formatting
- File size standards are: files that average 50 or 60 lines, most files less than one or two hundred lines, max file size of about 500 lines. Smaller is better.
- Vertical programming: 1 line between methods, 1 line between methods and variables, a blank line for more than 1 kind of variole like public and private. Separate if statements and while loops for rest of code with blank lines. Group things that are related together.
- Horizontal formatting: don't scroll to the right. lines average be about 30-40 characters. lines should be less than 100 or 120 characters.
- Indentation: be consistent, suggestions are: use spaces not tabs, use 2 characters to indent, use K&R braces style.
- Classes: private variables manipulated by public functions, so on outside looks like class has no variables - no observable state. why expose private variables through a set of getters and setters? a maximally cohesive method manipulates every variable within the class. the more variables that a method manipulates, the more cohesive it is. a maximally cohesive class is composed of only maximally cohesive methods. the more getters and setters a class has means the class is less and less cohesive class. minimize getters and setters, maximize cohesion. use tell don't ask, to minimize getters and setters.
- Car class and want to expose gallonsOfGas variable. So let's say you do getGallonsOfGas() method. This falls apart if you make a new class DieselCar or ElectricCar that inherits from the Car class. getPercentFuel() would have worked with all classes.
- Methods should hide the data and if they do expose the data, they should do so in the most abstract way possible.
- Data structures: set of public variables with no methods. Maybe will have simple methods like getters and setters or little navigation aids. Need a switch statement to perform operations like printing to the screen.  
![Delete an Employee](/img/posts/list-of-employee-switch-op.png 'Delete an Employee')
- If you add a new method to a base class, all the clients and derivatives of the base class are affected.  
![Add drive method to base class](/img/posts/add-drive-method-to-base-class.png 'Add drive method to base class')
- Adding a new function to data structures and switch statements does not break independent deployability. You just need to add a new switch statement - nothing else needs to change or be recompiled.  
![Functions and Data Structures](/img/posts/functions-data-structures.png 'Functions and Data Structures')
- Classes protect use against new type through the use of polymorphism, but expose us to new methods - if you add/update a method you need to update client and derivative code. Data structures protect us against new methods, but expose us to new types. If you add a new type you need to update every switch statement.
- Can you get protection from both new methods and new types (called the expression problem)? We'll look at this more in the design patterns series.
For independent deployability:
- Use classes and objects when it is types that are more likely to be added.
- Use data structures and switch statements when methods are more likely to be added.
- Boundaries: 
- Database tables are so concrete they never have a chance to be polymorphic. They're data structures (the opposite of a class).
- Impedance mismatch: can't map a database row to instance of an object, because it's not an object, it's a data structure. He does like ORMs, but because they map a data structure to a data structure. Specific applications might desire to have their own schema, but most conform to the needs of the enterprise.  
![Multiple Apps and One DB](/img/posts/enterprise-db-multi-app.png 'Multiple Apps and One DB')
- Views should know about (depend on) the app, but the app shouldn't know (depend on) the view.  
![View and App](/img/posts/view-and-app.png 'View and App')
- Separate domain objects and database with database interface layer. Database interface layer converts between business objects and database. The layer should depend (know about) the application and downward on the database. The application should not know about/depend on the layer and definitely not know about the database.  
![No Schema Knowledge](/img/posts/no-schema-knowledge.png 'No schema knowledge')
- Boundaries criss-cross application and separate concrete and abstract things. Concrete points towards abstract.