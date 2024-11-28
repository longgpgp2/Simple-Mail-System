# Simple Web-Based Email System

This is a web-based email application which includes basic email system functionalities such as user registration, sending/receiving emails, and managing an inbox and outbox.

## Features

### Core Features
- **Sign-in Page**: Allows users to log in using their email and password.
- **Sign-up Page**: Enables users to register a new account.
- **Inbox Page**: Displays received emails with pagination (5 emails per page).
- **Outbox Page**: Lists sent emails with pagination.
- **Compose Page**: Allows users to send an email to one recipient, with optional file attachment.
- **Email Detail Page**: Displays details of a selected email.
- **Sign-out Functionality**: Securely logs out the user.

### Advanced Features
- File attachment for emails (one file per email).
- Deletion of emails using a REST API without reloading the page (implemented via `fetch`).

## Technology Stack
- **Backend**: Node.js
- **Template Engine**: EJS or Handlebars
- **Database**: MySQL
- **Frontend**: Pure HTML/CSS/JavaScript (no external libraries or frameworks)

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/longgpgp2/Simple-Mail-System.git
2. Install dependencies:
   ```bash
   npm install
3. Start the server: Launch the application using Node.js:
   ```bash
   npm start
