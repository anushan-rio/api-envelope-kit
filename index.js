'use strict';

function now() {
  return new Date().toISOString();
}

function buildMeta(options = {}) {
  const meta = {
    timestamp: options.timestamp || now()
  };

  if (options.requestId) meta.requestId = options.requestId;
  if (options.pagination) meta.pagination = options.pagination;
  if (options.extra && typeof options.extra === 'object') {
    Object.assign(meta, options.extra);
  }

  return meta;
}

function success(data, options = {}) {
  return {
    success: true,
    data,
    meta: buildMeta(options)
  };
}

function error(code, message, options = {}) {
  if (!code || !message) {
    throw new TypeError('error() requires both a code and a message');
  }

  const result = {
    success: false,
    error: {
      code,
      message
    },
    meta: buildMeta(options)
  };

  if (options.details !== undefined) {
    result.error.details = options.details;
  }

  return result;
}

function paginate(items, options = {}) {
  if (!Array.isArray(items)) {
    throw new TypeError('paginate() expects an array of items');
  }

  const page = Number.isInteger(options.page) && options.page > 0 ? options.page : 1;
  const pageSize = Number.isInteger(options.pageSize) && options.pageSize > 0
    ? options.pageSize
    : items.length || 1;
  const total = Number.isInteger(options.total) && options.total >= 0
    ? options.total
    : items.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);

  return success(items, {
    requestId: options.requestId,
    timestamp: options.timestamp,
    extra: options.extra,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasNext: totalPages > 0 && page < totalPages,
      hasPrevious: page > 1
    }
  });
}

module.exports = {
  success,
  error,
  paginate
};
