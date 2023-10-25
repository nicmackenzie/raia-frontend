import { CheckCircle } from 'lucide-react';

function EmailConfirmation() {
  return (
    <div
      className="max-w-md bg-success/80 mx-4 md:mx-auto mt-16 rounded-md px-4 py-2 space-y-4"
      role="alert"
    >
      <header className="flex items-center text-sm font-bold text-success-foreground gap-4">
        <CheckCircle className="w-4 h-4" />
        <span>Account registered successfully!</span>
      </header>
      <p className="text-muted-foreground text-xs">
        Your account has successfully been created with us. Click on the
        confirmation link that has been sent to email address you used during
        the signup process.
      </p>
    </div>
  );
}

export default EmailConfirmation;
