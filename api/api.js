const url =  "https://bike-shop-delta.vercel.app/";

export const fetchSignUp = async(headers, body) => {
    try {
        const response = await fetch(`${url}/api/auth/signup`, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        const data = await response.json();

        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchSignIn = async(formData) => {
    const {  email, password } = formData;
    try {
        const response = await fetch(`${url}/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchSignOut = async () => {
    const response = await fetch(`${url}/api/auth/signout`,{
        method: 'POST',
        credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response;
};

export const fetchChangePassword = async(email, oldPassword, newPassword) => {
    try {
        const response = await fetch(`${url}/api/auth/reset-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, oldPassword, newPassword }),
        });

        const data = await response.json();

        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchForgetPassword = async(email) => {
    try {
        const response = await fetch(`${url}/api/auth/forget-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchUserData = async() => {
    try {
        const response = await fetch(`${url}/api/user/get-users`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchUpdateUserData = async(headers, body, userId) => {
    try {
        const response = await fetch(`${url}/api/user/update-user/${userId}`, {
            method: 'PUT',
            headers: headers,
            body: body,
        });

        const data = await response.json();

        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchDeleteUserAccount = async(userId) => {
    try {
        const response = await fetch(`${url}/api/user/remove-user/${userId}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        
        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchUserBikesData = async(userId) => {
    try {
        const response = await fetch(`${url}/api/bike/get-bike-by-user/${userId}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchUserBikeData = async(bikeId) => {
    try {
        const response = await fetch(`${url}/api/bike/get-bike-service-history/${bikeId}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchUserAddBikeData = async(bikeData) => {
    try {
        const response = await fetch(`${url}/api/bike/add-bike`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bikeData),
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchDeleteUserBike = async(bikeId) => {
    try {
        const response = await fetch(`${url}/api/bike/remove-bike/${bikeId}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        
        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchServicesData = async() => {
    try {
        const response = await fetch(`${url}/api/service/get-services`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchCreateBookingData = async(booking) => {
    try {
        const response = await fetch(`${url}/api/booking/create-booking`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchBookingsData = async() => {
    try {
        const response = await fetch(`${url}/api/booking/get-bookings`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}

export const fetchDeleteBooking = async(bookingId) => {
    try {
        const response = await fetch(`${url}/api/booking/delete-booking/${bookingId}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        
        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}


export const fetchPayementMethod = async(amount, bookingId) => {
    try {
        const response = await fetch(`${url}/api/booking/payment`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({amount, bookingId}),
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Server Side Error ☠️', error);
        return false;
    }
}