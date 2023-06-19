const {
  generateDeterministicPartitionKey,
  deterministicPartitionKey,
  hashString,
  TRIVIAL_PARTITION_KEY,
} = require("./dpk");

describe("generateDeterministicPartitionKey function", () => {
  test("Should return TRIVIAL_PARTITION_KEY for empty event", () => {
    const result = generateDeterministicPartitionKey();
    expect(result).toBe(TRIVIAL_PARTITION_KEY);
  });

  test("Should return partitionKey if it exists", () => {
    const event = { partitionKey: "Some partition key" };
    const result = generateDeterministicPartitionKey(event);
    expect(result).toBe(event.partitionKey);
  });

  test("Should return hashed string of event for non-string or non-existing partitionKey", () => {
    const event = { foo: "bar" };
    const result = generateDeterministicPartitionKey(event);
    const expectedHash = hashString(JSON.stringify(event));
    expect(result).toEqual(expectedHash);
  });

  test("Should hash the string if partitionKey length is greater than MAX_PARTITION_KEY_LENGTH", () => {
    const longString = "a".repeat(257);
    const result = generateDeterministicPartitionKey({
      partitionKey: longString,
    });
    expect(result).toHaveLength(128);
  });
});

describe("deterministicPartitionKey function", () => {
  test("Should return TRIVIAL_PARTITION_KEY for empty event", () => {
    const result = deterministicPartitionKey();
    expect(result).toBe(TRIVIAL_PARTITION_KEY);
  });

  test("Should return partitionKey if it exists", () => {
    const event = { partitionKey: "Some partition key" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(event.partitionKey);
  });

  test("Should return hashed string of event for non-string or non-existing partitionKey", () => {
    const event = { foo: "bar" };
    const result = generateDeterministicPartitionKey(event);
    const expectedHash = hashString(JSON.stringify(event));
    expect(result).toEqual(expectedHash);
  });

  test("Should hash the string if partitionKey length is greater than MAX_PARTITION_KEY_LENGTH", () => {
    const longString = "a".repeat(257);
    const result = deterministicPartitionKey({ partitionKey: longString });
    expect(result).toHaveLength(128);
  });
});
