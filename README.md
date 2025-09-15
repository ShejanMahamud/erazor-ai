# Erazor Client

A modern Next.js client application for Erazor - an AI-powered background removal service.

## Installation

```bash
pnpm install
```

## Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Configure your environment variables in `.env.local`:

### Email Configuration (Nodemailer)

The contact form uses Nodemailer for sending emails. You'll need to configure SMTP settings:

**For Gmail:**

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
```

**Note:** For Gmail, you need to:

1. Enable 2-factor authentication
2. Generate an App Password (not your regular password)
3. Use the App Password in `SMTP_PASS`

**For other email providers:**

- **Outlook/Hotmail:** `smtp-mail.outlook.com:587`
- **Yahoo:** `smtp.mail.yahoo.com:587`
- **Custom SMTP:** Configure according to your provider

### Other Required Variables

```env
FROM_EMAIL=noreply@erazor.ai
CONTACT_EMAIL=support@erazor.ai
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-clerk-secret
```

## Usage

### Development

```bash
pnpm dev
```

### Production

```bash
pnpm build
pnpm start
```

## Features

- 🚀 **Next.js 15** with App Router
- 🎨 **Tailwind CSS** for styling
- 🔐 **Clerk Authentication**
- 📧 **Nodemailer** for contact form emails
- 🎭 **Framer Motion** for animations
- 📊 **Recharts** for data visualization
- 🌙 **Dark/Light mode** support

## Contact Form

The contact form (`/contact`) uses Nodemailer to send emails:

- Sends a notification to your support email
- Sends an auto-reply confirmation to the user
- Supports HTML email templates
- Handles form validation and error states

## Development

```bash
pnpm dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
