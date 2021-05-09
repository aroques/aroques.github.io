---
s
---

### Advanced TDD: part 1
- Red, Green, Refactor: define the problem (write just enough code to get a failing test), solve the problem (write just enough production code to get the test to pass), then clean up the mess (refactor).
- Starts NameInverter example at about 17:30 through to the end
- Arrange, Act, and Assert. The Arrange operation creates the context of the test, usually at least partially done in the setup function. The Act operation is when you call the function to be tested. The Assert operation verifies that the function being tested did what it was supposed to do. That assertion is one logical assertion and not necessarily a singular call to assert.
- AAA keeps every action tested independently. The output of one test should not be the input of another.

### Advanced TDD: part 2
Incremental Algorithmics
- As the tests get more specific, the code gets more generic
- Prime Factors TDD example starts at beginning and ends at 23:00
- **Getting stuck** is a technical term that means that there's nothing incremental that you can do to get the current failing test to pass
- Getting stuck is a symptom of a problem. That problem could be that you wrote the wrong test or maybe that the production code is too specific or maybe both.
- Word wrap TDD example starts at 28:00
- Always test the most degenerate test cases first. All the error condition and boundary conditions. All the simple stuff around the periphery of a problem before going for the guts of the algorithm.
- Tests are capable of constraining a program, but they cannot fully specify it. They can only prove a program wrong, they can't prove it right. It's up to the programmer to say it's right.

### Clean Tests
Anatomy of a Test
- Arrange, Act, Assert, and Annihilate (free allocated memory)
- The arrange function drives the system into a state in which it can be tested. Also called the **test fixture**.
- Three different approaches to manage this state (from *xUnit Test Patterns* book). 
- **Transient** fixtures are created and destroyed around every test while a **persistent** fixtures survives from test to test. A **fresh** fixture is initialized before every test, but a **shared** fixture allows some state to accumulate from test to test.
- Transient Fresh: lifetime limited to each test and initialized before every test. Example: jUnit constructor or setup method. Like eating on a clean plate.
- Persistent Fresh: Like transient fresh but maybe the test opens a socket, database connection, or a file, so it needs a teardown method to run after and clean something up. Like cleaning and using the plate you used for breakfast for lunch.
- Persistent Shared: Suite setups and teardowns are examples of this. Like eating a meal on a plate that has crumbs on it. Good for expensive resources like a database connection, but transient fresh is always best.
- The fresher the better so limit the use of teardown and try to avoid suite setups and teardowns.
- Sometimes setups and teardowns get very large and aren't needed by all tests so we want only certain setups and teardowns to run for certain tests.
- Tests can be grouped into hierarchies and those hierarchies can be loaded with specific setup and teardown methods such that when a test runs only those setups and teardowns it needs are executed.
- Can create test hierarchies in nUnit by creating tests classes that inherit from each other. Can make an inner test class that inherits from the outer test class. This is possible in jUnit but it's clunky and cumbersome - use @RunWith(Enclosed.class) annotation.
- The action is the thing you do that you are trying to test. Sometimes a single function is insufficient to represent the actions being tested. This is because the precursory functions change the state of the system and it is the sum of these changes in state that we want to test. It's not a bad idea to put these sequence of actions in a utility function that composes these actions that the test can call, called a **composed actions**.
- The number of physical assertions (assert statements) doesn't matter, but the test should be for 1 and only 1 **logical assertion**, called the **single assert rule**. This constrains each test to 1 act assert pair. Like actions, it is usually a good idea to put multiple physical assertions in a **composed assert** function.
- It's nice when tests each have only 3 composed functions, 1 for arrange, act, and assert.
- Make one-lines be a composed function for readability. Ex: assertEquals(of(8), list(2, 2, 2)) becomes assertPrimeFactorsOf(8, list(2, 2, 2)).
- Sometimes puts a sequence of tests into a single test. Like assertPrimeFactors() contains tests for all the different numbers. Yes, this breaks the single assert rule technically but there's not any state and it reads nicely like a specification table.

