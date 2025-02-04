# User API Spec

## Register User

<pre>
Method   : POST
Endpoint : /api/users
</pre>

### Request

Request Header :
```json
{
    "X-API-key"     : "API_key"
}
```

Request Body :
```json
{
    "username": "Windah",
    "password": "securePassword",
    "name"    : "Windah Basudara"
}
```
### Response
Response Body (Success) :

```json
{
    "data": {
        "username": "Windah",
        "name"    : "Windah Basudara"
    }
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```


## Login User

<pre>
Method   : POST
Endpoint : /api/users/login
</pre>
### Request


Request Header :
```json
{
    "X-API-key"     : "API_key"
}
```

Request Body :
```json
{
    "username": "Windah",
    "password": "securePassword",
}
```
### Response
Response Body (Success) :

```json
{
    "data": {
        "username": "Windah",
        "name"    : "Windah Basudara",
        "token"   : "token"
    }
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```

## Get User
<pre>
Method   : GET
Endpoint : /api/users/current
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
        "username": "Windah",
        "name"    : "Windah Basudara",
    }
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```

## Update User
<pre>
Method   : PATCH
Endpoint : /api/users/current
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
    "nama": "Windah", // tidak wajib karena minimal perlu satu saja
    "password": "securePassword" // // tidak wajib karena minimal perlu satu saja
}
```
### Response
Response Body (Success) :

```json
{
    "data": {
        "username": "Windah",
        "name"    : "Windah Basudara"
    }
}

```
Response Body (Failed) :

```json
{
    "error": "error message"
}

```

## Logout User
<pre>
Method   : DELETE
Endpoint : /api/users/current
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