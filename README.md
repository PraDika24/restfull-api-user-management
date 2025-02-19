# Set Up Project

1. Create .env

    ```
    DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
    API_KEY="Your_Api_Key"
    ```

2. To run:

    ```shell
    bun install

    bunx prisma migrate dev

    bunx prisma generate

    bun run start
    ```
