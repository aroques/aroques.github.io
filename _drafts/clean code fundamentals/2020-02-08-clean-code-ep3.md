---
layout: post
title: 'Episode 3: Functions'
categories: [clean code, clean code fundamentals, software development]
date: 2020-02-08 18:00:00
---

#### Description

How big should a function be? Twenty lines? A full screen? Is there a way to know if your functions are the right size?

Object-Oriented Design involves the art of breaking applications into classes. But, have you found all the classes in the design of your application? Is there a way to know?

Functions are supposed to do "one thing", do it well, and do it only. But what is "one thing"? Is there a way to tell if your functions are obeying that rule?

The answer to all these questions is, yes! And not just with some fuzzy hand-waving platitudes, either—there are fool-proof and unambiguous answers to these questions.

In this episode Uncle Bob shows you, in no uncertain terms, how to tell if your functions are the right size. He'll show you how to be certain that you've found all the classes in your design. He'll show you where they go to hide, and how to dig them out. And he'll show you what "one thing" really means, and how to make sure your functions are doing one and only one thing.

This episode is loaded with code, but it's no screencast! Oh, you'll see some screencasts, but not in the ordinary way—not hardly. Uncle Bob controls these screencasts—he controls the audio, the video, the speed, and the magnification. He narrates and summarizes and points out the highlights. You'll see what you need to see, without waiting for the typing. In fact, Uncle Bob compresses two hours of screencasts into three sessions totaling about twenty minutes. So, it's a wild ride.

On that ride you'll learn why function size is so important to Object-Oriented Design, and also to programming in general. You'll learn the craftsman's way of writing and refactoring functions.

<!--more-->

#### My Notes

- Classes tend to hide in large functions
- A function should do 1 thing
- First rule of functions is that they are small, second rules is that they are smaller than that
- Don't worry about the efficiency of function calls
- 4-6 lines long - no more than 20 lines
- A class is a group of functions that use a common set of variables
- A large function is where classes go to hide
- Extract till' you drop
