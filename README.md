# Pet Paw 🐾

Pet Paw es una aplicación web moderna dedicada a la adopción de mascotas y a la búsqueda de animales perdidos. Conectamos rescatistas, albergues y personas que buscan adoptar o han perdido a sus animales de compañía, facilitando la difusión de casos y creando una comunidad enfocada en darles a los animales un hogar. Permite la gestión de perfiles de mascotas, publicaciones relacionadas con ellas, y la autenticación de usuarios. Utiliza tecnologías modernas como React, Tailwind CSS, y Vite para ofrecer una experiencia de usuario rápida y eficiente.

## Características Principales

- **Gestión de Usuarios**: Registro y autenticación de usuarios con validación de códigos.
- **Publicaciones**: Los usuarios pueden crear y visualizar publicaciones relacionadas con sus mascotas.

## Configuración de la api

- **Directorio `src/`**:
  - **Componentes**: [src/components/](src/components/)
    - Componentes reutilizables de la interfaz de usuario.
  - **Contextos**: [src/contexts/](src/contexts/)
    - Manejo del estado global de la aplicación.
  - **Hooks**: [src/hooks/](src/hooks/)
    - Hooks personalizados para lógica reutilizable.
  - **Internacionalización**: [src/i18n.jsx](src/i18n.jsx)
    - Configuración de `react-i18next` para soporte multilingüe.
  - **Locales**: [src/locales/](src/locales/)
    - Archivos de traducción.
  - **Servicios**: [src/services/](src/services/)
    - Lógica de interacción con APIs y servicios externos.
  - **Vistas**: [src/views/](src/views/)
    - Páginas principales de la aplicación.

## Instalación

1. Clona el repositorio:
    ```sh
    https://github.com/GabrielMaQui/pet-paw-mir-backend.git
    ```

2. Navega al directorio del proyecto:
    ```sh
    cd pet-paw-backend
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```
4. Inicia el servidor de desarrollo:
    ```sh
    npm run dev
    ```
# API Documentation

Esta API maneja operaciones de gestión de usuarios, autenticación y publicaciones. Está estructurada en tres rutas principales:

- `/api/users`: Maneja las operaciones de gestión de usuarios.
- `/auth/local`: Maneja la autenticación local (inicio de sesión y activación de cuenta).
- `/api/posts`: Maneja las operaciones relacionadas con publicaciones.

Esta ruta maneja las operaciones relacionadas con los usuarios, como la creación, actualización, listado y eliminación de usuarios. Algunas operaciones están restringidas según el rol del usuario.

### **Endpoints**

## **Users**
| Endpoint                        | Method | Description                        |
|----------------------------------|--------|------------------------------------|
| `/api/users`                     | GET    | Get all users                      |
| `/api/users`                     | POST   | Create a new user                  |
| `/api/users/:id`                 | PATCH  | Update a user (requires admin)     |
| `/api/users/:id`                 | DELETE | Delete a user (requires admin)     |

## **Authentication**
| Endpoint                        | Method | Description                        |
|----------------------------------|--------|------------------------------------|
| `/auth/local/login`              | POST   | User login                         |
| `/auth/local/activate/:token`    | GET    | Activate user account via token    |

## **Posts**
| Endpoint                        | Method | Description                        |
|----------------------------------|--------|------------------------------------|
| `/api/posts`                     | GET    | Get all posts                      |
| `/api/posts/:id`                 | GET    | Get a post by ID                   |
| `/api/posts`                     | POST   | Create a post (requires user role) |
| `/api/posts/:id`                 | PATCH  | Update a post                      |
| `/api/posts/:id`                 | DELETE | Delete a post                      |
| `/api/posts/user/:userId`        | GET    | Get all posts of a specific user   |
## Autores

- GitHub - [Noelia Garcia Pacara](https://github.com/NoeliaGAP)
- GitHub - [William Lupaca Ticona](https://github.com/PunoBootcamper)
- Github - [Augusto Perales Guevara](https://github.com/AEperalesguevara)
- GitHub - [David Paredes Abanto](https://github.com/davidchano)


## Contribuciones

1. Realiza un fork del repositorio.
2. Crea una nueva rama para tu feature: `git checkout -b feature/nueva-feature`.
3. Realiza tus cambios y confirma tus commits: `git commit -m 'Añadida nueva-feature'`.
4. Envía tus cambios: `git push origin feature/nueva-feature`.
5. Abre un Pull Request.

> [!NOTE]
> Nuestro proyecto busca mejorar la calidad de vida de otras especies. Invitamos a todos a colaborar de forma altruista para alcanzar este objetivo.

> [!IMPORTANT]
>Si eres desarrollador y compartes nuestra pasión por los animales y la tecnología, ¡te invitamos a colaborar! Tu código puede ayudar a mejorar la experiencia de usuario y a expandir nuestro alcance. A cambio, tu nombre se incluirá en la lista de contribuidores del proyecto.
