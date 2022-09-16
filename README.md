<h2 align="middle">
<img src="https://i.imgur.com/FyuosDs.png" width="300"/>

¡Un Hermes para Artemisa!</br>
*(Más precisamente, para la página de "Consultar Espacio Físico")*
</h2>

### ¿Qué?

Hermes es una librería que ofrece una capa de abstracción para algo que nadie pidió: Peticiones HTTP a la página de [Consultar Espacio Físico](https://artemisa.unbosque.edu.co/serviciosacademicos/EspacioFisico/Interfas/EspaciosFisicosAsigandosReporte.php) de la Universidad El Bosque, lo cual permite interactuar con la información del horario de la gente.

### ¿Por qué?

- Quiero crear una aplicación CLI con la cual, con un comando, se pueda visualizar el horario en la terminal
- Sé que a alguien más le va a servir esto y, como miembro de la rama [IEEE Unbosque](https://branch-ieee-ueb.netlify.app/), me gusta crear herramientas [libres](https://www.gnu.org/philosophy/free-sw.html) para la comunidad universitaria.

### ¿Deno?

Sí. <img src="https://deno.land/logo.svg?__frsh_c=a8nx5mcy04n0" width="25"/>

Por ahora esta librería/módulo está escrit@ para ser usad@ en [Deno](deno.land/), el runtime jurásico con soporte de primera clase para TypeScript. Sin embargo, tengo la intención de publicar esto como un paquete de [npm](https://www.npmjs.com/)

### Vale, ¿Cómo?

**En deno** <img src="https://deno.land/logo.svg?__frsh_c=a8nx5mcy04n0" width="25"/>

En tres simples pasos, ya puedes empezar a usar Hermes en deno <img src="https://deno.land/logo.svg?__frsh_c=a8nx5mcy04n0" width="25"/>

1. Importa la librería en tu código

```javascript
import { EspacioFisicoSchedule, EspacioFisicoScheduleEvent } from "https://github.com/cfuendesign/espaciofisico-hermes/blob/mucho/mod.ts"
```

2. Crea una instancia de la clase `EspacioFisicoSchedule` y pasa al constructor un string, que representa la cédula del estudiante de quien quieres ver el horario. Acto seguido, utiliza el método `getScheduleObject` para obtener los datos

```javascript
const main = async () => {
	console.log(await new EspacioFisicoSchedule("0745996").getScheduleObject())
}

main();
```

El método es [asíncrono](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function), así que debe correrse dentro de una función asíncrona y debe ser precedido por la expresión [await](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/await)

3. Córrelo!

```bash
deno run --allow-net programaBacano.ts 
```

Es necesario correr cualquier programa que utilice Hermes con la bandera `--allow-net` de deno, dado que necesita permiso para hacer peticiones HTTP.

Los datos regresarán en forma de un array de `EspacioFisicoScheduleEvent` (Las clases del estudiante representadas como objetos)

### Vainas que recomiendo leer si quieres hacer algo similar

- [Deno DOM | deno.land](https://deno.land/manual@v1.25.2/jsx_dom/deno_dom)
- [Private class fields | MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
- [Objetos como valor de retorno de un .map() | StackOverflow](https://stackoverflow.com/questions/47841899/js-map-return-object)
- [AloeDB (Por la estructura del módulo y la documentación) | deno.land](https://deno.land/x/aloedb@0.9.0/mod.ts?s=Database)
- [std (Por lo mismo q AloeDB) | deno.land](https://deno.land/std@0.155.0/collections/mod.ts?source)

