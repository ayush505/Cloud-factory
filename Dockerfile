FROM mhart/alpine-node:14 AS builder
RUN addgroup -g 1001 -S rails && adduser -u 1001 -S rails -G rails
WORKDIR /app
COPY . .
RUN chown -R rails:rails /app
RUN chmod 755 /app
RUN apk --no-cache add curl
USER rails
RUN npm install
RUN npm run build
FROM mhart/alpine-node:14
RUN addgroup -g 1001 -S rails && adduser -u 1001 -S rails -G rails
WORKDIR /app
RUN chown rails: /app
RUN apk update && apk add curl
USER rails
RUN yarn global add serve
COPY --from=builder /app/build .
EXPOSE 3000
HEALTHCHECK CMD curl --fail http://localhost:3000/ || exit 1
CMD ["/home/rails/.yarn/bin/serve", "-p", "3000", "-s", "."]