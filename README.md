
![stub](stub.svg)


stub-stub
--------
stub-stub is a quick and dirty solution to getting your API stubbed out quickly. You can stub out your whole API by simply placing YAML files inside a sensible directory structure.


Getting started
===============
Create a `stubs` directory inside of your project root. Here's an example structure:

````
stubs/
├── auth
│   └── default.yml
├── cars
│   ├── 1.yml
│   ├── 2.yml
│   ├── xyz.yml
│   └── default.yml
└── users
    ├── 1.yml
    ├── 2.yml
    ├── 3.yml
    └── default.yml
````

With the given stubs directory, stub-stub would create multiple endpoints available to you. Some exmaples include:

| Endpoint                | Returns                            |
| ------------------------|:----------------------------------:|
| GET `/`                 | list all known resources           |
| GET `/cars`             | json blob for all cars             |
| GET `/cars/1`           | json blob for car with id 1        |
| GET `/cars/3-xyz`       | json blob for car with id xyz      |
| GET `/users`            | json blob for all cars             |
| GET `/users/2`          | json blob for user with id 2       |
| POST `/auth/do`         | default json blob for auth         |

stub-stub works by creating endpoints for each YAML file nested within a given type. So for instance, a file at `./stubs/cars/1.yml` would have a GET endpoint at `/cars/1`.

Any **GET** to a given resource extends the `default.yml` for the given type. You can also **POST** to any endpoint and receive the corresponding json blob.


Inheritance
===========
Take for instance `./cars/1.yml` with the following:

```yaml
name: Prius
price: $20,000
```

as well as `./cars/default.yml` with the following:

```yaml
name: Base Car
price: $10,000
mpg: 40
```

A GET request to `/cars/1` would return (which is the merging of `default.yml` and `1.yml`):

```json
{
 "name":  "My Car",
 "price": "$20,000",
 "mpg":   40
}
````


Starting stub-stub
==================
stub-stub by default starts on port **4343**:

````
stub-stub start
````

You can optionally run stub-stub on another port and/or from another directory.
````
stub-stub start --port=8000 --stubs=foo
````





*Ticket by Ryan Dell from The Noun Project*