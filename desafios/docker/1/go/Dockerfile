FROM golang:1.18-alpine AS builder

WORKDIR /app

RUN go mod init hello
RUN go mod download && go mod verify

COPY . .

RUN go build hello.go

FROM scratch
WORKDIR /app
COPY --from=builder /app .
CMD [ "./hello" ]