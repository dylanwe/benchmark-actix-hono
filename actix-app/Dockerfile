FROM rust:1.81.0 as builder
# Install necessary build tools and dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
	pkg-config \
	libssl-dev \
	ca-certificates \
	&& rm -rf /var/lib/apt/lists/*
WORKDIR ./app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=builder ./app/target/release/actix-app ./usr/local/bin/actix-app
EXPOSE 8080
CMD ["actix-app"]

