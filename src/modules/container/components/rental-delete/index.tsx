import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { TrashIcon } from 'lucide-react';
// import { ExclamationIcon } from '@heroicons/react/outline';

export default function DeleteConfirmationDialog({ isOpen, onClose, onDelete, itemName }) {
  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4 my-auto z-50">
              <div className="text-center">
                <TrashIcon className="h-8 w-8 mx-auto text-yellow-500" />
                <Dialog.Title as="h3" className="text-lg font-medium mt-2">
                  ¿Estás seguro de eliminar este contenedor?
                </Dialog.Title>
                <p className="text-sm text-gray-500 mt-2">
                  Esta acción es irreversible. Si eliminas "{itemName}", no podrás recuperarlo más tarde.
                </p>
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => {
                    onDelete();
                    onClose();
                  }}
                >
                  Eliminar
                </button>
                <button
                  type="button"
                  className="ml-4 inline-flex justify-center px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
