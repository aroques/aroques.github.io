---
layout: post
title: 'Episode 0: The Last Programming Language'
categories: [clean-code, software development]
date: 2019-11-17 13:32:00 -0600
---

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
