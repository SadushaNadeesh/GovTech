# GovTech Permit Application

A full-stack web application for managing permits, built with NestJS backend and Next.js frontend.

## Project Structure

This project consists of two main components:

- **back-end/**: NestJS API server handling permit management
- **permit-app/**: Next.js web application for the permit interface

## Features

- Permit creation and management
- RESTful API endpoints for permit operations

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Backend Setup (NestJS)

1. Create a DB with server name - `permitDb` in PostgreSQL.

### Backend Setup (NestJS)

1. Navigate to the backend directory:
   ```bash
   cd back-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

The backend will be running on `http://localhost:3001`

### Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd permit-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:3000`

### Running the Full Application

1. Open two terminal windows
2. In the first terminal, start the backend (follow backend setup steps 1-3)
3. In the second terminal, start the frontend (follow frontend setup steps 1-3)
4. Access the application at `http://localhost:3001`

## API Endpoints

The backend provides the following endpoints:

- `GET /permit` - Get all permits
- `POST /permit` - Create a new permit
- `GET /permit/:id` - Get a specific permit
- `PUT /permit/:id` - Update a permit
- `DELETE /permit/:id` - Delete a permit

## Technologies Used

- **Backend**: NestJS, TypeScript, Jest (for testing)
- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS (configured in frontend)

## Assumptions made
- Database and Persistence
-- Uses PostgreSQL with TypeORM, with synchronize: true for automatic schema updates (not production-safe). No migrations or complex queries.
-- Simplifies setup for a demo; assumes a local database with hardcoded credentials.

- Status Workflow and Transitions
-- Assumes a straightforward process; real systems might have more complex workflows with conditional logic or user roles.

- Event-Driven Architecture
-- Status changes trigger "events" via console.log (placeholder for a real event system like RabbitMQ or Kafka). No actual event handling or subscribers.

- Overall Architecture and Modularity
-- Modular NestJS structure with separate modules, but no microservices, caching, or external integrations

## Commands Used
- `npx create-next-app`
- `nest back-end`
- `npm install @nestjs/typeorm typeorm pg`

## Use of External Resources (AI Tools - Co pilot)

1. To validate the project.
2. To create the status check logic.
3. To UI designing.
4. To generate the readme file.
5. To clarify points/concepts and to get examples.

## Written Architecture Questions
11.1 Scalability - To handle 1 million permit applications:

Database: Cloud DBs, replicas for PostgreSQL.
API: Implement horizontal scaling with load balancers. Add caching (Redis) for frequent queries.
Microservices: Break into services (e.g., permit processing, notifications) deployed as containers (Docker/K8s) for independent scaling.
Monitoring: Use tools like Grafana to monitor load and scale dynamically.

11.2 Event-Driven Architecture - For a Kafka-based implementation:

Topic Design: Use topics like permit-events (for status changes), permit-created, permit-reviewed. Partition by permit ID for ordering.
Producers: API service produces events on status updates (e.g., PermitStatusChanged). Use Kafka producer with retries.
Consumers: Separate services consume events (e.g., notification service for emails, audit service for logging). Use consumer groups for parallel processing.
Handling Failures: Implement dead-letter queues for failed messages. Use circuit breakers and exponential backoff for retries.
Ensuring Idempotency: Include unique event IDs (e.g., UUIDs) and check for duplicates in consumers using a database or Redis cache.

11.3 Integration - High-level integration approaches:

Digital Identity Platform: Use OAuth2/JWT for authentication. On permit creation, validate citizen ID via API calls to the identity service, fetching verified details to populate/enrich the permit.
Government Payment Platform: After approval, trigger payment for fees; handle callbacks to update permit status.
National Data Exchange: Use APIs or message queues for data sharing. Pull business registry data for validation; push approved permits to national databases for compliance reporting.

11.4 Concurrency - If two officers update the same permit simultaneously:

Issue: Race conditions could lead to lost updates or inconsistent states (e.g., one update overwrites the other).
Handling: Use optimistic locking (version fields in DB) or pessimistic locking (database transactions). In TypeORM, add @Version() to the entity; throw conflicts on concurrent updates. For retries, implement exponential backoff in the client.

11.5 Cloud Deployment - In a cloud-native environment (e.g., AWS/Azure):

Containerization: Package backend/frontend as Docker images.
Orchestration: Deploy on Kubernetes (EKS/AKS) with Helm charts for services, ingress controllers, and secrets management.
Database: Use managed RDS/Aurora for PostgreSQL with backups and multi-AZ.
CI/CD: Use GitHub Actions or Jenkins for automated builds/deployments to staging/prod.
Security/Monitoring: Enable VPCs, IAM roles, CloudWatch for logs/metrics, and auto-scaling based on CPU/memory. Use API Gateway for rate limiting and authentication.