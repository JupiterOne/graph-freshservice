# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 1.1.1 - 2024-04-23

### Fixed

- Duplicated key

## 1.1.0 - 2024-04-22

### Fixed

- Unexpected error on roles
- Bump to node 18

## 1.0.0 - 2022-07-18

### Added

- Ingest new entities
  - `freshservice_account`
  - `freshservice_agent`
  - `freshservice_agent_group`
  - `freshservice_agent_role`
  - `freshservice_ticket`
- Build new relationships
  - `freshservice_account_has_agent`
  - `freshservice_account_has_agent_group`
  - `freshservice_account_has_agent_role`
  - `freshservice_account_has_ticket`
  - `freshservice_agent_group_has_agent`
  - `freshservice_agent_group_has_ticket`
  - `freshservice_agent_has_ticket`
  - `freshservice_agent_role_assigned_agent`
