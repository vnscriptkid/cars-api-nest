## typeorm

- remove, save: work with entity
  - 2 trips to db
  - can use hooks
- insert, update, delete: work with raw data
  - 1 trip to db
  - can't use hooks

## nest stuff

- interceptor
  - use cases: serialize data, trim off secret fields (password)
  - how: like a middleware, intervene in the chain:
    - before req is handled by controller
    - before res is sent out to client
  - note: can have access to service
  - scopes: global, controller
- decorator
  - use case: @GetCurrentUser()
  - note: can not have access to service (rely on interceptor)
- guard
  - use case: authorization
- full flow: req --> (middleware) --> (guard) --> (interceptor1) --> (**req handler**) --> (interceptor2) --> res
