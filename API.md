# API Document

## Notice

* response status code:
  - 200: ok
  - 400: incorrect request
  - 500: Internal Server Error (bug)



## User

### login

* POST `/api/user/login`

* request

  ```json
  {
    "email": "",
    "password": ""
  }
  ```

* session be set if succeeded

### logout

* GET `/api/user/logout` 

### regist

- POST `/api/user`

- request:

- ```json
  {
    "userEmail": "",
    "userPass": "",
    "comName": "",
    "comCode": "",
    "comCapital": "",
    "comTime": "",
    "comPerson": "",
    "comEmail": "",
    "comPhone": "",
    "comManager": "",
    "comRegistAddresss": "",
    "comWorkAddresss": "",
    "comField": "",
    "comProduct": "",
    "comIntro": "",
    "contactName": "",
    "contactJob": "",
    "contactMobile": "",
    "contactEmail": "",
    "contactQQ": "",
    "contactPhone": "" 
  }
  ```

### edit

* PUT `/api/user/self`
* request: the same as `regist` (except `userEmail`, which is **immutable**), only provided fields will be edited.

### get-self-info

* GET `/api/user/self`
* response: the same as `regist` except `userPass`



