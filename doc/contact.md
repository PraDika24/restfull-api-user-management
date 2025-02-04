# Contact API Spec

## Create Contact

<pre>
Method   : POST 
Endpoint : /api/contacts
</pre>

### Request

Request Header :
```json
{
    "X-API-key"     : "API_key",
    "Authorization" : "loginToken"
}
```

Request Body :
```json
{
    "first_name": "Windah", 
    "last_name": "Basudara",
    "email": "wb@example.com",
    "phone": "08123456789"
}
```

### Response
Response Body (Success) :

```json
{
    "data": {
        "id": 1,
        "first_name": "Windah", 
        "last_name": "Basudara",
        "email": "wb@example.com",
        "phone": "08123456789"
    }
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```

## Get Contact
<pre>
Method   : GET 
Endpoint : /api/contacts/:id
</pre>

### Request

Request Header :
```json
{
    "X-API-key"     : "API_key",
    "Authorization" : "loginToken"
}
```



### Response
Response Body (Success) :

```json
{
    "data": {
        "id": 1,
        "first_name": "Windah", 
        "last_name": "Basudara",
        "email": "wb@example.com",
        "phone": "08123456789" 
    }
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```

## Update Contact

<pre>
Method   : PUT 
Endpoint : /api/contacts/:id
</pre>

### Request

Request Header :
```json
{
    "X-API-key"     : "API_key",
    "Authorization" : "loginToken"
}
```

Request Body :
```json
{
    "first_name": "Windah", 
    "last_name": "Basudara",
    "email": "wb@example.com",
    "phone": "08123456789" 
}
```

### Response
Response Body (Success) :

```json
{
    "data": {
        "id": 1,
        "first_name": "Windah", 
        "last_name": "Basudara",
        "email": "wb@example.com",
        "phone": "08123456789"
    }
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```

## Remove Contact

<pre>
Method   : DELETE 
Endpoint : /api/contacts/:id
</pre>

### Request

Request Header :
```json
{
    "X-API-key"     : "API_key",
    "Authorization" : "loginToken"
}
```



### Response
Response Body (Success) :

```json
{
    "data": "OK"
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```

## Search Contact

<pre>
Method   : GET 
Endpoint : /api/contacts
</pre>

### Request

Query Param :
- name : string, contact firstname or lastname (optional)
- phone : string, contact phone (optional)
- email : string, contact email (optional)
- page : number, default 1
- size : number, default 10 per page

Request Header :
```json
{
    "X-API-key"     : "API_key",
    "Authorization" : "loginToken"
}
```



### Response
Response Body (Success) :

```json
{
    "data": [
        {
            "id": 1,
            "first_name": "Windah", 
            "last_name": "Basudara",
            "email": "wb@example.com",
            "phone": "08123456789" 
        },
        {
            "id": 2,
            "first_name": "Windah", 
            "last_name": "Basudara",
            "email": "wb@example.com",
            "phone": "08123456789"
        }, 
    ],
    "paging" : {
        "current_page" : 1,
        "total_page" : 10,
        "size" : 10
    }
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```