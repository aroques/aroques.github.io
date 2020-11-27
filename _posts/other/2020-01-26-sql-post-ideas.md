---
layout: post
title: 'SQL Post Ideas'
categories: [SQL, software development]
date: 2020-01-26 18:17:00
---

#### Description

Read on to see list of ideas for SQL posts

<!--more-->

- Way to limit a set: IN vs EXISTS vs JOIN. Basically prefer EXISTS becuase NOT IN can return nothing if NULL is present. And better than JOIN because it is more explicit: why get access to those extra columns if you don't need it.

- Error Handling. THROW vs RAISEERROR. Basically prefer THROW becuase it is syntactically simpler and reccomended by MSDN. Use error code 50000 becuase it is not/cannot be a system error # or a user created error. Or even betrer perhaps, create a user error in the syserrors table. Use 1 for the last state parameter. Basically this is to differentiate between different reasons for the same error.

- Agent job design. Basically create and STP that contains TRY...CATCH and it's own transaction. Last step could/should check for failures and email if needed. That way you can have the job retry X times and not email unless it completely failed out.

- Always specify schema and use aliases.

- TRY_PARSE should be prefered over IS_NUMERIC.

- Temp tables vs Table variables.

- Should you drop you temp table at the end of an STP?

- Indices

- CTEs vs Sub-querys. Basically I think they perform the same.
  CTEs should be preferred over temp tables though. I like CTEs better becuase they can be chained together without excessive/any nesting and they read from top to bottom. They don't have any nesting where subquerys do.

- SELECT INTO is awesome. Is there any cons?

- Can insert results of an STP into a temp table, but need to define the columns first.

- UPDATE FROM is awesome. You can specify the alias after the UPDATE, which I prefer becuase it is easier to understand. You can only update 1 table per UPDATE statement. Same goes for delete. You'll only DELETE records from the 1 table.

- JOIN ordering - how does that work? In a nutshell, a derived table is created which follows the ordering that the tables are specified in.For example: T1, after a join... DT1, after another join... DT2, after the next join.... DT3, amd so on...

- Window functions: they're pretty cool. When to use them? Which ones are most useful?

- Read execution plans from right to left. Description of symbols you'll see?

- Don't use functions in SELECT list and WHERE clauses. It's freakin' slow.

- CROSS and OUTER APPLY: what's that?

- When to use a CROSS JOIN: whats's that?

- When to use PIVOT: what's that?

- Table-valued functions

- GROUP BY and HAVING

- CASE WHEN statmentss

- Computed columns
