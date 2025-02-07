import { it, describe, expect, afterEach, beforeEach, beforeAll, afterAll } from "bun:test"
import supertest from "supertest"
import { app } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";
import { password } from "bun";


describe('POST /api/users', () => {

    afterEach( async () => {
        await  UserTest.delete();
    });

    const apiKey = Bun.env.API_KEY

    it('should reject register user if request is invalid', async () =>{
        const response = await supertest(app)
                .post('/api/users')
                .type('form')
                .set('X-API-Key', apiKey!)
                .send({
                    username: '',
                    name: '',
                    password: ''
                });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    it('should  register user', async () =>{
        const response = await supertest(app)
                .post('/api/users')
                .type('form')
                .set('X-API-Key', apiKey!)
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


describe('POST /api/users/login', () => {

    
    beforeEach(async () => {
        await UserTest.create();
    });
    
    afterEach(async () => {
        await UserTest.delete();
    });

    const apiKey = Bun.env.API_KEY

    it('should be able login', async () =>{
        const response = await supertest(app)
                .post('/api/users/login')
                .type('form')
                .set('X-API-Key', apiKey!)
                .send({
                    username: "userTest", 
                    password: "userTest12"
                });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("userTest");
        expect(response.body.data.name).toBe("userTest")
        expect(response.body.data.token).toBeDefined();
    });

    it('should reject login if username invalid', async () =>{
        const response = await supertest(app)
                .post('/api/users/login')
                .type('form')
                .set('X-API-Key', apiKey!)
                .send({
                    username: 'user56',
                    password: 'userTest12'
                });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });


    it('should reject login if password invalid', async () =>{
        const response = await supertest(app)
                .post('/api/users/login')
                .type('form')
                .set('X-API-Key', apiKey!)
                .send({
                    username: 'userTest12',
                    password: 'testiMonianjg12'
                });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });
});

describe('GET /api/users/current', () => {

    beforeEach(async () => {
        await UserTest.createAuth();
    });
    
    afterEach(async () => {
        await UserTest.delete();
    });

    const apiKey = Bun.env.API_KEY

 it('should be able to get user', async () =>{
        const response = await supertest(app)
                .get('/api/users/current')
                .set('X-Auth-Token', 'test')
                .set('X-API-Key', apiKey!)

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe('userTest');
        expect(response.body.data.name).toBe('userTest');
    });

    it('should not able to get user', async () =>{
        const response = await supertest(app)
                .get('/api/users/current')
                .set('X-Auth-Token', 'test1234')
                .set('X-API-Key', apiKey!)

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.error).toBeDefined();
    });
});


describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.createAuth();
    });
    
    afterEach(async () => {
        await UserTest.delete();
    });

    const apiKey = Bun.env.API_KEY

    it('should be reject if requset invalid', async () => {

        const response = await supertest(app)
                    .patch('/api/users/current')
                    .type('form')
                    .set('X-Auth-Token', 'test')
                    .set('X-API-Key', apiKey!)
                    .send({
                        name: '',
                        password: ''
                    })
        
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    it('should be reject if token empty', async() => {

        const response = await supertest(app)
                .patch('/api/users/current')
                .set('X-Auth-Token', '')
                .set('X-API-Key', apiKey!)
                .type('form')
                .send({
                    name: 'userTest',
                    password: 'userTest'
                })
            
            logger.debug(response.body);
            expect(response.status).toBe(401);
            expect(response.body.error).toBeDefined();
    });

    it('Should be able to update', async() => {

        const response = await supertest(app)
                    .patch('/api/users/current')
                    .type('form')
                    .set('X-Auth-Token', 'test')
                    .set('X-API-Key', apiKey!)
                    .send({
                        password: "WindutHehe12"
                    });
                
                logger.debug(response.body);
                expect(response.status).toBe(200);
                expect(response.body.data.name).toBe('userTest');
                expect(response.body.data.username).toBe('userTest');

                const user = await UserTest.get();
                const compare = await Bun.password.verify("WindutHehe12", user.password);

                expect(compare).toBe(true);

    });


    
});

describe('DELETE /api/users/current', () => {

    beforeEach(async () => {
        await UserTest.createAuth();
    });
    
    afterEach(async () => {
        await UserTest.delete();
    });

    const apiKey = Bun.env.API_KEY

    it('should be able to logout', async() =>{
        
        const response = await supertest(app)
                    .delete('/api/users/current')
                    .set('X-Auth-Token', 'test')
                    .set('X-API-Key', apiKey!)
            
            logger.debug(response.body);
            expect(response.status).toBe(200);
            expect(response.body.data.username).toBe('userTest');
            expect(response.body.data.name).toBe('userTest');
            const user = await UserTest.get();
            expect(user.token).toBe(null)
    });

    it('should be reject if not have token or invalid', async() =>{
        
        const response = await supertest(app)
                    .delete('/api/users/current')
                    .set('X-Auth-Token', 'test123')
                    .set('X-API-Key', apiKey!)
            
            logger.debug(response.body);
            expect(response.status).toBe(401);
            expect(response.body.error).toBeDefined();
    });

});