### Test Design
Test Location
- In Fitnesse the test files are put in the same directory as the production code. Like this style because always knows where tests are. Has an ant task that ignores the files that end in 'test' so that the tests aren't compiled and deployed with the production code. The other more modern place to put tests is in a test directory that IDEs can mark.
- In general, have 1 test file per class. Interfaces won't have tests and inner classes will be tested by the tests that test the outer class.
- If a single class gets refactored into multiple smaller classes than the tests won't be broken up as long as the new classes are only used by the original class like in the video store example.
- Can have **test suites** or a subset of tests that can be ran together and are faster to run than running all the tests. IDE gives suites at the package level. Can right-click on a package and run all the tests in a package. Might only run the tests in a package while developing and then run all the tests less often like at the end of a pomodoro because is takes more than a minutes to run all the tests. If you aren't using an IDE, then you'll have to make your own test suites to run sub-sets from the command line.
- Tests that don't conform to the SOLID principles are **fragile**. Fragile tests are when multiple tests break from one change to production code.
- If your production classes follow the SRP and you generally have one test per production class, then your tests should also follow the SRP.
- Want production code to be open for extension, but our test code not to have to change or change very little. I.e., We want our tests to be closed for modification.
- We don't want our tests to know too much because then when implementation details change the tests will need to change as well.
- Our tests should conform to the Liskov Substitution principle. When using an overriding class it should not be able to tell the difference between using a base class. Otherwise, we might be tempted to put something in those inheriting classes to make the tests pass when they should fail. Ex: a SafeEmployeeDB class w/ a delete method that does nothing
- If the tests use interfaces with methods that they don't call, then, like any other client, they have too much knowledge and are violating the Interface Segregation principle. Create a new interface that the test can use. If it's not used by any production client, then that's ok. It will make the tests less fragile.
- Tests should always have a source code dependency upon the production code. The runtime dependency can go either way.
- Private functions are tested by tests that test the public functions that call them
- If you don't know what test to write, think of what production code you want to write, then write the test that forces you to write that production code.
- Often TDDers will write down tests that they think need to be passed as they think of them before they write them. There is some planning involved in TDD, just not weeks or months worth of planning. Often the act of writing one test can cause you to think of more to add to your list.
- Another way to say Arrange, Act, Assert is Given, When, Then and that can be used to help name our tests.
- Setup/arrange functions/classes should name the Given. Like GivenEmployeeWithStandardHourlyRate
- The test should name the when, then part. Ex: whenPayrollIsRun_ThenPaymasterWillHoldCheckForHoursWorkedTimesHourlyRate
- Doesn't always name tests with given, when, then, but its pretty good rule of thumb.
- Has good example of payroll test design
- Naming our tests well helps us writes tests that are specifications rather than verifications

### Test Process
Simple Techniques
- **Fake it 'till you make it**: make a test case pass by faking it. ex: returning true that a stack is empty in the beginning of a stack kata. This code seems wrong, but it is correct for the current tests that are passing. It's a way to gradually increase complexity. Write simple test cases first to avoid 'getting stuck'.  
Stairstep Tests
- Like digging a hole gradually. Dig 12 inches to create a step, then dig another 12 inches, plus 12 inches deeper to create another step. Keep repeating until you have your hole.  
- Same method during TDD. When you write a test to setup the next text.
- Bowling game example: createGame(), rollBall(), refactor and remove createGame() test. Implement gutterGame(), then refactor and remove rollBall() test. Removing these tests because they are included in the more complicated test. These deleted tests are called *stairstep tests*.  
Assert First
- Write the assert first. Handle compiler errors, then execution errors to create the code that makes the test pass. Cool/nice way to create write the test 'backwards'.  
Triangulation
- Writing another test that forces a more generic solution. Ex: savings account with balance of 100 earns 3% interest and an account with a balance of 200 earns 6% interest. Then, create money market account with same two balance tests, but interest of 4% and 8%. Triangulated to create a base class and two inheriting classes that set the interest rate to 3% and 4%. 
- A **blink test** is when you quickly click back and forth between two files to see the differences and notices that they are basically identical. Like an informal code diff.  
One to Many
- Implement operations that will operate on a collection of objects by first implementing the operation to operate on one object first. Ex with stack kata: Start with afterPushingX_willPopX() test. push(88), then pop(88). push(99), then pop(99). Get to pass by saving the pushed element and returning it (the singular case). Then implement the pluarl afterPushingXandY_willPopYthenX() test case.
- These techniques are sampling from *TDD by Example* by Kent Beck, *xUnit Test Patterns* by Gerad Mitsaros, and *Growing Object Oriented Software Guided by Tests* by Steve Freeman and Nat Pryce.  
Refactoring Tests
- If you don't keep the tests clean, then they get harder to maintain and more fragile. If they are fragile and hard to maintain they get removed. Eventually the test suite can't be depended upon. Then, the production code cannot be maintained and it rots.  
The Two Disks
- A trap door function is easy to evaluate in one direction but not the other.
- Production code on one disk and test code on the other. One of the disk crashes. Which one would be preferable to keep?
- Also benefit from the second system effect: the second time that is system is developed, the design will likely be better.
- Can recreate the production code from the tests and recreate it better.The tests are specifications for the production system. Rewriting the production code is simple a matter of getting each test to pass. But we cannot recreate all the tests from the production code.
- It follows that the test code is more important than the production code and like production code, it must keep it as clean as possible and repeatedly refactored.  
Tests are Specifications
- If the tests pass we ship and deploy the software. If they don't pass we don't ship and deploy the software. Therefore, the tests are the software requirements.
- Write the test that you'd want to read. Like 1 function for each part of the test: Arrange, Act, Assert.  
Tests Come First
- Ron Jeffries' rules for simple design: 1) Pass all the tests, 2) Contains no duplicate code/apply solid and design principles, 3) Expresses all the ideas that the author wants to express, 4) Minimizes classes and methods/optimize for speed  
Heresy
- This method works good for production code, but not tests.
- For tests, make them expressive first, then make them pass. Like with the assert first technique.

