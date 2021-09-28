// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.zoneddatetime.prototype.since
description: RangeError thrown when roundingIncrement option out of range
info: |
    sec-temporal-totemporalroundingincrement step 6:
      6. If _increment_ < 1 or _increment_ > _maximum_, throw a *RangeError* exception.
features: [Temporal]
---*/

const earlier = new Temporal.ZonedDateTime(1_000_000_000_000_000_000n, "UTC");
const later = new Temporal.ZonedDateTime(1_000_000_000_000_000_005n, "UTC");
assert.throws(RangeError, () => later.since(earlier, { roundingIncrement: -Infinity }));
assert.throws(RangeError, () => later.since(earlier, { roundingIncrement: -1 }));
assert.throws(RangeError, () => later.since(earlier, { roundingIncrement: 0 }));
assert.throws(RangeError, () => later.since(earlier, { roundingIncrement: Infinity }));
