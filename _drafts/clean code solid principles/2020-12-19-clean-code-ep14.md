---
layout: post
title: 'Episode 14: Solid Case Study'
categories: [clean code, clean code solid principles, software development]
date: 2020-12-19 16:37:00
---

#### Description

OK, this one's a little different. No science lesson. The tone is a bit more serious. (But, only a bit.) It's the conclusion to the series on the SOLID principles. In this episode we look again at the Payroll Example from Episode 7, but this time we do so in the light of the SOLID principles.

In this episode we start from use cases, and work through each of the principles to create a design. We break up the use cases by using the SRP. We start to build the architecture using the OCP. We find LSP issues to solve in the complex polymorphism hierarchies. We find the ISP lurking in factories. And, of course, the DIP is everywhere.

As we walk through this case study, we examine each principle in depth. We allow the principles to illuminate issues in the design, and then we discuss several ways those issues can be addressed. Bit by bit we piece together the design.

Then we close by taking a lesson from Joel Spolsky when he criticized these principles several years back, without really knowing what they were.

So sharpen your pencils, you're going to need them, because this is an in-depth review and case study of the SOLID principles.

<!--more-->

##### My Notes
##### Payroll Example
##### Use case list
- Add Employee
- Delete Employee
- Change Employee
- Pay Employees
- Add Time Card
- Add Sales Receipt
- Add Union Service Charge

##### Entity List/Data Dictionary
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

##### Actors
- Operations: add, change, and delete employees, add time cards, sales receipts and union service charges
- Policy: sets the policies and rules for how employees get paid like how much and when they get paid
- Union: when to deduct union dues, how to charge for union service charges, and the whole issue of union membership

- Elaborate diagrams are a waste of time and keeping them up to date is often too time consuming and not done. Might to some basic diagrams at the beginning just to communicate with the team and get everyone on the same page. 

![Add Employee Use Case](/img/posts/add-employee-use-case.png 'Add Employee Use Case')
##### Single Responsibility Principle
- Modules are separated so that they do not violate SRP
![Employee Entity SRP](/img/posts/add-employee-entity-srp.png 'Employee Entity SRP)
##### Open-Closed Principle
- The add employee controller doesn't need to be recompiled and redeployed every time a new employee type is added or when a the hourly employee request data structure is modified. It's closed for modification, but open for extension
![Add Employee Controller](/img/posts/add-employee-controller.png 'Add Employee Controller')
##### Liskov Substitution Principle
- The add time card use case needs to fetch an employee from the employee gateway and add a time card to it's hourly pay type. Don't violate LSP. Only the hourly pay type should know about the time card, not the employee and not the pay type interface.
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
##### Interface Segregation Principle
- The request builder and use case factory should use build and make methods to segregate the interfaces (lose some type safety) (or each controller should depend on their own concrete implementation of these interfaces - gain type safety back, but have more interfaces). That way the add employee controller doesn't need to be recompiled and redeployed each time a a use case is added or removed.
![Use Case Request Builder](/img/posts/use-case-request-builder.png 'Use Case Request Builder')
##### Dependency Inversion Principle
- Pay employees function is a great example of DI principle: high level policy should be independent of low level details. The algorithm is true for every employee type.
![Pay Employees](/img/posts/pay-employees.png 'Pay Employees')
##### Know and honor the principles, don't be slaves to them
- Sometimes you can ignore these principles (they are not laws) but you should know that you are ignoring it
- No design should be fully SOLID compliant. That's an oxymoron. 