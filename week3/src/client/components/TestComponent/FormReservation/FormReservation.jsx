import React, {useState} from 'react';
import "./FormReservation.css";

const FormReservation = ({id}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState("");

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reservationInfo = {
            meal_id: id,
            contact_name: name,
            contact_email: email,
            contact_phonenumber: phoneNumber,
            number_of_guests: numberOfGuests,
            created_date: formattedDate
        };

        try {
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reservationInfo)
            };

            const API = "/api/reservations";
            const res = await fetch (API, config);

            if (res.ok) {
                alert("Reservation successful");
            } else {
                alert("Reservation failed");
            }
        } catch (err) {
            console.error(err);
        }

        setName(""),
        setEmail("");
        setPhoneNumber("");
        setNumberOfGuests("");
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <p className="heading">Reservation:</p>
                <input 
                    placeholder="Name*" 
                    className="input" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    placeholder="Email*" 
                    className="input" 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    placeholder="Phone number*" 
                    className="input" 
                    type="text" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <input 
                    placeholder="Number of guests*" 
                    className="input" 
                    type="number" 
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="btn"
                >Add reservation
                </button>
            </form>
        </div>
    );
};

export default FormReservation;