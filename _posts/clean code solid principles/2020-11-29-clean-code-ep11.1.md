---
layout: post
title: 'Episode 11.1: The Liskov Substitution Principle'
categories: [clean code, clean code solid principles, software development]
date: 2020-11-29 08:32:00
---

#### Description

Make sure to watch Part 2 after watching this episode!

Oh no! Not the Liskov Substitution Principle! Not that! Please! Anything but squares and rectangles and type and subtypes. Katie, bar the door! Mabel, hide the kids. Somebody run for the Marshall. Tell him, "LSP is coming!"

That's right, in this episode (after a brief diversion through wave/particle duality), Uncle Bob takes on the dreaded Liskov Substitution Principle. He'll tell you all about the history of the theory of types, including Russell's paradox, and Turing's revelations. He'll show how this theory influenced early computer languages like Algol, Fortran, Cobol, and even C++.

Then Uncle Bob will introduce you to Barbara Liskov, and the principle of substitutability that she wrote about back in 1988. He'll describe that principle in terms of modern languages like Java and Ruby, and he'll show how it relates to Martin Fowler's code smell of "Refused Bequest".

Then he'll dive into the favorite old conundrum of the squares and rectangles, and he'll show that inheritance is not what it appears to be, and certainly not what you have been told it is. He'll teach you about the Principle of Representatives and the implications it has for sub-typing and inheritance. And you Ruby programmers won't get off scot-free either! He's got plenty to say to you about subtypes in dynamic languages.

Next, Uncle Bob will show you the cost of violating the LSP and will present heuristics and techniques for identifying potential violations, and for correcting existing violations. On the way he'll talk about the dreaded if instanceof statement. He'll show why it is dangerous, and when it is appropriate.

Then, true to form, Uncle Bob will present a case study of a subtle LSP failure, and the horrific consequences it causes. You won't want to miss this part. By the time he's done you'll be hunting all through your code trying to find and repair potential LSP violations in order to prevent all the nasty 2AM phone calls you will otherwise receive.

So let the horses out of the corral, batten down the hatches, and run for the storm cellar, because LSP has arrived!

And remember to get Part 2 when you are done with Part 1!

<!--more-->

#### My Notes
- The rules of types apply, regardless of whether or not the compiler checks those types
- We don't care what is inside a type (how it is stored or represented), but we do care what a type can do 
- A type is a 'bag of methods' defined on private data, i.e., a class or object
- Subtypes can be used as their parent types
- Inheritance is necessary in statically types languages like C# & Java
- Dynamically typed languages use Duck Typing. As long as the object has that method it's OK. If not there will be a runtime error. Calling methods on a object can be called sending a message to that object.
- Refused bequest: when a method is called on a sub-type and that method is not defined. More subtle refused bequest is when a method in a sub-type does something that the client of the super type does not expect like cause a side effect or throw an unexpected exception.
- Example: when square inherits from rectangle. override setWidth and setHeight methods to set both width and height. methods that call setWidth on a rectangle would expect height to remain unchanged so this is unexpected behavior and can cause bugs and errors. 
- Would need to check the type of the object in a method an violate the open closed principle which causes rigidity.
- Representatives of things do not share the relationships of the things they represent. Two layers representing two persons who are getting divorced are not themselves getting divorced. 
- Geometrically, in the real world, a square is a rectangle but not when these objects are represented in software
- Can't model a integer is a real number is a complex number relationship. You'll blow the stack when you try to make a instance of a complex number because the definition is recursive.
- If S is a sub-type of T, a list of S is not a sub-type of a list of T
- Can't pass list of square into a function that expects a list of shapes because that function might add a square to the list, then it is no longer a list of squares in the calling scope
- A list of shapes represents a group of shapes and is not a shape itself so it does not share shape's relationships to it's sub-types
- To generalize this rule further, given that S is a sub-type of T, then the generic class P(S) is not automatically a sub-type of the generic class P(T)