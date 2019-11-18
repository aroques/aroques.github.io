---
layout: post
title: 'Episode 0: The Last Programming Language'
categories: [clean-code, software development]
date: 2019-11-17 13:32:00 -0600
---

#### Description

This is the keynote Bob Martin gave remotely at ACCU 2011.
Over the last 50 years we've seen a lot of computer languages, from procedural languages, to structured languages, to OO languages, stack languages, logic languages, and even graphical languages, and languages based on the game of life. We've seen so many different languages, and different types of languages, that we need to ask ourselves a question: have we seen them all?

Are there any more types of languages that we haven't seen? Or have we completely explored the language space? And if we have, then isn't it time we pruned the menagerie of languages down to a manageable few—perhaps even one?
Other industries have done this, so why not us? Others disciplines have brought their notations down from dozens to one: electronics, chemistry, biology, mathematics, etc. And the benefits they reaped by doing so were significant! Perhaps it's time for us to follow suit.

If we did choose a language, what kind of language would it be? What features would it have?What syntax would it follow? What paradigms would it conform to?

<!--more-->

#### My Notes

Programming paradigms impose constraints.

- Structural - take away direct transfer of control (no goto statements - easier to reason about)
- OOP - takes away indirect transfer of control (function pointers)
- Functional - take away assignment
- Aspect oriented programming is the exception; It increases our capabilities, but only popular for certain niches

Structure and interpretation of Computer Program explains functional programming well.

Why choose 1 programming language?

- No corporate control
- All papers and programs written in 1 language - wow

Bob Martin chose Clojure as last programming language.
Why?

- Runs on a virtual machine (not bound to hardware)
- Can be called by java/JVM and can call java/JVM. Can be called by .NET and can call .NET
- No goto statement
- Has polymorphism (no pointers to functions)
- Be symbolic (abstract): not tied to hardware (for example: knowing an int is 32 bits)
- Be textual (natural to think about, linear in time)
- Homoiconic (program can change itself when it is running - the code is the data and the data is the code)
- Not syntax heavy
- Has garbage collection (no manual cleanup of memory)
- Executes fast
