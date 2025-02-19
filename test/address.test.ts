import { app } from "../src/application/web";
import { it, describe, expect, afterEach, beforeEach } from "bun:test"
import supertest from "supertest"
import { AddressTest, apiKey, ContactTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";

describe('POST /api/contact/:contactId(\\d+)/addresses', function() {
    beforeEach(async () => {
        await UserTest.createAuth();
        await ContactTest.create();
    });
    
    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should able to create', async () => {

        const contact = await ContactTest.get();
        const response = await supertest(app)
                .post(`/api/contact/${contact.id}/addresses`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
                .type('form')
                .send({
                    street: 'jalan bocil',
                    city: 'batubara',
                    province: 'ireng',
                    country: 'iseng',
                    postal_code: '1234'
                })

            logger.debug(response.body)
            expect(response.status).toBe(200);
            expect(response.body.data.street).toBe("jalan bocil");
            expect(response.body.data.city).toBe("batubara");
            expect(response.body.data.province).toBe("ireng");
            expect(response.body.data.country).toBe("iseng");
            expect(response.body.data.postal_code).toBe("1234");
    });

 
    it('should reejct if request invalid', async () => {

        const contact = await ContactTest.get();
        const response = await supertest(app)
                .post(`/api/contact/${contact.id}/addresses`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
                .type('form')
                .send({
                    street: 'jalan bocil',
                    city: 'batubara',
                    province: 'ireng',
                })

            logger.debug(response.body)
            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
    });
});



describe('GET /api/contact/:contactId(\\d+)/addresses/:addressId(\\d+)', function() {
    beforeEach(async () => {
        await UserTest.createAuth();
        await ContactTest.create();
        await AddressTest.create();
    });
    
    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should able to get', async () => {

        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
                .get(`/api/contact/${contact.id}/addresses/${address.id}`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')

            logger.debug(response.body);
            expect(response.status).toBe(200);
            expect(response.body.data.street).toBe("jalan test");
            expect(response.body.data.city).toBe("city test");
            expect(response.body.data.province).toBe("province test");
            expect(response.body.data.country).toBe("country test");
            expect(response.body.data.postal_code).toBe("1234");
    });

    it('should reject if invalid params', async () => {

        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
                .get(`/api/contact/${contact.id}/addresses/${address.id + 1}`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
            
            logger.debug(response.body);
            expect(response.status).toBe(404);
            expect(response.body.error).toBeDefined();
           
    });
});


describe('PUT /api/contact/:contactId(\\d+)/addresses/:addressId(\\d+)', function() {
    beforeEach(async () => {
        await UserTest.createAuth();
        await ContactTest.create();
        await AddressTest.create();
    });
    
    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should able to update', async () => {

        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
                .put(`/api/contact/${contact.id}/addresses/${address.id}`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
                .type('form')
                .send({
                    street: 'jalan bocil',
                    city: 'batubara',
                    province: 'ireng',
                    country: 'iseng',
                    postal_code: '1234'
                })

            logger.debug(response.body);

            expect(response.status).toBe(200);
            expect(response.body.data.street).toBe("jalan bocil");
            expect(response.body.data.city).toBe("batubara");
            expect(response.body.data.province).toBe("ireng");
            expect(response.body.data.country).toBe("iseng");
            expect(response.body.data.postal_code).toBe("1234");
    });

    it('should reject update if invalid request', async () => {

        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
                .put(`/api/contact/${contact.id}/addresses/${address.id + 1}`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
                .type('form')
                .send({
                    street: 'jalan bocil',
                    city: 'batubara',
                    province: 'ireng',
                })
            
            logger.debug(response.body);
            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
           
    });
  
});

describe('DELETE /api/contact/:contactId(\\d+)/addresses/:addressId(\\d+)', function() {
    beforeEach(async () => {
        await UserTest.createAuth();
        await ContactTest.create();
        await AddressTest.create();
    });
    
    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should able to remove', async () => {

        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
                .delete(`/api/contact/${contact.id}/addresses/${address.id}`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
            
            logger.debug(response.body);
            expect(response.status).toBe(200);
            expect(response.body.data).toBe("OK");
    });

    it('should reject if invalid params', async () => {

        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
                .delete(`/api/contact/${contact.id}/addresses/${address.id + 1}`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
            
            logger.debug(response.body);
            expect(response.status).toBe(404);
            expect(response.body.error).toBeDefined();           
    });
});


describe('GET /api/contact/:contactId(\\d+)/addresses', function() {
    beforeEach(async () => {
        await UserTest.createAuth();
        await ContactTest.create();
        await AddressTest.create();
    });
    
    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should able to get list all address', async () => {

        const contact = await ContactTest.get();
        const response = await supertest(app)
                .get(`/api/contact/${contact.id}/addresses`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')

            logger.debug(response.body);
            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(1);
    });

    it('should reject if invalid params', async () => {

        const contact = await ContactTest.get();

        const response = await supertest(app)
                .get(`/api/contact/${contact.id + 1}/addresses`)
                .set('X-API-key', apiKey!)
                .set('X-Auth-Token', 'test')
            
            logger.debug(response.body);
            expect(response.status).toBe(404);
            expect(response.body.error).toBeDefined();
           
    });
});