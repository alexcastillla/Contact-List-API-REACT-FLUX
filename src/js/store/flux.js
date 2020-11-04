const URL = "https://assets.breatheco.de/apis/fake/contact/";
const id = "agenda/my_super_alexander";
const slug = "my_super_alexander";

const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			contacts: []
		},

		actions: {
			loadContact() {
				fetch(URL + id)
					.then(response => response.json())
					.then(data => {
						console.log("getcontacts:", data),
							setStore({
								contacts: data
							});
					})
					.catch(error => console.error("Error status: ", error));
			},
			deleteContact(id) {
				fetch(URL + id, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => response.json())
					.then(data => {
						console.log("response:", data);
						getActions().loadContact();
					})
					.catch(error => console.error("Error status: ", error));
			},
			addingContact: (fullName, address, email, phone) => {
				let contactInfo = {
					full_name: fullName,
					agenda_slug: slug,
					email: email,
					address: address,
					phone: phone
				};

				fetch(URL, {
					method: "POST",
					body: JSON.stringify(contactInfo),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => response.json())
					.then(data => {
						console.log("response:", data);
						getActions().loadContact();
					})
					.catch(e => console.error("Error status: ", error));
			},
			// update contact
			updateContact: (id, fullName, address, email, phone) => {
				let contactInfo = {
					full_name: fullName,
					agenda_slug: slug,
					email: email,
					address: address,
					phone: phone
				};
				fetch(URL + id, {
					method: "PUT",
					body: JSON.stringify(contactInfo),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => response.json())
					.then(data => {
						console.log("response:", data);
						getActions().loadContact();
					})
					.catch(error => console.error("Error status: ", error));
			}
		}
	};
};

export default getState;
