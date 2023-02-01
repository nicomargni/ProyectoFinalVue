//Nota: Este no es mi primer trabajo final de vue, como comente en la entrega en la plataforma de coder, el sabado pasado tuve un corte de luz importante
en mi casa, y a mi computadora no se que es lo que le sucedio pero no me deja pasar de la bios, no tenia backup de mi proyecto y tuve que empezar todo
desde cero usando la computadora de mi hermana codeando a la velocidad de la luz, pido disculpas si se ve feo o no se ve muy profesional..



Tecnologias utilizadas:

"axios": "^1.2.6",
"bootstrap": "^5.2.3",
"toastify-js": "^1.12.0",  //No me gustaba como quedaban los alert cuando realizabas ciertas funciones asi que use toastify para que quede mas lindo
"vue": "^2.6.14",
"vue-router": "^3.5.1",
"vuex": "^3.6.2",
"vuex-persistedstate": "^4.1.0"  //Tuve muchos problemas logrando que los productos se queden en el carrito una vez reiniciada la pagina, y en internet di con vue-persistedstate que me ayudo con eso


Usuarios:

//Nota: Ya hay usuarios que cree yo que son los que proporciono aca abajo, pero desde el formulario de registro
	  se pueden crear nuevos usuarios con la opcion de si son admin o no.

El usuario no administrador:

usuario: pedro@hotmail.com
contraseña: 123

El usuario no administrador puede registrarse con datos propios,
loguearse con un usuario nuevo, ver todos los productos de la tienda,
pedir informacion sobre los mismos, añadirlos al carrito, eliminarlos
del mismo y realizar un pedido luego de completar los datos del formulario.

El usuario administrador:

usuario: nicomargni@hotmail.com
contraseña: 123

El usuario administrador puede registrarse con datos propios,
loguearse con un usuario nuevo, ver todos los productos de la
tienda, pedir info sobre los mismos, eliminarlos de la lista,
dar de alta nuevos productos, acceder en la seccion carrito
a la lista de pedidos hechos por usuarios no administradores,
y darlos de baja de asi desearlo.

Autor:
Nicolas Ezequiel Margni