const contacts = [{
    firstName: "Zeus",
    lastName: "Elderfield",
    relation: "Self",
    email: "23104469@usc.edu.ph",
    number: "09123456789"
}];

const updateUI = () => {
    const container = document.getElementById("tbody");
    
    while(container.lastChild) {
        container.removeChild(container.lastChild);
    }

    contacts.forEach((contact, index) => {
        const tr = document.createElement("tr");
        
        // Name
        const td1 = document.createElement("td");
        td1.classList.add("flex", "items-center", "justify-start", "h-10", "gap-2");
        
        const div = document.createElement("div");
        div.classList.add("flex", "justify-center", "items-center", "p-1", "rounded-full", "bg-black", "mt-[0.2rem]");


        const span = document.createElement("span");
        span.classList.add("profile--svg", "bg-white", "size-3");

        const p = document.createElement("p");
        p.textContent = `${contact.lastName}, ${contact.firstName}`;

        div.appendChild(span);
        td1.appendChild(div);
        td1.appendChild(p);

        // Relation
        const td2 = document.createElement("td");
        const div2 = document.createElement("div");
        const p2 = document.createElement("p");

        div2.classList.add("flex");

        let color = "";
        
        switch(contact.relation) {
            case "Self": color = "bg-blue-300"; break;
            case "Family": color = "bg-yellow-300"; break;
            case "Friend": color = "bg-orange-300"; break;
            case "Acquaintance": color = "bg-green-300"; break;
            case "Partner": color = "bg-red-300"; break;
            default: color = "bg-gray-300"; break;
        }

        p2.classList.add("px-5", color, "rounded-xl", "text-white", "font-medium");
        
        p2.textContent = contact.relation;
        div2.appendChild(p2);
        td2.appendChild(div2);

        // Email
        const td3 = document.createElement("td");
        td3.textContent = contact.email;

        // Contact Number
        const td4 = document.createElement("td");
        td4.textContent = contact.number;

        // Buttons
        const td5 = document.createElement("td");
        
        const div3 = document.createElement("div");
        div3.classList.add("flex", "gap-2", "justify-end");
    
        //update button
        const updateButton = document.createElement("button");
        updateButton.classList.add("bg-yellow-400", "p-1", "flex", "justify-center", "items-center", "rounded-md");

        const span2 = document.createElement("span");
        span2.classList.add("update--svg", "size-5", "bg-white");

        updateButton.addEventListener("click", () => {
            setFormData(index);
            openDialog();
        });

        updateButton.appendChild(span2);
        div3.appendChild(updateButton);

        //delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("bg-red-400", "p-1", "flex", "justify-center", "items-center", "rounded-md");

        const span3 = document.createElement("span");
        span3.classList.add("delete--svg", "size-5", "bg-white");

        deleteButton.addEventListener("click", () => {
            contacts.splice(index, 1);
            updateUI();
        })

        deleteButton.appendChild(span3);
        div3.appendChild(deleteButton);

        td5.appendChild(div3);


        //append to tr
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        //append to container
        container.appendChild(tr);
    })
}

const openDialog = () => {
    document.getElementById("filter").classList.remove("hidden");
}

const openResetDialog = () => {
    setFormData(-1);
    openDialog();
}

const closeDialog = () => {
    document.getElementById("filter").classList.add("hidden");
}

const manageContact = (e) => {
    e.preventDefault();
    const formRef = document.getElementById("form");
    
    const form = new FormData(formRef);

    const index = Number(form.get("index"));

    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const relation = form.get("relation");
    const email = form.get("email");
    const number = form.get("number");
    
    if(index === -1) {
        contacts.push({
            firstName,
            lastName,
            relation,
            email,
            number
        });
    }
    else {
        contacts[index].firstName = firstName;
        contacts[index].lastName = lastName;
        contacts[index].relation = relation;
        contacts[index].email = email;
        contacts[index].number = number;
    }

    updateUI();

    //reset form
    formRef.reset();

    closeDialog();
}

const setFormData = (index) => {
    document.getElementById("index").value = index;
    if(index !== -1) {
        document.getElementById("firstName").value = contacts[index].firstName;
        document.getElementById("lastName").value = contacts[index].lastName;
        document.getElementById("relation").value = contacts[index].relation;
        document.getElementById("email").value = contacts[index].email;
        document.getElementById("number").value = contacts[index].number;
    }
    else {
        document.getElementById("form").reset();
    }
}