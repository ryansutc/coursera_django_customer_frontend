## Little Lemon Restaurant App - Frontend for Coursera Django Course API

This is a rough example app exploring how to create a frontend client based upon a modern [OpenAPI / Swagger](https://swagger.io/) specification from a REST API app (my restaurant app- [coursera_django](https://github.com/ryansutc/coursera_django)). The client adheres to a strict
contract with the REST API and can easily remain in sync with schema and endpoint changes. The app itself is a React SPA.

- Queries with the API are managed with [TanStack Query](https://tanstack.com/query/latest) instead of Redux/RTK
- Client State is managed via [Zustand](https://github.com/pmndrs/zustand) instead of Redux.

#### Details

The frontend app code here is incomplete and not that interesting. The focus is to try to find/demonstrate a fully automatable workflow for keeping a frontend in sync with an evolving and uncontrolled 3rd Party REST API application. In this case I am working with ([coursera django](https://github.com/ryansutc/coursera_django)), a REST API app. See the `readme.md` file under `/generatedtypes` for details on that.
