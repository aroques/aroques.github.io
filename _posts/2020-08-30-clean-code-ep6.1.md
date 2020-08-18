---
layout: post
title: 'Episode 6: TDD: part 1'
categories: [clean code, clean code fundamentals, software development]
date: 2020-08-30 10:35:00
---

#### Description

There was just so much Uncle Bob had to say about TDD that he needed two episodes to say it. This is part one.

This episode begins an epic debate between the vanguard of craftsmanship and the mirror forces of traditional development. The gauntlet is thrown when Uncle Bob describes the real reason that code rots over time, and how that rot can be prevented and even reversed by a comprehensive suite of tests created through the discipline of Test Driven Development.

The mirror forces rise to the challenge and demand answers to the traditional and entrenched objections that have, for years, convinced them that TDD is a discredited and vacuous doctrine. Uncle Bob describes what TDD is and how it works before he tackles the objections directly. The mirror forces are restive, but agree.

After a brief time-out, during which Uncle Bob describes the origins of the Moon, he dives into the argument for tests. He talks about why code really rots, and what happens when it rots too much. He talks about the failure of big cleanup projects, and how development teams are often dominated by the fear of changing the code. "Code rots", he says, "because we are afraid to clean it."

Then Uncle Bob addresses that fear, and makes the point that if you had a suite of tests that covered every line of code in the system and ran quickly, you would not be afraid to make changes. You would not be afraid to clean the code.

Next, Uncle Bob dives into the three laws of Test Driven Development—the central discipline of TDD. He describes each of those laws in turn, and answers the brief objections raised by the impatient mirror forces. Then Uncle Bob describes the benefits of following those three laws: the reduced debug time, the production of reliable low level documentation, the decoupling of the design, and the elimination of the fear of change.

Finally, in the face of rising skepticism and impatience from the mirror forces, Uncle Bob finds a messy function in an open source project that is covered by tests, and proceeds to clean it fearlessly. The results are impressive, and the mirror forces hold back their ire to await the promised debate.

Here endeth the lesson, or at least part one.

<!--more-->

#### My Notes

- Can't clean code until we eliminate the fear of change
- Keeps defects low
- Demonstration starts at 20min and ends at 37min
- Tests save a lot of time. Develop faster and safer, fewer defects, debug less, code faster, code better.
- Three laws of TDD: 1) write no production code except to pass a failing test, 2) write only enough of a test to demonstrate a failure, 3) write only enough production code to pass the test
- Creates a little test, little code cycles, maybe 20 seconds long
- Easily cut debug time in half or perhaps by 10 times
- Design documents: the perfect low-level design document, great code examples, and can't get out of sync
- Decoupling: writing tests first makes production code testable (decoupled) because the tests need to access the functions.
- Courage to change: perhaps the biggest advantage, allows developers to clean and improve the code.
- Trust: if you don't follow the three laws, then you create holes in your test suite
