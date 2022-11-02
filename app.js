const express = require("express");
const bp = require("body-parser");
const routers = require("./routers");
const app = express();
const PORT = 8080;

/* middlewares incorporados */
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

/* visibilizo la carpeta public */

app.use("/api/static", express.static(__dirname + "/public"));

app.use("/api", routers);

const server = app.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor: ${error}`));
