FROM rust:1.81.0 as builder
# Install necessary build tools and dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
	pkg-config \
	libssl-dev \
	ca-certificates \
	&& rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/myserver
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
# Install required runtime packages
RUN apt-get update && apt-get install -y \
    libssl3 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*
ARG HOST=0.0.0.0
COPY --from=builder /usr/src/myserver/target/release/actix-server /usr/local/bin/actix-server
EXPOSE 8080
CMD ["actix-server"]

