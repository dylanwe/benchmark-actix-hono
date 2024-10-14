FROM denoland/deno:2.0.0
EXPOSE 8080
WORKDIR /app
USER deno
COPY . .
RUN deno cache main.ts
CMD ["serve", "--allow-net", "main.ts"]
