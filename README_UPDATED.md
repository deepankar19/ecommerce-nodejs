# Ecommerce Application

A modern full-stack e-commerce application built with Next.js, React, and TypeScript.

## Features

- 🛍️ Product catalog with categories
- 🛒 Shopping cart management
- 💳 Checkout functionality
- 👤 User authentication (Login/Register/Account)
- 📱 Responsive design with Tailwind CSS
- 🐳 Docker containerization
- ⚡ CI/CD with GitHub Actions

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **State Management:** React Context API
- **Package Manager:** npm

## Installation

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

### Docker

```bash
# Build Docker image
docker build -t ecommerce:latest .

# Run container
docker run -p 3000:3000 ecommerce:latest

# Or use Docker Compose
docker-compose up --build
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### GitHub Actions CI/CD

Push to `main` branch to trigger:
1. Docker image build
2. Push to Docker Hub
3. Auto-deploy to EC2

Required GitHub Secrets:
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `DOCKERHUB_IMAGES_NAME`
- `EC2_HOST`
- `EC2_USER`
- `EC2_SSH_KEY`

## Project Structure

```
ecommerce/
├── src/
│   ├── app/              # Next.js pages & layouts
│   ├── components/       # React components
│   ├── context/          # React Context (Cart)
│   ├── data/             # Product data
│   └── globals.css       # Global styles
├── public/               # Static assets
├── Dockerfile            # Docker container config
├── docker-compose.yml    # Docker Compose config
└── package.json          # Dependencies
```

## License

MIT
