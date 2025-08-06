import Swal from 'sweetalert2';

export const successAlert = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: '#0369a1',
    iconColor: '#0369a1',
    customClass: {
      confirmButton:
        'bg-sky-700 text-white px-4 py-2 rounded-md cursor-pointer',
      title: 'text-2xl font-bold',
      popup: 'rounded-lg shadow-lg',
    },
    buttonsStyling: false,
  });
};

export const errorAlert = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#0369a1',
    iconColor: '#dc2626',
    customClass: {
      confirmButton:
        'bg-sky-700 text-white px-4 py-2 rounded-md cursor-pointer',
      title: 'text-2xl font-bold text-red-600',
      popup: 'rounded-lg shadow-lg',
    },
    buttonsStyling: false,
  });
};

export const confirmDelete = async (title, text) => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    customClass: {
      confirmButton:
        'bg-sky-700 text-white px-4 py-2 rounded-md ml-2 cursor-pointer',
      cancelButton:
        'bg-gray-200 text-sky-700 px-4 py-2 rounded-md ml-2 cursor-pointer',
      title: 'text-2xl font-bold text-amber-500',
      popup: 'rounded-lg shadow-lg',
    },
    buttonsStyling: false,
  });

  return result.isConfirmed;
};
