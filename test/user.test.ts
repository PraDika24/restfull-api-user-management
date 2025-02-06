import { it, describe, expect, afterEach } from "bun:test"
import supertest from "supertest"
import { app } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";


describe('POST /api/users', () => {

    afterEach( async () => {
        await  UserTest.delete();
    })

    it('should reject register user if request is invalid', async () =>{
        const response = await supertest(app)
                .post('/api/users')
                .type('form')
                .send({
                    username: '',
                    name: '',
                    password: ''
                });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should  register user', async () =>{
        const response = await supertest(app)
                .post('/api/users')
                .type('form')
                .send({
                    username: 'userTest',
                    name: 'userTest',
                    password: 'userTest12'
                });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("userTest");
        expect(response.body.data.name).toBe("userTest");
    });
});