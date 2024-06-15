## pasos a tener en cuenta

1. Intalacion del proyect
2. usuarios en la base de datos
3. registro de usuarios
4. autenticación basica con login y password
5. verificación de autenticación
6. sesion de usuarios con cookie
7. json web tokens (JWT)
8. cerrar sesion
9. refresh token
11. --> passport y outh 2.0

todo desde 0
inicializamos el proyecto desde el package.json
 puedes utilizar "npm init -y". en mi caso utilizare una alternativa, pero los mismo comando que se utiliza con npm, lo puedes utilizar con el pnpm 

> pnpm init -y

donde agregamos datos como 
-- "type":"module" 
-- "dev":"node --wacth "nombreindex.js"

#### dependencias a intalar.
> pnpm install express

> pnpm install standard -D (-D dependencia de desarrollo) //limpia nuestro codigo, incluso lo formatea
agregamo la dependencia de eslintConfig en el package.json

> pnpm install bcrypt [link:] (https://www.npmjs.com/package/bcrypt)
> pnpm install db-local [link:](https://www.npmjs.com/package/db-local)

para generar el id aleatorio utilizamos el crypto