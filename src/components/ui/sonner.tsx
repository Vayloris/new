import { Toaster as SonnerToaster } from 'sonner';

export { toast } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        className:
          '!bg-white !text-neutral-900 !border !border-neutral-200 !shadow-lg !rounded-xl !text-sm !font-sans',
        descriptionClassName: '!text-neutral-600 !text-xs',
      }}
    />
  );
}
