# syntax=docker/dockerfile:1

# Referenced the following:
#
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
# https://jameschambers.co.uk/nextjs-hot-reload-docker-development
# https://medium.com/@elifront/best-next-js-docker-compose-hot-reload-production
#     -ready-docker-setup-28a9125ba1dc

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree
# /b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why
# libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Set working directory in container
WORKDIR /frontend

# Copy and install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm \
    && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Dev stage for hot-reloading
FROM base AS dev
WORKDIR /frontend
COPY --from=deps /frontend/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment following line in case you want to disable telemetry during build
# My internet connection isn't great so I'm going to disable this just in case
ENV NEXT_TELEMETRY_DISABLED 1

# Rebuild the source code only when needed
FROM dev AS builder
WORKDIR /frontend

# My internet connection isn't great so I'm going to disable this just in case
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /frontend

# Uncomment following line in case you want to disable telemetry during runtime
# My internet connection isn't great so I'm going to disable this just in case
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && adduser --system -uid 1001 nextjs

COPY --from=builder /frontend/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /frontend/.next/static ./.next/static

USER nextjs

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

EXPOSE ${PORT}

# Set labels
LABEL vendor1="ABATE AI"
LABEL com.abateai.release-date="2023-10-04"
LABEL com.abateai.version="1.0.1"

CMD ["node", "server.js"]
