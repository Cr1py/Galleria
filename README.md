# Galleria

Inspired by the pokebiner, minecraft portals, and this project: https://pmndrs.github.io/examples/enter-portals/. The goal is to create a webpage where the user can turn left or right and see different art portals as they move.

## Current To Do:

1. Create a webpage that goes in a circle, with cards to hold the art. Goal is to start with a static number, but once I figure that out, then i can make it dynamic
2. Create a backend to store the images, and to keep track of how many to display
3. Once the front and back are connected, then I can make it look pretty (maybe play around with framer motion and gsap)
4. Send it off to a few friends so they can test it and upload their art

## Tech stack & key dependencies

| Package | Purpose |
|---|---|
| `Vite` | Frontend framework |
| `react` | UI framework |
| `typescript` | Frontend langauge |
| `tailwindcss` | Styling |
| `motion` (`motion/react`) | Moving the cards in a circle |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | Texture loading (`useTexture`) and 3D helper utilities |
| `three` | Underlying 3D engine rendering the mesh for the portal frame, the sphere for the portals, and other misc 3D objects |
| `FastAPI` | Backend framework, handles API routes for art, users, and auth |
| `Python` | Backend language |
| `SQL` | Querying language |
| `SQLAlchemy` | ORM mapping Python models to Postgres tables |
| `PostgreSQL` | Relational database storing art, users, and user types |
| `Pydantic` | Request/response validation and typed schemas for the API |
| `python-jose` + `passlib` | JWT auth and password hashing for artist/admin accounts |

### Future To Do's
 
- Everything :cries:

## Project structure
 
```
Galleria/
├── frontend/
│   └── src/
│       ├── App.tsx                        # Handles navbar routing for now
│       ├── lib/
│       │   └── api.ts                     # Wrapper for calls to the FastAPI backend
│       ├── types/
│       │   └── types.ts                   # Datatypes shared with the backend API
│       ├── data/
│       │   └── data.ts                    # Holds temp testing data (hardcoding tests)
│       └── components/
│           ├── webpage/
│           │   ├── Landing.tsx            # Asks if user is a guest or an artist
│           │   └── Gallery.tsx            # If the user is a guest, brings them to the gallery that displays the art portals
│           ├── carousel/
│           │   └── Carousel.tsx           # Puts each user's portal into a carousel
│           ├── portal/
│           │   ├── Portal.tsx             # Renders the portal frame and calls the sphere
│           │   └── Sphere.tsx             # Inverted sphere with art overlay (gives the fun perspective)
│           ├── artist/
│           │   ├── Upload.tsx             # Upload their art, description, socials, etc
│           │   └── Manage.tsx             # Manage their uploaded art
│           └── admin/
│               ├── AuthContext.tsx        # Tracks logged-in user/session state
│               ├── Signup.tsx             # Artist/admin account creation
│               └── Login.tsx              # Artist/admin sign-in
│
└── backend/
    └── app/
        ├── main.py                        # App entrypoint, CORS, router registration
        ├── config.py                      # Loads .env into a typed settings object
        ├── database.py                    # SQLAlchemy engine + session setup
        ├── models/
        │   ├── art.py                     # ORM model for art pieces
        │   └── user.py                    # ORM model for users/artists
        ├── schemas/
        │   ├── art.py                     # Pydantic request/response shapes for art
        │   └── user.py                    # Pydantic request/response shapes for users
        └── routers/
            ├── art.py                     # /art endpoints
            └── users.py                   # /users, /auth endpoints
```
