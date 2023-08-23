# StarTrader

Mini projet spatial (encore) avec une SPA Vue.Js, un backend Express et une bdd Mongo. Il s'inspire fortement de OGame, Anno, 

# feature
- créer son compte
- se connecter
- construire des trucs qui vont produire des choses à la surface de planètes
- puis établir des liens d'approvisionnement

```mermaid
flowchart LR
    Server --> ApiRoutes[API Routes]
    ApiRoutes -- Lie vers --> Controllers
    Controllers -- Utillise --> Model
```