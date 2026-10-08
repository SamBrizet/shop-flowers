const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`

export const categoryCards = [
  { name: 'Flores amarillas', category: 'Flores amarillas', image: pexels(33784343) },
  {
    name: 'Rosas',
    category: 'Rosas',
    image:
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80',
  },
  { name: 'Lirios', category: 'Lirios', image: pexels(35316473) },
  { name: 'Tulipanes', category: 'Tulipanes', image: pexels(31922991) },
  { name: 'Gerberas', category: 'Gerberas', image: pexels(30250345) },
  { name: 'Peonías', category: 'Peonías', image: pexels(17275117) },
  { name: 'Orquídeas', category: 'Orquídeas', image: pexels(34092563) },
  { name: 'Hortensias', category: 'Hortensias', image: pexels(18703646) },
]

export const faqs = [
  {
    question: '¿Hacen entregas el mismo día?',
    answer:
      'Sí. Si confirmas tu pedido por la mañana, coordinamos la entrega el mismo día en Lima Metropolitana. Te avisamos por WhatsApp apenas sale tu ramo.',
  },
  {
    question: '¿Puedo elegir la fecha y la hora de entrega?',
    answer:
      'Claro. Al finalizar tu compra nos indicas el día y el rango de horario que prefieres, y lo programamos para que llegue en el momento justo.',
  },
  {
    question: '¿Cómo puedo pagar?',
    answer:
      'Aceptamos tarjeta, transferencia bancaria y pago contra entrega. Eliges el método en el checkout.',
  },
  {
    question: '¿Puedo incluir una dedicatoria?',
    answer:
      'Sí, cada pedido incluye una tarjeta sin costo. Escribe tu mensaje al finalizar la compra y lo agregamos a mano.',
  },
  {
    question: '¿Qué pasa si no hay nadie para recibir las flores?',
    answer:
      'Intentamos contactar a quien recibe y a ti. Si no es posible entregar, reprogramamos con otro horario o dejamos el pedido con portería o un familiar.',
  },
  {
    question: '¿Cuánto duran las flores y cómo las cuido?',
    answer:
      'Con buenos cuidados duran entre 5 y 10 días. Cambia el agua cada dos días, corta un poco los tallos y mantén el ramo lejos del sol directo.',
  },
  {
    question: '¿Hacen arreglos personalizados?',
    answer:
      'Sí. Cuéntanos la ocasión, los colores y tu presupuesto por WhatsApp y diseñamos un arreglo único para ti.',
  },
]

export const benefits = [
  {
    title: 'Entrega en Lima',
    copy: 'Coordinamos el momento perfecto para recibir tus flores.',
  },
  {
    title: 'Diseño de temporada',
    copy: 'Ramos hechos a mano con flores frescas y seleccionadas.',
  },
  {
    title: 'Un mensaje tuyo',
    copy: 'Incluye una tarjeta personal y empaque de regalo.',
  },
]

export const promotions = [
  {
    title: 'Coleccion Bridal Edit',
    copy: 'Ramos editoriales para bodas civiles, recepciones intimas y bridal showers.',
  },
  {
    title: 'Gift Sets con flores y velas',
    copy: 'Combina arreglos con velas, chocolates y notas de agradecimiento.',
  },
  {
    title: 'Suscripcion floral mensual',
    copy: 'Un nuevo arreglo cada mes para hogar, oficina o gifting corporativo.',
  },
]

export const testimonials = [
  {
    name: 'Valeria Soto',
    role: 'Wedding planner',
    quote:
      'Shop Flowers entrega piezas visualmente impecables. La curaduria de color se siente de marca real, no de demo.',
  },
  {
    name: 'Mariana Rojas',
    role: 'Clienta recurrente',
    quote:
      'El flujo de compra es rapido, elegante y los favoritos me ayudan a planificar regalos con tiempo.',
  },
  {
    name: 'Renzo Valdivia',
    role: 'Corporate gifting lead',
    quote:
      'La experiencia transmite confianza: productos claros, checkout simple y estetica premium.',
  },
]

export const paymentOptions = ['Tarjeta ficticia', 'Transferencia', 'Pago contra entrega']