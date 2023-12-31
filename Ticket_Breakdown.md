# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add a Custom ID field to the Agent model

Description:
Currently, each Agent has a unique internal database id. Facilities need to be able to assign their own custom ids for each Agent they work with. To enable this, we should add a custom id field to the Agent model. This will allow Facilities to save and modify custom ids as necessary. This id will be optional, as not all Facilities may choose to assign custom ids.

Acceptance Criteria:

- A new optional field, `custom_id`, is added to the Agents model
- The `custom_id` can be updated by the associated Facility
- The `custom_id` is returned when Agent data is retrieved

Time and Effort Estimate:
This is a relatively simple change, with an estimate of 1 hour of work, including writing and running necessary migration scripts.

Implementation Details:
This task involves updating the schema for the Agents model, writing a database migration script, and updating any model handling logic that interacts with the Agent model. A method should also be created to allow Facilities to update an Agent's `custom_id`. The `custom_id` should be included whenever an Agent's data is fetched.

### Ticket 2: Modify getShiftsByFacility function to include Agent's custom id

Description:
The function `getShiftsByFacility` needs to be updated to include the custom id of the Agent assigned to each Shift.

Acceptance Criteria:

- The Agent's custom id is included in the data returned by `getShiftsByFacility`

Time and Effort Estimate:
Assuming that the function already includes Agent data, adding an additional field should be straightforward, with an estimate of 2 hours of work, including testing.

Implementation Details:
This ticket involves updating the `getShiftsByFacility` function to ensure that it fetches and includes the custom id of the Agent assigned to each Shift. If an Agent does not have a custom id, the function should handle this gracefully, either returning a null value or excluding the field.

### Ticket 3: Update generateReport function to use Agent's custom id

Description:
The `generateReport` function needs to be updated to display the Agent's custom id instead of their internal database id.

Acceptance Criteria:

- The Agent's custom id is used in the report generated by generateReport
- If an Agent does not have a custom id, their internal database id is used

Time and Effort Estimate:
This task should also be fairly straightforward, assuming that the report generation code is well-structured. The estimated time is 2-3 hours, including testing.

Implementation Details:
This ticket involves updating the generateReport function to use the Agent's custom id when it exists. If the Agent does not have a custom id, the function should fall back to using the Agent's internal database id. It will be important to ensure that the report generation function handles the potential absence of a custom id gracefully.

### Ticket 4: Integration Testing

Description:
Once all the above changes have been made, it will be necessary to perform some integration testing to ensure that the entire system functions as expected.

Acceptance Criteria:

- The system correctly handles the addition, retrieval, and display of Agent custom ids
- The system gracefully handles the absence of a custom id
- No regressions are introduced by the changes

Time and Effort Estimate:
This depends on the complexity of the system and the comprehensiveness of the existing test suite, but a rough estimate is 4-5 hours, including the creation of new tests if necessary.

Implementation Details:
This task involves running the entire test suite to catch any potential regressions. It will also require the creation of new integration tests to ensure that the custom id functionality works as expected. This includes testing the addition of custom ids, retrieval of shifts that
