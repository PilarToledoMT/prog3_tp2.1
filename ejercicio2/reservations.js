class Customer {
    constructor(customerId, customerName, customerEmail){
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
    }

    get info(){
        return `Nombre del Cliente: ${this.customerName}- Email: ${this.customerEmail}.`
    }
}class Reservation {
    constructor(id, customer, date, guests){
        this.id = id;
        this.customer = customer;
        this.date = date;
        this.guests = guests;
    }

    get info(){
        function formatDate(date){
            const day = date.getDate().toString().padStart(2, '');
            const month = (date.getMonth() + 1).toString().padStart(2, '');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '');
            const minutes = date.getMinutes().toString().padStart(2, '');

            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }
        const formattedDate = formatDate(new Date(this.date));
        return `Fecha y hora de Reserva: ${formattedDate} HS.- Cliente: ${this.customer.customerName}- Email: ${this.customer.customerEmail}- Personas: ${this.guests}.`
    }

    static validateReservation(reservationDate, guests){
        if((new Date(reservationDate) < new Date()) || (guests <= 0)){
            return false
        }else{
            return true
        }
    }
}

class Restaurant {
    constructor(name) {
        this.name = name;
        this.reservations = [];
    }

    addReservation(reservation) {
        this.reservations.push(reservation);
    }

    render() {
        const container = document.getElementById("reservations-list");
        container.innerHTML = "";
        this.reservations.forEach((reservation) => {
            const reservationCard = document.createElement("div");
            reservationCard.className = "box";
            reservationCard.innerHTML = `
                    <p class="subtitle has-text-primary">
                        Reserva ${
                            reservation.id
                        } - ${reservation.date.toLocaleString()}
                    </p>
                    <div class="card-content">
                        <div class="content">
                            <p>
                                ${reservation.info}
                            </p>
                        </div>
                    </div>
              `;
            container.appendChild(reservationCard);
        });
    }
}

document
    .getElementById("reservation-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const customerName = document.getElementById("customer-name").value;
        const customerEmail = document.getElementById("customer-email").value;
        const reservationDate =
            document.getElementById("reservation-date").value;
        const guests = parseInt(document.getElementById("guests").value);

        if (Reservation.validateReservation(reservationDate, guests)) {
            const customerId = restaurant.reservations.length + 1;
            const reservationId = restaurant.reservations.length + 1;

            const customer = new Customer(
                customerId,
                customerName,
                customerEmail
            );
            const reservation = new Reservation(
                reservationId,
                customer,
                reservationDate,
                guests
            );

            restaurant.addReservation(reservation);
            restaurant.render();
        } else {
            alert("Datos de reserva inválidos");
            return;
        }
    });

const restaurant = new Restaurant("El Lojal Kolinar");

const customer1 = new Customer(1, "Shallan Davar", "shallan@gmail.com");
const reservation1 = new Reservation(1, customer1, "2024-12-31T20:00:00", 4);

if (Reservation.validateReservation(reservation1.date, reservation1.guests)) {
    restaurant.addReservation(reservation1);
    restaurant.render();
} else {
    alert("Datos de reserva inválidos");
}
