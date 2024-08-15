import { Button } from './ButtonNew';

function DeleteConfirmation({ show, onClose, onConfirm }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-sm rounded bg-bg--primary-200 p-6 text-text--primary shadow-lg">
        <h2 className="mb-4 text-xl font-medium">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose} label="Cancel" />
          <Button className="bg-red-600 hover:bg-red-700" onClick={onConfirm} label="Delete" />
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
