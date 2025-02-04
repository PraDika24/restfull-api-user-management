# Address API Spec

## Create Address

<pre>
Method   : POST 
Endpoint : /api/contacts/:idContact/address
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
    "street": "nama jalan", 
    "city": "nama kota",
    "province": "nama provinsi",
    "country": "nama negara",
    "postal_code": "2202" 
}
```

### Response
Response Body (Success) :

```json
{
    "data": {
        "id": 1,
       "street": "nama jalan", 
        "city": "nama kota",
        "province": "nama provinsi",
        "country": "nama negara",
        "postal_code": "2202"
    }
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```

## Get Address

<pre>
Method   : GET 
Endpoint : /api/contacts/:idContact/address/:idAddress
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
       "street": "nama jalan", 
        "city": "nama kota",
        "province": "nama provinsi",
        "country": "nama negara",
        "postal_code": "2202"
    }
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```

## Update Address

<pre>
Method   : PUT 
Endpoint : /api/contacts/:idContact/address/:idAddress
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
    "street": "nama jalan", 
    "city": "nama kota",
    "province": "nama provinsi",
    "country": "nama negara",
    "postal_code": "2202" 
}
```

### Response
Response Body (Success) :

```json
{
    "data": {
        "id": 1,
       "street": "nama jalan", 
        "city": "nama kota",
        "province": "nama provinsi",
        "country": "nama negara",
        "postal_code": "2202"
    }
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```

## Remove Address

<pre>
Method   : DELETE 
Endpoint : /api/contacts/:idContact/address/:idAddress
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

## List Address

<pre>
Method   : GET 
Endpoint : /api/contacts/:idContact/address
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
    "street": "nama jalan", 
    "city": "nama kota",
    "province": "nama provinsi",
    "country": "nama negara",
    "postal_code": "2202" 
}
```

### Response
Response Body (Success) :

```json
{
    "data": [
    {
        "id": 1,
       "street": "nama jalan", 
        "city": "nama kota",
        "province": "nama provinsi",
        "country": "nama negara",
        "postal_code": "2202"
    },
    {
        "id": 1,
       "street": "nama jalan", 
        "city": "nama kota",
        "province": "nama provinsi",
        "country": "nama negara",
        "postal_code": "2202"
    },
    ]
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```