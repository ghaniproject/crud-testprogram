let customers = [];
let currentId = null;


document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            customers = data;
            renderTable();
        });

    document.getElementById('customerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('customerName').value;
        const email = document.getElementById('customerEmail').value;
        const subs = document.getElementById('costumerSubscribe').value;

        if (currentId) {
            updateCustomer(currentId, name, email, subs);
        } else {
            addCustomer(name, email, subs);
        }

        resetForm();
    });
});

function renderTable() {
    const tableBody = document.getElementById('customerTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    customers.forEach(customer => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = customer.id;
        row.insertCell(1).innerText = customer.name;
        row.insertCell(2).innerText = customer.email;
        row.insertCell(3).innerText = customer.subs;

        const actionCell = row.insertCell(3);
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.onclick = () => editCustomer(customer);
        actionCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Hapus';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteCustomer(customer.id);
        actionCell.appendChild(deleteButton);
    });
}

// Tambah Pelanggan
function addCustomer(name, email, subs) {
    const newCustomer = {
        id: customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1, // Menggunakan ID yang unik
        name: name,
        email: email,
        subs :subs
    };
    customers.push(newCustomer);
    renderTable();
}
// Edit data pelanggan
function editCustomer(customer) {
    document.getElementById('customerId').value = customer.id;
    document.getElementById('customerName').value = customer.name;
    document.getElementById('customerEmail').value = customer.email;
    document.getElementById('costumerSubscribe').value = customer.subs;
    currentId = customer.id;
}

function updateCustomer(id, name, email,subs) {
    const index = customers.findIndex(customer => customer.id === id);
    if (index !== -1) {
        customers[index].name = name;
        customers[index].email = email;
        customers[index].subs = subs;
        renderTable();
    }
}

// Hapus pelanggan
function deleteCustomer(id) {
    
    customers = customers.filter(customer => customer.id !== id);
    
    // Perbarui ID pelanggan yang tersisa
    customers.forEach((customer, index) => {
        customer.id = index + 1; // ID agar berurutan saat di del
    });

    renderTable();
}

function resetForm() {
    document.getElementById('customerForm').reset();
    currentId = null;
}

// tampil data pelanggan
function renderTable() {
  const tableBody = document.getElementById('customerTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

// Data ditempatkan di cell yang sesuai
  customers.forEach(customer => {
      const row = tableBody.insertRow();
      row.insertCell(0).innerText = customer.id;
      row.insertCell(1).innerText = customer.name;
      row.insertCell(2).innerText = customer.email;
      row.insertCell(3).innerText = customer.subs;

      const actionCell = row.insertCell(4);
    //Tombol edit pelanggan
      const editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.classList.add('action'); // Tambahkan kelas Aksi
      editButton.onclick = () => editCustomer(customer);
      actionCell.appendChild(editButton);

    //Tombol hapus pelanggan
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Hapus';
      deleteButton.classList.add('delete', 'action'); // Tambahkan kelas Aksi
      deleteButton.onclick = () => deleteCustomer(customer.id);
      actionCell.appendChild(deleteButton);
  });
}