### Mocking: Part 1
- Login test uses stubs and spies
- TDD strongly promotes good architectural boundaries in applications  
  Test Doubles
  ![Ontology of Mock Objects](../../img/posts/mock-objects.png 'Ontology of Mock Objects')
- **Test double** is abstract
- **Dummy** objects implements an interface such that all the functions do nothing. If they return a value, they return as close to 0 or null as possible. Useful when neither the test nor the function being tested needs the object to have data/real methods. Example is when an object is going to be passed in, but the first line throws an exception for some reason that is independent of the object's state.
- The **Stub** is a dummy whose functions do nothing, but returns special fixed values needed for driving production code through certain pathways for the purposes of testing. Tests will usually reuse stubs so usually there will be far fewer stubs than tests.
- The **Spy** is a stub whose functions perform no external actions and like stubs return fixed values to drive production code through specific pathways to be tested. However, the functions of spies record facts about their invocations and make those facts available to test so that the tests can verify that those functions were called properly. Useful for testing that an external service is getting called. Spies spy on the algorithm that is being executed by the production code. A spy can tell you which functions were called, when they were called, how many times they were called, and what arguments were passed into them.
- The **Mock** is a spy, but unlike a spy, it knows what should happen. The test asks the mock if everything went as expected (usually with a verify..() call) Example: LoginMock holds a list of actions (strings) and records an action for each of the 3 logins and an action for the hold function. The test checks that the mock has those 4 actions recorded in the expected sequence for verifyAccountHeldAfterThreeFailedLogins().
- The **Fake** is not a test double, it's a simulator that responds differently to different inputs. Like return good user id if username starts with "good" and return a bag user id otherwise. Fakes can get complicated and want to write them with TDD. So, you want tests to test your fakes. For unit tests, fakes are unnecessarily complicated, but can sometimes simple fakes can be useful for integration tests. Avoid them when you can.

### Mocking: Part 2

Behavior vs. State

- **Mockist** (London school) of TDD:  puts an emphasis on the use of spies to verify the implementations of algorithms. Tolerate increased coupling because of the increased assurance.
- **Statist** (Chicago school) of TDD: puts an emphasis on the values returned by functions and prefer to decouple the tests from the implementation of the algorithms they test.
- Spying is very useful when testing things that cross dependency inversion boundaries of the system. However if you're not testing something that crosses a DI boundary, then a statist approach is probably better because is drastically reduces the coupling of the test to the implementation.

Mocking Patterns

- **Test Specific Subclasses** can be used to modify or eliminate any behavior of the methods of a class. Methods of the class being tested are protected and overridden in the test-specific subclass. Ex: checkSeal and engagePump methods of a milker class when milk method is being tested.  
![Test Specific Subclass](../../img/posts/test-specific-subclass.png 'Test Specific Subclass')  

- **Self Shunt**: The test itself becomes the mock by implementing the service interface and then passing itself into the class to be tested. Ex: Test implements Gate interface and passes itself into the setGate() method. The power of the self shunt pattern is magnified by the fact that the test class can implement more than one interface so  even if you're testing a class with a lot of external connections the test class can act as the stubs and spies of all of them.   

![Self Shunt](../../img/posts/self-shunt.png 'Self Shunt')  

- **Humble Object**: Separate and decouple the the testable code from the untestable code that communicates across the boundary. That decoupling is accomplished by inverting the dependency so that the untestable code depends on the testable code. Ex: separate milk pump control (engage) 'rammpup' algorithm from the other control board stuff that is hard to test. Makes the pump register object 'humble'.

![Humble Object](../../img/posts/humble-object.png 'Humble Object')  

-  Can use this to test GUIs. Want to test GUIs with your eyes. GUIs should be humble objects coupled to a fake process. Want no business logic in the GUI code. GUI has a MilkerControlPanelConnector that takes in a process. Connector has start, stop, and load static values and update dynamic values methods and do does the process.

  Testing Frameworks

- Doesn't use mocking frameworks because tests are so easy to write and the mocks can be given good names that make tests more readable and they can be reused by other tests. Doesn't like the way tests read when the behavior of the mocks is specified in the setup method. Mocking frameworks can do powerful things like modify sealed or private variables or access private methods so they do come in handy for testing legacy systems.
