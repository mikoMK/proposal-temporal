// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.now.plaindatetime
includes: [compareArray.js, temporalHelpers.js]
---*/

const actual = [];
const expected = [
  "get timeZone.getOffsetNanosecondsFor",
  "get timeZone.getPossibleInstantsFor",
  "get timeZone.toString",
  "get Temporal.Calendar.from",
  "call timeZone.getOffsetNanosecondsFor",
];

const timeZone = new Proxy(Object.assign({}, MINIMAL_TIME_ZONE_OBJECT, {
  getOffsetNanosecondsFor(instant) {
    actual.push("call timeZone.getOffsetNanosecondsFor");
    assert.sameValue(instant instanceof Temporal.Instant, true, "Instant");
    return -Number(instant.epochNanoseconds % 86400_000_000_000n);
  },
}), {
  has(target, property) {
    actual.push(`has timeZone.${property}`);
    return property in target;
  },
  get(target, property) {
    actual.push(`get timeZone.${property}`);
    return target[property];
  },
});

Object.defineProperty(Temporal.Calendar, "from", {
  get() {
    actual.push("get Temporal.Calendar.from");
    return undefined;
  },
});

const result = Temporal.now.plainDateTime("japanese", timeZone);
for (const property of ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond"]) {
  assert.sameValue(result[property], 0, property);
}

assert.compareArray(actual, expected);
