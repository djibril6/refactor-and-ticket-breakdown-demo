# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I have made a few changes to make the code more readable:

1. Used optional chaining (`?.`) and nullish coalescing operator (`??`): These help to reduce nested if-else conditions. `event?.partitionKey ?? JSON.stringify(event)` does the same job as the nested conditions in the original function, but is much cleaner. Also, this prevents TypeError when undefined or null is encountered.

2. Created a separate `hashString` function: Extracting this functionality into a separate, well-named function enhances readability as it becomes clear what the function does just by reading its name. This also follows the single-responsibility principle.

3. Constants `TRIVIAL_PARTITION_KEY` and `MAX_PARTITION_KEY_LENGTH` are moved out of the function body as these are configuration variables and not strictly part of the function logic. This cleans up the function body.

4. Avoided unnecessary assignments: Instead of initializing candidate and then reassigning it, I have directly assigned the value based on conditions. This removes the need for tracking state change.

These changes make the function cleaner and more readable by making the code less cluttered and the function's purpose more evident.
