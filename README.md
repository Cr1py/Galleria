# Galleria

Inspired by the pokebiner, minecraft portals, and this project: https://pmndrs.github.io/examples/enter-portals/. The goal is to create a webpage where the user can turn left or right and see different art portals as they move.

## Current To Do:

1. Create a webpage that goes in a circle, with cards to hold the art. Goal is to start with a static number, but once I figure that out, then i can make it dynamic
2. Create a backend to store the images, and to keep track of how many to display
3. Once the front and back are connected, then I can make it look pretty (maybe play around with framer motion and gsap)
4. Send it off to a few friends so they can test it (maybe sent to artisit friends so they can have their work displayed)

## Tech stack & key dependencies

| Package | Purpose |
|---|---|
| `next` | App framework (App Router) |
| `react` | UI framework |
| `typescript` | Static typing across components, data layer, and types |
| `tailwindcss` | Styling, via `@theme inline` custom color tokens |
| `motion` (`motion/react`) | Moving the cards in a circle |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | Texture loading (`useTexture`) and 3D helper utilities |
| `three` | Underlying 3D engine rendering the mesh for the portal frame, the sphere for the portals, and other misc 3D objects |
| `@supabase/supabase-js` | Postgres database, authentication, and file storage |

### Future To Do's
 
- Everything :cries:

## Project structure
 
```
src/
├── app/
│   └── page.tsx                       # Handles navbar routing for now                
├── lib/
│   └── supabase.ts                    # Database to hold the art, users and user types
├── types/
│   └── types.ts                       # Datatypes for supabase
├── data/
│   └── data.ts                        # Holds temp testing data (hardcoding tests)
├── lib/                               # Will hold future utils
│   └── 
├── components/
│   ├── Webpage/
│   │   ├── Landing.tsx                # Asks if user is a guest or an artist
│   │   └── Gallery.tsx                # If the user is a guest, brings them to the gallery that displays the art portals
│   ├── Carousel/
│   │   └── Carousel.tsx               # Puts each user's portal into a carousel
│   ├── Portal/
│   │   ├── Portal.tsx                 # Renders the portal frame and calls the sphere
│   │   └── Sphere.tsx                 # Inverted sphere with art overlay (gives the fun perspective)
│   ├── Artist/
│   │   ├── Upload.tsx                 # Upload their art, description, socials, etc
│   │   └── Manage.tsx                 # Manage their uploaded art
│   └── admin/
│       ├── AuthContext.tsx  
│       ├── Signup.tsx            
│       └── Login.tsx                  
```
