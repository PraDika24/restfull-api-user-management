import { it, describe, expect, afterEach, beforeEach } from "bun:test"
import supertest from "supertest"
import { apiKey, ContactTest, UserTest } from "./test-util";
import { app } from "../src/application/web";
import { logger } from "../src/application/logging";
import { prismaClient } from "../src/application/database";

describe('POST /api/contact', () => {
         beforeEach(async () => {
            await UserTest.createAuth();
        });
        
        afterEach(async () => {
            await ContactTest.deleteAll();
            await UserTest.delete();
        });


        it('Should be able to create contact', async() =>{

            const response = await supertest(app)
                    .post('/api/contact')
                    .set('X-Auth-Token', 'test')
                    .set('X-API-Key', apiKey!)
                    .type('form')
                    .send({
                        firstname: "Testi",
                        lastname: "Lagi",
                        email: "example@mail.com",
                        phone: "08123456789"
                    })

                logger.debug(response.body);
                expect(response.status).toBe(200);
                expect(response.body.data.id).toBeDefined();
                expect(response.body.data.firstname).toBe("Testi");
                expect(response.body.data.lastname).toBe("Lagi");
                expect(response.body.data.email).toBe("example@mail.com");
                expect(response.body.data.phone).toBe("08123456789");

        });

        it('Should reject if firstname less than 1 character', async() =>{

            const response = await supertest(app)
                    .post('/api/contact')
                    .set('X-API-key', apiKey!)
                    .set('X-Auth-Token', 'test')
                    .type('form')
                    .send({
                        firstname: "",
                        lastname: "Lagi",
                        email: "example@mail.com",
                        phone: "08123456789"
                    })

                
                logger.debug(response.body);
                expect(response.status).toBe(400);
                expect(response.body.error).toBeDefined();
        });


        it('Should reject if not have auth token', async() =>{

            const response = await supertest(app)
                    .post('/api/contact')
                    .set('X-API-key', apiKey!)
                    .type('form')
                    .send({
                        firstname: "Testi",
                        lastname: "Lagi",
                        email: "example@mail.com",
                        phone: "08123456789"
                    })

                
                logger.debug(response.body);
                expect(response.status).toBe(401);
                expect(response.body.error).toBeDefined();
                

        });

        it('Should reject if not have api-key', async() =>{

            const response = await supertest(app)
                    .post('/api/contact')
                    .set('X-Auth-Token', 'test')
                    .type('form')
                    .send({
                        firstname: "Testi",
                        lastname: "Lagi",
                        email: "example@mail.com",
                        phone: "08123456789"
                    })

                
                logger.debug(response.body);
                expect(response.status).toBe(403);
                expect(response.body.error).toBeDefined();
                

        });


});


describe('GET /api/contact/:contactId', () => {
    
    beforeEach(async () => {
        await UserTest.createAuth();
        await ContactTest.create();
    });
    
    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should able to get contact', async() => {

        const contact = await ContactTest.get();
        const response = await supertest(app)
                .get(`/api/contact/${contact.id}`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
            
            logger.debug(response.body);
            expect(response.status).toBe(200);
            expect(response.body.data.id).toBe(contact.id);
            expect(response.body.data.firstname).toBe("Windah");
            expect(response.body.data.lastname).toBe("Basudara");
            expect(response.body.data.email).toBe("windah@mail.com");
            expect(response.body.data.phone).toBe("08123456789");
    });

    it('should reject to get contact', async() => {

        const contact = await ContactTest.get();
        const response = await supertest(app)
                .get(`/api/contact/${contact.id + 1}`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
            
            logger.debug(response.body);
            expect(response.status).toBe(404);
            expect(response.body.error).toBeDefined();
    });

});

describe('POST /api/contact/:contactId', () => {
    beforeEach(async () => {
        await UserTest.createAuth();
        await ContactTest.create();
    });
    
    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('Should able to update', async() => {

        const contact = await ContactTest.get();
        const response = await supertest(app)
                .post(`/api/contact/${contact.id}`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
                .type('form')
                .send({
                    firstname: "Testi",
                    lastname: "Lagi",
                    email: "example@mail.com",
                    phone: "08123456789"
                });

            logger.debug(response.body);
            expect(response.status).toBe(200);
            expect(response.body.data.id).toBe(contact.id);
            expect(response.body.data.firstname).toBe("Testi");
            expect(response.body.data.lastname).toBe("Lagi");
            expect(response.body.data.email).toBe("example@mail.com");
            expect(response.body.data.phone).toBe("08123456789");

    });

    it('should reject if input are invalid', async() =>{
        const contact = await ContactTest.get();
        const response = await supertest(app)
                .post(`/api/contact/${contact.id}`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
                .type('form')
                .send({
                    firstname: "Testi",
                    lastname: "Lagi",
                    email: "example",
                    phone: "081234567898398393893983938383292"
                });
                logger.debug(response.body);
                expect(response.status).toBe(400);
                expect(response.body.error).toBeDefined();
    });

    it('Should reject if contactId not macth', async() => {

        const contact = await ContactTest.get();
        const response = await supertest(app)
                .post(`/api/contact/${contact.id + 1}`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
                .type('form')
                .send({
                    firstname: "Testi",
                    lastname: "Lagi",
                    email: "example@mail.com",
                    phone: "08123456789"
                });

            logger.debug(response.body);
            expect(response.status).toBe(404);
            expect(response.body.error).toBeDefined();
    });
});