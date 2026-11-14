const test = require('node:test');
const assert = require('node:assert/strict');
const { success, error, paginate } = require('./index');

test('creates a success response with metadata', () => {
  const result = success({ id: 1 }, {
    requestId: 'req-123',
    timestamp: '2026-11-14T12:00:00.000Z'
  });

  assert.deepEqual(result, {
    success: true,
    data: { id: 1 },
    meta: {
      requestId: 'req-123',
      timestamp: '2026-11-14T12:00:00.000Z'
    }
  });
});

test('creates an error response with optional details', () => {
  const result = error('USER_NOT_FOUND', 'User was not found', {
    details: { userId: '42' },
    requestId: 'req-456',
    timestamp: '2026-11-14T12:00:00.000Z'
  });

  assert.deepEqual(result, {
    success: false,
    error: {
      code: 'USER_NOT_FOUND',
      message: 'User was not found',
      details: { userId: '42' }
    },
    meta: {
      requestId: 'req-456',
      timestamp: '2026-11-14T12:00:00.000Z'
    }
  });
});

test('creates pagination metadata', () => {
  const result = paginate([{ id: 1 }, { id: 2 }], {
    page: 2,
    pageSize: 2,
    total: 5,
    timestamp: '2026-11-14T12:00:00.000Z'
  });

  assert.deepEqual(result.meta.pagination, {
    page: 2,
    pageSize: 2,
    total: 5,
    totalPages: 3,
    hasNext: true,
    hasPrevious: true
  });
});
