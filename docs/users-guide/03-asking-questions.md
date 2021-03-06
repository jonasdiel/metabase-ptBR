
## Asking Questions
---
Metabase's two core concepts are questions and their corresponding answers. Everything else is based around questions and answers. To ask Metabase a question, use the question builder.  

![queryinterfacebar](images/QueryInterfaceBar.png)

Questions are made up of a number of parts: source data, filters, and answer output.

### Source Data
---
All of the data in databases are in tables. Typically, tables will be named for the thing that each row in the table contains. For example, in a Customers table, each row in the table would represent a single customer. This means that when you’re thinking about how to phrase your question, you’ll need to decide what your question is about, and which table has that information in it. The first dropdown menu in the question builder is where you’ll choose the table you want.  

### Filters
---
Filtering your data lets you exclude information that you don’t want. You can filter by any field in the table you're working with, or by any tables that are connected through a foreign key. Filters narrow down the source data to an interesting subset, like "active users" or "bookings after June 15th, 2015."  

Different fields will have different filter options based on what kind of data type they are. There are four universal filter options, or “operators,” that can be applied to any field. These operators are:

* *is a value,* e.g., "Status is 'closed'"
* *is not a value,* e.g., "Status is not 'closed'"
* *is null*, i.e., the cell in the field is empty
* *is not null*, i.e., the cell in the field isn’t empty 

Some fields have a limited number of possible operators. Metabase will pick up on this and limit the choices in the filter selection to only valid values. Some fields (e.g., a number field like Price) will have many possible operators.

Fields that are comparable, like numbers or dates, can also be filtered using the following operators:

* *Less than* a value you enter
* *Greater than* a value you enter
* *Between* two values you enter

#### Filtering by dates

If filtering by dates, a date picker will appear to allow you to select dates easily. You have two main options for picking your date: relative or specific.

**Specific Dates**
This is the most basic way to select dates. You just click on the date you want from the calendar. If you click on a second date, the picker will select all the dates in between the two you clicked on, creating a range. Clicking on any date while you have a range selected will clear the range. You can also use the **All before** and **All after** buttons to quickly select all dates before or after the one you’ve selected.

**Relative Dates**
Relative dates are how we more commonly talk about time: “how many customers did we have **last month**?” We talk about time relative to today. 

In practice, if you select **Past 30 days** from the Relative Date calendar picker, this would be the same as selecting those same dates from the Specific Date picker — *unless* you save your question and look at it again tomorrow. 

Now the relative date will be referencing the past 30 days from *today*, *not* from the day you saved the question. This is a really useful way of creating and saving questions that stay up-to-date: you can always know what your total sales were in the past 7 days, for example.

### Answer Output
---
The last section of the question builder is where you select what you want the output of your answer to be, under the View dropdown. You’re basically telling Metabase, “I want to view the…” Metabase can output the answer to your question in three different ways: 

#### 1. Raw Data
Raw Data is just a table with the answer listed in rows.  It's useful when you want to see the actual data you're working with, rather than a sum or average, etc., or when you're exploring a small table with a limited number of records.  

When you filter your data to see groups of interesting users, orders, etc., Raw Data will show you an output of each individual record that matches your question's criteria. 

#### 2. Basic Metrics

What's a *metric*? It's a number that is derived from your source table and takes into consideration any filters you asked Metabase to apply to your question. So when you select one of these metrics, your answer will come back in the form of a number. The different basic metrics are: 

* **Count:** The total of number of rows in the answer. Each row corresponds to a separate record. If you want to know how many orders in the Orders table were placed with a price greater than $40, you’d filter by “Price greater than 40,” and then select Count, because you want Metabase to count how many orders matched your filter.
* **Sum:** Sum of all the values in a column. This is really easy to get mixed up with Count — just remember that Count counts each *row*, but Sum adds up all the values in a single field. You’d use Sum to get your total revenue dollar amount, for example.
* **Average:** Average of all the values in a column.

#### 3. Advanced Metrics

These options are a bit more specialized, so they’re hidden under the Advanced button in the View dropdown.

* **Number of Distinct Values:** Number of unique values in all the cells of a single column. This would be useful to find out things like how many different *types* of products were sold last month (not how many were sold in total).
* **Cumulative Sum:** This gives you a running total of a specific column. This will look exactly the same as Sum unless you break out your answer by day, week, month, etc. (See the next section about breaking out metrics.) An example would be total revenue over time.
* **Standard Deviation:** A number which expresses how much the values of a column vary, plus or minus, from the average of that column.

### Breaking Out Metrics: Add a group
---
Metrics are great by themselves if the answer you’re looking for is just a simple, single number. But often you'll want to know more detailed information than that.

For example, the sum of all invoiced amounts is a metric. It's natural to want to look at this metric across time or another grouping, such as whether the invoices are paid or not.

You can do this by adding a **Group** element to your question. You can break out your answer by any date or time in your table, as well as any category field. These groupings are called *dimensions*.

If you apply a *single dimension* to your question, you get a table where the leftmost column is the dimension and the rightmost column is the value of the metric for that dimension's value. You can visualize this in several ways, like a line or bar graph, with the value as the y-axis, and the dimension as the x-axis. 

*Two dimension* breakouts are equivalent to a pivot table in Excel, and are one of the workhorses of the business intelligence world. For example, we might want to know the how many orders we had per state, and also per month. If we want to try this with the Sample Dataset, we’d open the Orders table, skip the filters, then choose Count, and then add groupings by User:State and Created At: Month. The result is a table where the first row and column have the month and state information, and where the rest of the cells are the number of orders.

If you add more dimensions, you will add columns to the left of the dimension.

### Additional Options
---
Click on the three dots on the far right hand side of the question builder bar to open up these additional settings:

* Limit your results to 1, 10, 25, 100, or more rows.
* Sort by a column: either by clicking on the column header or by selecting the column in the advanced section.

### Digging into Individual Records
---
Click on a record's primary key (or ID) to see more information about a given person, venue, etc. You can see all fields related to that one record and all connected tables that are hidden in the table view for the sake of readability.

## Asking more Advanced Questions in SQL
---
If you ever need to ask questions that can't be expressed using the question builder, you can use **SQL** instead.

### What's SQL?

SQL (pronounced "sequel") stands for Structured Query Language, and is a widely used standard for getting data from databases. To learn more about it, check out this [SQL Tutorial](http://www.w3schools.com/sql/default.asp).

Even if you don't understand SQL or how to use it, it's worthwhile to understand how to use it inside Metabase because sometimes other people will share SQL-based questions that might be useful to you.

### Using SQL
You can switch a card from question builder mode to SQL mode by clicking on the "**>_**" button in the upper right hand corner. (Note: you’ll only see this button on new question pages or on saved questions that were written in SQL. Otherwise, you’ll see the SAVE button there instead.)

![sqlbutton](images/SQLButton.png)

You can write SQL directly into the text box that appears.

![sqlinterface](images/SQLInterface.png)

To try it out, type the command `select sum(subtotal), created_at from orders group by created_at`. Don't worry if you don't understand this just yet. Click **Run query** and note the table that comes back is the same as if you had asked for the sum of Subtotal in the Orders table, grouped by Created At.

Questions asked using SQL can be saved, downloaded, or added to a dashboard just like questions asked using the question builder.

Once you have an answer to your question, you can now learn more about [visualizing answers](04-visualizing-results.md).