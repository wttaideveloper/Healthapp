// Run with: node --test src/components/utils/usageLimitCore.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { computeDailyLimitStatus, FREE_DAILY_TASK_LIMIT } from "./usageLimitCore.ts";

test("free limit is three assessments per day", () => {
  assert.equal(FREE_DAILY_TASK_LIMIT, 3);
});

test("free user: 1st, 2nd and 3rd assessment are allowed (0, 1, 2 used)", () => {
  for (const used of [0, 1, 2]) {
    const s = computeDailyLimitStatus(false, used);
    assert.equal(s.allowed, true, `used=${used}`);
    assert.equal(s.remaining, 3 - used);
    assert.equal(s.countUnavailable, false);
  }
});

test("free user: 4th assessment is blocked (3 used)", () => {
  const s = computeDailyLimitStatus(false, 3);
  assert.equal(s.allowed, false);
  assert.equal(s.remaining, 0);
  assert.equal(s.limit, 3);
});

test("free user stays blocked when more than the limit is recorded", () => {
  assert.equal(computeDailyLimitStatus(false, 7).allowed, false);
});

test("premium user is never blocked, regardless of count", () => {
  for (const used of [0, 3, 50, null]) {
    const s = computeDailyLimitStatus(true, used);
    assert.equal(s.allowed, true);
    assert.equal(s.limit, Number.POSITIVE_INFINITY);
    assert.equal(s.countUnavailable, false);
  }
});

test("free user fails closed when the count cannot be read", () => {
  const s = computeDailyLimitStatus(false, null);
  assert.equal(s.allowed, false);
  assert.equal(s.countUnavailable, true);
  assert.equal(s.remaining, 0);
});
