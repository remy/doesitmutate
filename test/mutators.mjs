import mutators from '../mutators.json' with { type: 'json' };
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('mutators', async () => {
  for (const method of mutators) {
    it(`${method} should be a method of Array.prototype`, async () => {
      assert(
        typeof Array.prototype[method] === 'function',
        `"${method}" is not method of Array.prototype`,
      );
    });
  }
});
