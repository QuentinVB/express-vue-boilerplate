# Login Process & session

``` mermaid
sequenceDiagram
    box rgb(33,66,99) App
        participant L as Login page
        participant AS as Auth Service
        participant O as Other pages
    end
    box rgb(10,66,10) Server
        participant R as Router
        participant AC as Auth Controller
        participant A as Auth Middleware

    end
    L->>AS:Send usrName & pwd
    AS->>R:POST usrName & pwd
    R->>AC:usrName & pwd
    opt 403 Errors
        AC->>L: User not found
        AC->>L: Password invalid
        AC->>L: Account not confirmed
    end
    Note over AC : Generate signed JWT of userId and split
    par HTTP response
        AC->>AS : JSON with JWT and userId
        AC-->>AS : Cookie with JWT signature
    end
    Note over AS : store JWT<br/>App is now connected 😃
    par HTTP future request
    O->>A: Header Authorization : BearerJWT
    O-->>A: Cookie : JWT Sign
    end
```