const crypto = require("crypto");

/**
 * return hashed string of data
 * @param {string} data
 * @returns string
 */

const hashString = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

/**
 * new refactor
 */

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/**
 * Function that returns a deterministic partition key for a given event.
 * @param {*} event
 * @returns
 */
exports.generateDeterministicPartitionKey = (event) => {
  let candidate = event?.partitionKey ?? JSON.stringify(event);

  // this means that the event is empty
  if (!candidate) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (!event?.partitionKey || candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = hashString(candidate);
  }

  return candidate;
};

/**
 * @deprecated old code
 * @param {*} event
 * @returns
 */
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};

exports.TRIVIAL_PARTITION_KEY = TRIVIAL_PARTITION_KEY;
exports.MAX_PARTITION_KEY_LENGTH = MAX_PARTITION_KEY_LENGTH;
exports.hashString = hashString;
