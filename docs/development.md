# Development

This integration focuses on [Freshservice](https://freshservice.com/) and is
using Freshservice API (https://api.freshservice.com/) for interacting with the
Freshservice resources.

## Provider account setup

1. Sign-up for a Freshservice account
2. In the Dashboard -> Profile -> Profile Settings
3. Get the API Key for the account
4. Host name value is **example**.freshservice.com (bolded part)

## Authentication

Provide the `HOST_NAME` and the `API_KEY` to the `.env`. You can use
[`.env.example`](../.env.example) as a reference.

The API Key will be used to authorize requests using basic authentication.
