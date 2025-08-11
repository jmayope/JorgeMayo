# JorgeMayo
Devsu Question 1

# *Se realizaron las siguientes modificaciones:*
  # **BACKEND**:
  Cors => se habilito en el backend para las pruebas.

  Se agregaron metodos en los controladores:
  - getQuantity -> METODO POST (con filtro de texto)
  - getAll -> METODO GET a POST (con filtro de texto y paginación)
  - getProductsByText -> Metodo para busqueda de texto desde el frontend.

  Esto es mas que nada por que al inicio habia entendido que se trataba de una paginación; lo que en procesos de varias transacciones de datos es recomendable que se maneje de la forma planteada (en el backend) :)

  **Las modificaciones en el backend no causan conflictos.


# *Para le ejecución del frontend*
  Para desarrollo.
  Dentro de la carpeta de bank-app-web, ejecutar:
    ng serve;

  Para pruebas
  Dentro de la carpeta de bank-app-web, ejecutar:
    ng test;
