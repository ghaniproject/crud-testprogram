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
        const name = document.getElementById('name').value;
        const todostitle = document.getElementById('todostitle').value;
        const todosstatus = document.getElementById('status').value;
        const posttitle = document.getElementById('posttitle').value;
        const posttext = document.getElementById('posttext').value;

        if (currentId) {
            updateCustomer(currentId, name, todostitle, todosstatus, posttitle, posttext);
        } else {
            addCustomer(name, todostitle, todosstatus, posttitle, posttext);
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
        row.insertCell(2).innerText = customer.todostitle;
        row.insertCell(3).innerText = customer.todosstatus;
        row.insertCell(4).innerText = customer.posttitle;
        row.insertCell(5).innerText = customer.posttext;

        const actionCell = row.insertCell(6);
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
function addCustomer(name, todostitle, todosstatus, posttitle, posttext) {
    const newCustomer = {
        id: customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1, // Menggunakan ID yang unik
        name: name,
        todostitle: todostitle,
        todosstatus :todosstatus,
        posttitle :posttitle,
        posttext : posttext
    };
    customers.push(newCustomer);
    renderTable();
}
// Edit data pelanggan
function editCustomer(customer) {
    document.getElementById('customerId').value = customer.id;
    document.getElementById('name').value = customer.name;
    document.getElementById('todostitle').value = customer.todostitle;
    document.getElementById('status').value = customer.todosstatus;
    document.getElementById('posttitle').value = customer.posttitle;
    document.getElementById('posttext').value = customer.posttext;
    currentId = customer.id;
}

function updateCustomer(id, name, todostitle, todosstatus, posttitle, posttext) {
    const index = customers.findIndex(customer => customer.id === id);
    if (index !== -1) {
        customers[index].name = name;
        customers[index].todostitle = todostitle;
        customers[index].todosstatus = todosstatus;
        customers[index].posttitle = posttitle;
        customers[index].posttext = posttext;
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
        row.insertCell(2).innerText = customer.todostitle;
        row.insertCell(3).innerText = customer.todosstatus;
        row.insertCell(4).innerText = customer.posttitle;
        row.insertCell(5).innerText = customer.posttext;

      const actionCell = row.insertCell(6);
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

