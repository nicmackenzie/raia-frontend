function FormControl({ label, id, children, error }) {
  return (
    <div className="space-y-1">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

export default FormControl;
